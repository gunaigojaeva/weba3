import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import EachCard from "../components/EachCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar.jsx";
import Create from "../components/Create.jsx";
import Update from "../components/Update.jsx";
import "../assets/style/pages/flashcard.css";

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateCard, setUpdateCard] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All status");
    const [selectedSortings, setSelectedSortings] = useState(["newestToOldest"])

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchInitialCards = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/allCards?_page=${page}&_limit=7`);
            const initialCards = response.data;

            if (initialCards.length === 0) {
                setHasMore(false);
                return;
            }

            setPage(page + 1);
            setCards(initialCards);
        } catch (error) {
            console.error("Error fetching initial cards:", error);
        }
    }, [page]);

    const loadMore = useCallback(async () => {
        try {
            setIsLoadingMore(true);
            const response = await axios.get(`http://localhost:3001/allCards?_page=${page}&_limit=7`);
            const newCards = response.data;

            if (newCards.length === 0) {
                setHasMore(false);
                return;
            }

            setTimeout(() => {
                setPage(page + 1);
                setCards((prevCards) => [...prevCards, ...newCards]);
            }, 800);
        } catch (error) {
            console.error("Error fetching more cards:", error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [page]);

    useEffect(() => {
        fetchInitialCards();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoadingMore && hasMore) {
                loadMore();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoadingMore, hasMore, loadMore]);

    const handleSelectCard = (cardId) => {
        setSelectedCards((prevSelected) =>
            prevSelected.includes(cardId)
                ? prevSelected.filter((id) => id !== cardId)
                : [...prevSelected, cardId]
        );
    };

    const handleShare = () => {
        const selectedCardDetails = cards
            .filter((card) => selectedCards.includes(card.id))
            .map(({ id, front_part, back_part, image }) => ({ id, front_part, back_part, image }));

        const jsonData = JSON.stringify(selectedCardDetails, null, 2);

        const mailtoLink = `mailto:?subject=Flash Cards&body=${encodeURIComponent(jsonData)}`;
        window.location.href = mailtoLink;
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        setCards([]);
    };

    const handleSortingChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedSortings(selectedOptions);
    };

    const handleRearrangeCards = (draggedCardId, dropTargetCardId) => {
        const draggedIndex = cards.findIndex((card) => card.id === draggedCardId);
        const dropTargetIndex = cards.findIndex((card) => card.id === dropTargetCardId);

        const newCards = [...cards];
        [newCards[draggedIndex], newCards[dropTargetIndex]] = [newCards[dropTargetIndex], newCards[draggedIndex]];

        setCards(newCards);
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                let apiUrl = "http://localhost:3001/allCards";
                if (selectedStatus !== "All status") {
                    apiUrl += `?cardStatus=${selectedStatus}`;
                }

                const response = await axios.get(apiUrl);

                let sortedCards = response.data;

                selectedSortings.forEach((sortingOption) => {
                    switch (sortingOption) {
                        case "descendingOrder":
                            sortedCards = sortedCards.sort((a, b) => b.id - a.id);
                            break;
                        case "ascendingOrder":
                            sortedCards = sortedCards.sort((a, b) => a.id - b.id);
                            break;
                        case "imgLinkEmpty":
                            sortedCards = sortedCards.filter((card) => card.img_link === "");
                            break;
                        case "frontPartEmpty":
                            sortedCards = sortedCards.filter((card) => card.front_part === "");
                            break;
                        case "newestToOldest":
                            sortedCards = sortedCards.sort((a, b) => new Date(b.modifiedTime) - new Date(a.modifiedTime));
                            break;
                        default:
                            break;
                    }
                });                

                setCards(sortedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, [selectedStatus, selectedSortings]);

    const handleDelete = async (id) => {
        try {
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));

            await axios.delete(`http://localhost:3001/allCards/${id}`);
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    const handleUpdate = (card) => {
        setUpdateCard(card);
        setIsUpdateModalOpen(true);
    };

    const handleCreate = async (newCard) => {
        try {
            const currentDateTime = new Date().toLocaleDateString();

            newCard.modifiedTime = currentDateTime;
            newCard.cardStatus = "Want to Learn";

            setCards((prevCards) => {
                const updatedCards = [...prevCards, newCard];

                const sortedCards = updatedCards.sort((a, b) => {
                    return new Date(b.modifiedTime) - new Date(a.modifiedTime);
                });

                return sortedCards;
            });

            await axios.post("http://localhost:3001/allCards", newCard);


            setIsCreateModalOpen(false);
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    const handleUpdateCard = async (updatedCard) => {
        try {
            setCards((prevCards) =>
                prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
            );

            await axios.put(`http://localhost:3001/allCards/${updatedCard.id}`, updatedCard);

            setIsUpdateModalOpen(false);
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };


    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredCards = cards.filter((card) =>
        card.front_part.toLowerCase().includes(searchInput.toLowerCase()) ||
        card.back_part.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="all">
            <Navbar />
            <div className="cards-location">
                <div className="creating">
                    <div className="share-section">
                        <button className="share-btn btn btn" onClick={handleShare}>
                            Share Cards
                        </button>
                    </div>
                    <form id="operations">
                        <select
                            id="filterstatus"
                            name="category"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <option>All Options</option>
                            <option>Want to Learn</option>
                            <option>Mark as Noted</option>
                            <option>Learned</option>
                        </select>
                        <input
                            className="search"
                            placeholder="Enter text for search..."
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        ></input>
                        <select
                            id="sortOrder"
                            name="sortOrder"
                            value={selectedSortings}
                            onChange={handleSortingChange}
                        >
                            <option value="newestToOldest">Choose sorting option...</option>
                            <option value="frontPartEmpty">Sort only images</option>
                            <option value="imgLinkEmpty">Sort only text</option>
                            <option value="ascendingOrder">Sort the cards from oldests to newest</option>
                        </select>
                    </form>
                    <button className="create-btn btn btn" onClick={openCreateModal}>
                        Create
                    </button>
                </div>
                <InfiniteScroll
                    dataLength={cards.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4 className="loading">Loading More...</h4>}
                    endMessage={<p className="finished-loading">No more cards to load.</p>}
                >
                    <div className="flashcard-list">
                        {filteredCards.map((card, index) => (
                            <EachCard
                                key={card.id}
                                card={card}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                onSelect={handleSelectCard}
                                isSelected={selectedCards.includes(card.id)}
                                onRearrange={handleRearrangeCards}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
            {isCreateModalOpen && (
                <Create onCreate={handleCreate} onClose={closeCreateModal} />
            )}

            {isUpdateModalOpen && (
                <Update
                    card={updateCard}
                    onUpdate={handleUpdateCard}
                    onClose={closeUpdateModal}
                />
            )}
        </div>
    );

};

export default Cards;