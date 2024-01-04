import React, { useState } from "react";
import "../assets/style/components/update.css";

const CardUpdater = ({ card, onUpdate, onClose }) => {
    const [front_part, setfront_part] = useState(card.front_part);
    const [back_part, setback_part] = useState(card.back_part);
    const [cardStatus, setStatus] = useState(card.cardStatus);
    const [newImg_link, setNewImg_link] = useState(null);

    const isImageCard = !card.front_part && card.img_link;

    const handleUpdate = async () => {
        let updatedCard = {
            ...card,
            front_part: isImageCard ? "" : front_part,
            back_part,
            cardStatus,
            modifiedTime: new Date().toLocaleString(),
        };

        if (isImageCard && newImg_link) {
            const formData = new FormData();
            formData.append("image", newImg_link);

            const response = await fetch(`http://localhost:3001/cards/${card.id}/img_link`, {
                method: "POST",
                body: formData,
            });
            const { img_link } = await response.json();

            updatedCard = {
                ...updatedCard,
                img_link,
            };

            setNewImg_link(null);
        }

        onUpdate(updatedCard);
        onClose();
        window.location.reload();
    };

    const handleImageChange = (e) => {
        const selectedImg_link = e.target.files[0];
        setNewImg_link(selectedImg_link);
    };

    return (
        <div className="modal-overlay">
        <div className="update-card-modal">
            <div className="modal-content">
                {isImageCard && (
                    <>
                        <label htmlFor="img_link">Upload New Image:</label>
                        <input type="file" id="img_link" accept="image/*" onChange={handleImageChange} />
                    </>
                )}

                    {!isImageCard && (
                        <>
                            <label htmlFor="front_part">Front Text:</label>
                            <input
                                type="textarea"
                                id="front_part"
                                value={front_part}
                                onChange={(e) => setfront_part(e.target.value)}
                            />
                        </>
                    )}

                    <label htmlFor="back_part">Back Text:</label>
                    <input
                        type="textarea"
                        id="back_part"
                        value={back_part}
                        onChange={(e) => setback_part(e.target.value)}
                    />

                    <label htmlFor="cardStatus">Status:</label>
                    <select
                        id="cardStatus"
                        name="cardStatus"
                        value={cardStatus}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Want to Learn">Want to Learn</option>
                        <option value="Mark as Noted">Mark as Noted</option>
                        <option value="Learned">Learned</option>
                    </select>
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleUpdate}>
                        Update
                    </button>
                    <button className="back-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardUpdater;