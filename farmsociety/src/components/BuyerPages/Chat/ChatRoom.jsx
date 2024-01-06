import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Chat.css'; // Import your CSS file

const ChatRoom = () => {
    const { sid } = useParams();
    const navigateTo = useNavigate();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Fetch the list of rooms associated with the seller's sid
        fetch(`http://127.0.0.1:8000/get_rooms/${sid}/`)
            .then(response => response.json())
            .then(data => setRooms(data));
    }, [sid]);

    const handleRoomClick = (room) => {
        // Navigate to the specified room URL
        const { bid, name, password, siid } = room;
        navigateTo(`/room/${name}/${password}/${siid}/${bid}`);
    };

    return (
        <div className="chat-room-container"> {/* Unique class name */}
            <h2 className="chat-room-heading">Chat Rooms</h2> {/* Unique class name */}
            <ul className="room-list"> {/* Unique class name */}
                {rooms.map(room => (
                    <li key={room.id} className="room-item" onClick={() => handleRoomClick(room)}> {/* Unique class name */}
                        {room.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoom;
