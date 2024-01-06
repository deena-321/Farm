import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {
    const { sellerId, buyerId } = useParams();
    const navigateTo = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [roomPassword, setRoomPassword] = useState('');

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleRoomPasswordChange = (e) => {
        setRoomPassword(e.target.value);
    };

   
    const createRoom = async (e) => {
        e.preventDefault();
    
        // Include sellerId and buyerId in the URL
        await fetch(`http://127.0.0.1:8000/room/${sellerId}/${buyerId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': roomName,
                'password': roomPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 201) {
                navigateTo(`/room/${roomName}/${roomPassword}/${sellerId}/${buyerId}`);
            } else {
                navigateTo(`/room/${roomName}/${roomPassword}/${sellerId}/${buyerId}`);
            }
        });
    };

    const navigateToBuyPage = () => {
        navigateTo(`/buypage/${buyerId}`);
    };

    

    return (
        <div className="homepage-container">
            <form onSubmit={createRoom}>
                <h3 className="homepage-heading">Create a Chat Room</h3>
                <label htmlFor="name">Enter the room's name</label>
                <input className="input-field" type="text" name="name" placeholder='Room Name...' value={roomName} onChange={handleRoomNameChange} />
                <label htmlFor="password">Enter the room's password</label>
                <input className="input-field" type="password" name="password" placeholder='Room Password...' value={roomPassword} onChange={handleRoomPasswordChange} />
                <button type="submit" className="submit-button">Create</button>
            </form><br></br>
            <button className="submit-button" onClick={navigateToBuyPage}>Go to Buy Page</button>
        </div>
    );
};

export default HomePage;
