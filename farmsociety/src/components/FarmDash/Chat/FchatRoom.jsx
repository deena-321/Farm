import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FchatRoom.css';

const FChatRoom = () => {
    const { sid } = useParams();
    const navigateTo = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        console.log(sid)
        // Fetch the list of rooms associated with the seller's sid
        fetch(`http://127.0.0.1:8000/fget_rooms/${sid}/`)
            .then(response => response.json())
            .then(data => setRooms(data));
    }, [sid]);

    useEffect(() => {
        // Scroll down to the latest message when messages change
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleRoomClick = (room) => {
        // Navigate to the specified room URL
        const { bid, name, password, siid } = room;
        navigateTo(`/froom/${name}/${password}/${siid}/${bid}`);
    };

    return (
        <div className="fchat-container">
            <h2 className="fchat-heading">Chat Rooms</h2>
            <ul className="froom-list">
                {rooms.map(room => (
                    <li key={room.id} className="froom-item" onClick={() => handleRoomClick(room)}>
                        {room.name}
                    </li>
                ))}
            </ul>

         
        </div>
    );
};

export default FChatRoom;