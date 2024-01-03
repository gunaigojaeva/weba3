import React, { useState } from "react";
import "../assets/style/components/create.css";

const CreateCardModal = ({ onCreate, onClose }) => {
    const [front_part, setFrontPart] = useState("");
    const [back_part, setBack_part] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [cardStatus, setStatus] = useState("Want to Learn");
    const [modifiedTime, setDateTime] = useState("");
    const currentDateTime = new Date().toLocaleString();
    const [createType, chooseCardType] = useState(null);

    const createCard = () => {
        const newCard = {
            front_part: createType === "text" ? front_part : "",
            back_part,
            img_link: createType === "image" ? imagePath : "",
            cardStatus,
            modifiedTime: currentDateTime,
        };

        onCreate(newCard);
    };

    const chooseImageOption = (e) => {
        const choosedImg = e.target.files[0];
        setImagePath(URL.createObjectURL(choosedImg));
    };

    return (
        <div className="modal-overlay">
            <div className="create-card-modal">
                <div className="modal-header">
                    <h2>Create New Card</h2>
                </div>
                <div className="modal-content">
                    {createType === null ? (
                    <div className="allOpts">
                        <h3>Choose one of the options:</h3>
                        <div className="options">
                            <button onClick={() => chooseCardType("text")}>Choose Text</button>
                            <button onClick={() => chooseCardType("image")}>Choose Image</button>
                        </div>
                    </div>
                    ) : (
                        <>
                            {createType === "text" && (
                                <>
                                    <label htmlFor="front_part">Question:</label>
                                    <input
                                        type="text"
                                        id="front_part"
                                        value={front_part}
                                        onChange={(e) => setFrontPart(e.target.value)}
                                    />
                                </>
                            )}

                            {createType === "image" && (
                                <>
                                    <label htmlFor="img_link">Upload Image:</label>
                                    <input type="file" id="img_link" onChange={chooseImageOption} accept="image/*" />
                                </>
                            )}

                            <label htmlFor="back_part">Answer:</label>
                          
                        </>
                    )}
                    <input type="hidden" id="cardStatus" value={cardStatus} onChange={(e) => setStatus(e.target.value)} />
                    <input type="hidden" id="modifiedTime" value={modifiedTime} onChange={(e) => setDateTime(currentDateTime)} />
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={createCard}>
                        Submit
                    </button>
                    <button className="back-button" onClick={onClose}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCardModal;