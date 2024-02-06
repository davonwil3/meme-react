import React from "react";
import { useState } from "react";
import { useEffect } from "react";


const MemeCreation = React.memo((props) => {
    const [imgUrl, setImgUrl] = useState('');

    console.log(props);

    useEffect(() => {
        fetch('https://meme-gen-sqon.onrender.com/getimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                img_id: props.img_id
            })
        })
        .then(response => response.json())
        .then(data => {
            let url =  data.img_url;
            setImgUrl(url);
        });
    }, [props.img_id]); // Fetches image only when img_id changes

    return (
        <div className="meme-block">
            <img 
                src={`/images/${imgUrl}`} 
                alt={""}  
                onClick={() => {
                    if (props.delete) {
                        props.delete(props.memeid);
                    }
                    if (props.update) {
                        props.update(props.caption, imgUrl, props.memeid);
                    }
                }}
            />
            <p style={{marginLeft:'10px'}}>{props.caption}</p>
        </div>
    );
});

export default MemeCreation;
