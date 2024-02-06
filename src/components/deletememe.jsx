import React, { useState } from "react";
import { useEffect } from "react";
import MemeCreation from "./memecreation";
import { getAuth } from "firebase/auth";

function DeleteMeme() {
    const [memes, setMemes] = useState([]);

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

    const delMeme = async (id) => {
        const userConfirmation = window.confirm("Are you sure you want to delete this meme?");
        if (!userConfirmation) {
            return;
        }
    
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const token = await user.getIdToken();
    
            fetch(`https://meme-gen-sqon.onrender.com/deletememe?meme_id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            })
            .then(response => response.json())
            .then(() => {
                setMemes(memes.filter(meme => meme.meme_id !== id));
            })
            .catch(error => {
                console.error('Error deleting meme:', error);
            });
        } else {
            alert("You must be logged in to delete a meme.");
        }
    };
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <h1>My Memes</h1>
            <div className="image-gallery">
                {memes.map((meme, index) => (
                    <MemeCreation key={meme.meme_id} memeid = {meme.meme_id} img_id={meme.img_id} caption={meme.meme_caption} delete={delMeme} />
                ))}
            </div>
        </div>
    );
}

export default DeleteMeme;