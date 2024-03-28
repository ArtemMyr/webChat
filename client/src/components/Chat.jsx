import React from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { useState } from "react"
import EmojiPicker from "emoji-picker-react";

import icon from "../images/emoji.svg"
import styles from "../styles/Chat.module.css";

const socket = io.connect('http://localhost:5000')

const Chat = () => {
    const { search } = useLocation();
    const [params, setParams] = useState({room:"",user:""});
    const [state, setState] = useState([]);
    const [message, setMassage] = useState("");
    const [isOpen, setOpen] = useState(false);
    


    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setParams(searchParams)
        socket.emit("join", searchParams);
    }, [search])

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((_state) => ( [..._state, data] ));
        })
    }, [])

    const leftRoom = () => {};
    const handleChange = () => {};
    const hendleSubmit = () => {};
    const onEmojiPicker = () => setOpen(!isOpen);

    return (
        <div className={styles.wrapp}>
            <div className={styles.header}>
                <div className={styles.title}>
                    {params.room}
                </div>
                <div className={styles.users}>
                    0 users in the room
                </div>
                <button className={styles.left} onClick={leftRoom}>
                    Left the room
                </button>
            </div>
            <div className={styles.messages}>
                {state.map(({message},i) => <span key={ i }>{message}</span>)}
            </div>
            <form className={styles.form}>
                <div className={styles.input}>
                    <input 
                        type='text'
                        name='message'
                        placeholder='What do you want to say?'
                        value={message} 
                        autoComplete='off'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.emoji}>
                    <img src = { icon } alt="" />

                    {isOpen && (
                        <div className={styles.emojies}>
                            <EmojiPicker onEmojiClick={onEmojiPicker}/>
                        </div>
                    )}
                </div>

                <div className={styles.button}>
                    <input type="submit" onSubmit={hendleSubmit} value="Seand a message">

                    </input>
                </div>

            </form>
        </div>
    )
};

export default Chat;