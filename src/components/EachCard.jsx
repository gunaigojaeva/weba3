import React, { useState } from "react";
import "../assets/style/components/eachcard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const FlashCardItem = (props) => {
    const [isTurned, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isTurned);
    };

    const dragOverMethod = (e) => {
        e.preventDefault();
    };

    const dragStartMethod = (e) => {
        const draggedCardId = e.currentTarget.getAttribute("data-card-id");
        e.dataTransfer.setData("text/plain", draggedCardId);
    };

    const dropMethod = (e) => {
        e.preventDefault();
        const droppedCardId = e.currentTarget.getAttribute("data-card-id");
        const draggedCardId = e.dataTransfer.getData("text/plain");

        const droppedCardFrontPart = props.cards.find((card) => card.id === Number(droppedCardId)).front_part;
        const draggedCardFrontPart = props.cards.find((card) => card.id === Number(draggedCardId)).front_part;

        const droppedCardBackPart = props.cards.find((card) => card.id === Number(droppedCardId)).back_part;
        const draggedCardBackPart = props.cards.find((card) => card.id === Number(draggedCardId)).back_part;

        const droppedCardStatus = props.cards.find((card) => card.id === Number(droppedCardId)).cardStatus;
        const draggedCardStatus = props.cards.find((card) => card.id === Number(draggedCardId)).cardStatus;

        const droppedCardModifyTime = props.cards.find((card) => card.id === Number(droppedCardId)).modifiedTime;
        const draggedCardModifyTime = props.cards.find((card) => card.id === Number(draggedCardId)).modifiedTime;

        const droppedCardImage = props.cards.find((card) => card.id === Number(droppedCardId)).image;
        const draggedCardImage = props.cards.find((card) => card.id === Number(draggedCardId)).image;
        
        const droppedCardOrder = props.cards.find((card) => card.id === Number(droppedCardId)).order;
        const draggedCardOrder = props.cards.find((card) => card.id === Number(draggedCardId)).order;

        props.onRearrange(draggedCardId, draggedCardOrder, draggedCardFrontPart, draggedCardBackPart, draggedCardStatus, 
            draggedCardModifyTime, draggedCardImage, droppedCardId, droppedCardOrder, droppedCardFrontPart, 
            droppedCardBackPart, droppedCardStatus, droppedCardModifyTime, droppedCardImage);
    };

    return (
        <div
            className={`flashcard-item ${isTurned ? "turned" : ""}`}
            onClick={handleFlip}
            draggable="true"
            onDragStart={dragStartMethod}
            onDragOver={dragOverMethod}
            onDrop={dropMethod}
            data-card-id={props.card.id}
        >
            <div className="turner">
                <div className="front">
                    {props.card.img_link ? (
                        <img src={props.card.img_link} alt="Card" className="card-image" />
                    ) : (
                        <h3 className="front_part">{props.card.front_part}</h3>
                    )}
                    <span className="hidden" data-last-modification={props.card.modifiedTime}></span>
                    <p className="status">{props.card.cardStatus}</p>
                    <p className="last-modification">
                        Last Modified: {new Date(props.card.modifiedTime).toLocaleDateString()}
                    </p>
                    <div className="buttons">
                        <button className="update-button actionbtn" onClick={() => props.onUpdate(props.card)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="delete-button actionbtn" onClick={() => props.onDelete(props.card.id)}>
                            <FontAwesomeIcon icon={faDeleteLeft} />
                        </button>
                    </div>
                </div>
            
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={props.isSelected}
                    onChange={() => props.onSelect(props.card.id)}
                />
                <FontAwesomeIcon icon={faCheck} className='check' />
            </div>
        </div>
    );
};

export default FlashCardItem;