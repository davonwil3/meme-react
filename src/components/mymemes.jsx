import React, { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import MemeCreation from "./memecreation";




function MyMemes() {

    const [memes, setMemes] = useState([]);

    

    useEffect(() => {
        fetch('http://localhost:5000/getmeme', {
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
    

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <h1>My Memes</h1>
            <div className="image-gallery">
            {memes.map((meme, index) => (
                <MemeCreation key={meme.meme_id} img_id={meme.img_id} caption={meme.meme_caption} />
            ))}

            </div>
        </div>
    );
}

export default MyMemes;
