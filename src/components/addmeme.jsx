import React, { useState } from "react";
import Modal from "react-modal";
import { getAuth, onAuthStateChanged } from 'firebase/auth';




function AddMeme() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

  
    const images = [
         '/images/aliens.jpeg',
         '/images/baby.webp',
         '/images/cat.webp',
         '/images/dave.jpeg',
         '/images/krabs.jpeg',
         '/images/leo.webp',
         '/images/spongebob.jpeg',
         '/images/themoreyouknow.webp',
         '/images/toystory.webp',
         '/images/wonka.jpeg',
    ];

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const submit = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const token = await user.getIdToken();
            console.log(token);
    
            const image = document.querySelector('img[src="' + selectedImage + '"]');
            const id = image.getAttribute('data-id');
    
            fetch('https://meme-gen-sqon.onrender.com/addnewmeme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    img_id: id,
                    caption: document.querySelector('.caption-input').value
                })
            })
            .then((response) => {
                if (response.ok) {
                    alert('Meme submitted successfully!');
                    closeModal();
                } else {
                    alert('Failed to submit meme. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        } else {
            alert('You must be logged in to submit a meme.');
        }
    };
    

    return (
        <div style={{ height: '100vh' }}>
            <h1>Pick a Meme Image</h1>
            <div className="image-gallery">
                {images.map((image, index) => (
                    <img data-id={index + 1} src={image} alt="" onClick={() => openModal(image)} style={{ cursor: 'pointer', margin: '5px' }} />
                ))}
            </div>
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
                <input type="text" name="caption" className="caption-input" placeholder="caption"/>
                <input type="submit" onClick={submit} style={{ display: 'block', marginTop: '10px' }} value="Submit"/>
            </Modal>
        </div>
    );
}

export default AddMeme;
