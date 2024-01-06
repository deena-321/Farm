import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ViewSales.css';
import ChatComponent from '../Chat/chat';
import ModalImage from 'react-modal-image';
import { useParams, useNavigate } from 'react-router-dom';


function Sales() {
    const { sid } = useParams();
    const navigate = useNavigate();
    const [farmProducts, setFarmProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const commentsContainerRef = useRef(null);
    const fetchFarmProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/view_products/${sid}/`);
            setFarmProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching farm products:', error);
        }
    };

    const fetchComments = async (productId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/fetchcomments/${productId}/`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const postComment = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/postcomments/${selectedProduct.id}/`, {
                text: newComment,
            });
            // After posting a comment, refresh the comments
            fetchComments(selectedProduct.id);
            // Clear the comment input field after posting
            setNewComment('');
            // Scroll down to show the latest comment
            if (commentsContainerRef.current) {
                commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleCommentInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentButtonClick = (product) => {
        setSelectedProduct(product);
        // Fetch comments when the comment button is clicked
        fetchComments(product.id);
        setIsChatOpen(false); // Close chat if it's open
        setIsPopupOpen(true); // Open comments popup
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProduct(null); // Reset selected product when closing the popup
    };

    useEffect(() => {
        // Fetch farm products when the component mounts
        fetchFarmProducts();
    }, [sid]); // Trigger fetchFarmProducts when sid changes

    const openChat = (sellerId, buyerId) => {
        setSelectedProduct(null); // Close comments section when chat is opened
        setIsChatOpen(true);
        navigate(`/home/${sellerId}/${buyerId}`);
    };

    return (
        <div className="sales-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="product-list">
                {farmProducts
                    .filter((product) =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.product_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product, index) => (
                        <div className="product-card" key={index}>
                             <p><strong>Subscription Plan:</strong> {product.owner_sub}</p>

{/* Display a tag based on the subscription plan */}
<span className={`tag ${product.owner_sub.toLowerCase()}-tag`}>{product.owner_sub}</span>
                            <h2>{product.name}</h2>
                            <p><strong>Owner Name:</strong> {product.owner_name}</p>
                            <p><strong>Type:</strong> {product.product_type}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Cost:</strong> {product.cost}</p>

                            {product.image && (
                                <ModalImage
                                    small={`data:image/jpeg;base64,${product.image}`}
                                    large={`data:image/jpeg;base64,${product.image}`}
                                    alt="Product"
                                />
                            )}

                            <button className="chat-button" onClick={() => openChat(product.pid, sid)}>
                                Chat with Seller
                            </button>
                            <br></br><br></br>
                            <button className="comment-button" onClick={() => handleCommentButtonClick(product)}>
                                View Comments
                            </button>

                         
                        </div>
                    ))}
                                {isPopupOpen && selectedProduct && (
                <div className="comments-popup">
                    <div className="comments-content"  ref={commentsContainerRef}>
                        <button className="close-button" onClick={closePopup}>
                            &times;
                        </button>
                        <h3>Comments for {selectedProduct.name}</h3>
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>{comment.text}</li>
                            ))}
                        </ul>
                        <div className="comment-input">
    <textarea
        value={newComment}
        onChange={handleCommentInputChange}
        placeholder="Enter your comment..."
    />
    <button onClick={postComment}>Submit Comment</button>
</div>

                    </div>
                </div>
            )}

            </div>
            {isChatOpen && <ChatComponent onClose={() => setIsChatOpen(false)} />}
        </div>
    );
}

export default Sales;
