import React, { useState } from "react";
import "../assets/style/components/eachcard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const FlashCardItem = ({ card, onDelete, onUpdate, onSelect, isSelected, onRearrange }) => {
    const [isTurned, setIsFlipped] = useState(false);
    // const [draggedCards, setDraggedCards] = useState([]);

    const handleFlip = () => {
        setIsFlipped(!isTurned);
    };

    // const handleDragOver = (e) => {
    //     e.preventDefault();
    // };

    // const handleDragStart = (e) => {
    //     const draggedCardId = e.currentTarget.getAttribute("data-card-id");
    //     setDraggedCards([draggedCardId]);
    // };

    // const handleDrop = (e, dropTargetCardId) => {
    //     e.preventDefault();

    //     if (!draggedCards.length || draggedCards[0] === dropTargetCardId) {
    //         setDraggedCards([]);
    //         return;
    //     }

    //     onRearrange(draggedCards[0], dropTargetCardId);

    //     setDraggedCards([]);
    // };

    return (
        <div
            className={`flashcard-item ${isTurned ? "turned" : ""}`}
            onClick={handleFlip}
            // draggable="true"
            // onDragStart={handleDragStart}
            // onDragOver={handleDragOver}
            // onDrop={(e) => handleDrop(e, card.id)}
            data-card-id={card.id}
        >
            <div className="turner">
                <div className="front">
                    {card.img_link ? (
                        <img src={card.img_link} alt="Card" className="card-image" />
                    ) : (
                        <h3 className="front_part">{card.front_part}</h3>
                    )}
                    <span className="hidden" data-last-modification={card.modifiedTime}></span>
                    <p className="status">{card.cardStatus}</p>
                    <p className="last-modification">
                        Last Modified: {new Date(card.modifiedTime).toLocaleDateString()}
                    </p>
                    <div className="buttons">
                        <button className="update-button actionbtn" onClick={() => onUpdate(card)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="delete-button actionbtn" onClick={() => onDelete(card.id)}>
                            <FontAwesomeIcon icon={faDeleteLeft} />
                        </button>
                    </div>
                </div>
                <div className="back">
                    <p className="status">{card.cardStatus}</p>
                    <p className="backTxt">{card.back_part}</p>
                </div>
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(card.id)}
                />
                <FontAwesomeIcon icon={faCheck} className='check' />
            </div>
        </div>
    );
};

export default FlashCardItem;