import React, { useState } from "react";
import { useEffect } from "react";
import MemeCreation from "./memecreation";
import { set } from "react-hook-form";
import Modal from "react-modal";
import { getAuth } from 'firebase/auth';


function UpdateMeme() {
    const [memes, setMemes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [caption, setCaption] = useState('');
    const [memeid, setMemeid] = useState('');

    useEffect(() => {
        fetch('https://meme-gen-sqon.onrender.com/getmeme', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setMemes(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching memes:', error);
            });
    }, []);

    const update = async () => {
        const userConfirmation = window.confirm("Are you sure you want to update this meme?");
        if (!userConfirmation) {
            return;
        }
    
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const token = await user.getIdToken();
    
            fetch(`https://meme-gen-sqon.onrender.com/updatememe`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                },
                body: JSON.stringify({
                    meme_id: memeid,
                    meme_caption: caption
                })
            })
            .then(response => response.json())
            .then(updatedMeme => {
                setMemes(memes.map(meme => meme.meme_id === memeid ? updatedMeme : meme));
                closeModal();
            })
            .catch(error => {
                console.error('Error updating meme:', error);
            });
        } else {
            alert("You must be logged in to update a meme.");
        }
    };
    

    const openModal = (captionl, imgurl, memeId ) => {
        setSelectedImage(`/images/${imgurl}`);
        setCaption(captionl);
        setMemeid(memeId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <h1>My Memes</h1>
            <div className="image-gallery">
                {memes.map((meme, index) => (
                    <MemeCreation key={meme.meme_id} memeid = {meme.meme_id} img_id={meme.img_id} caption={meme.meme_caption} update={openModal} />
                ))}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Selected Image"
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '500px',
                            maxWidth: '90%', 
                        },
                    }}
                >
                    <img src={selectedImage} alt="Selected Meme" style={{ width: '500px' }} />
                    <input type="text" name="caption" className="caption-input" placeholder="caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                    <input type="submit" onClick={update} style={{ display: 'block', marginTop: '10px' }} value="Submit"/>
                </Modal>
            </div>


        </div>
    );
}

export default UpdateMeme;