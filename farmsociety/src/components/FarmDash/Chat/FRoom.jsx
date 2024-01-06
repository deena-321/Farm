import React, { useState, useLayoutEffect,useRef,useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css'

const FChat = () => {
    const { name, password, sid, bid } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [image, setImage] = useState(null);
    const [chatName, setChatName] = useState('');
    const messagesContainerRef = useRef(null);
    const fetchMessagesPeriodically = () => {
        fetchMessages();
    };

    
    const sendMessage = async () => {
        try {
            const formData = new FormData();
            formData.append('message', newMessage);
            formData.append('sender', 'sender');
            if (image) {
                formData.append('image', image);
            }
            const response = await fetch(`http://127.0.0.1:8000/send_msg/${name}/${password}/${sid}/${bid}/`, {
                method: 'POST',
                body: formData,
            });


            if (response.ok) {
                setNewMessage('');
                setImage(null);
                fetchMessages();
                if (messagesContainerRef.current) {
                    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                }
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/send_msg/${name}/${password}/${sid}/${bid}/`);
            if (response.ok) {
                const data = await response.json();
                console.log(data[0].name)
                setMessages(data);
                setChatName(data[0].name);
                if (messagesContainerRef.current) {
                    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                }
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    useEffect(() => {
        // Fetch messages immediately when the component mounts
        fetchMessagesPeriodically();

        // Fetch messages every 2 seconds
        const intervalId = setInterval(fetchMessagesPeriodically, 2000);

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useLayoutEffect(() => {
        fetchMessages();
    }, []); 
    useLayoutEffect(() => {
        // Scroll to the bottom after messages are rendered or updated
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]); 

    return (
        
        <div className="chat-container">
             <div className="chat-name">
             {chatName && <p>{chatName.toUpperCase()}</p>}
            </div>
            <div className="scroll" ref={messagesContainerRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.sender === 'sender' ? 'message-bubble buyer-message' : 'message-bubble seller-message'}
                    >
                        {message.image ? (
                            <img src={`data:image/jpeg;base64,${message.image}`} alt="sent" className="message-image" />
                        ) : (
                            <p><strong>{message.sender}: </strong>{message.message}</p>
                           
                        )}
                    </div>
                ))}
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    className="message-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="image-input"
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default FChat;