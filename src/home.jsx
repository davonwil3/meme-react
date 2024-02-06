import React from "react";
import { useState } from "react";
import Navbar from "./components/navbar";
import "./styles.css";
import AddMeme from "./components/addmeme";
import MyMemes from "./components/mymemes";
import { useEffect } from "react";
import DeleteMeme from "./components/deletememe";
import UpdateMeme from "./components/updatememe";

function Home() {
    const [dashboard, setDash] = useState(<AddMeme />);

    const addMeme = (e) => {
        e.preventDefault();
        setDash(<AddMeme />);
    }

    const myMemes = (e) => {
        e.preventDefault();
        setDash(<MyMemes />);
    }

    const deleteMeme = (e) => {
        e.preventDefault();
        setDash(<DeleteMeme />);
    }

    const updateMeme = (e) => {
        e.preventDefault();
        setDash(<UpdateMeme />);
    }
      
    return (
        <div>
            <Navbar />
            <div className="homepage">
                <div className="left-panel">
                <h2>Meme Gen</h2>
                        <a href="" onClick={addMeme} >Add a Meme</a>
                        <a href="" onClick={myMemes}> My Memes</a>
                        <a href="" onClick={deleteMeme}>Delete Meme</a>
                        <a href="" onClick={updateMeme}>Update Meme</a>
                      
                </div>
                <div className="dashboard">
                    {dashboard}
                </div>
            </div>
        </div>
    );
}

export default Home;