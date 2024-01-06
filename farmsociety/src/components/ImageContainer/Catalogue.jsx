import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cat.css';
import ModalImage from "react-modal-image";
import { useNavigate } from 'react-router-dom';

function Catalogue() {
    const navigate = useNavigate();
    const [farmProducts, setFarmProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productType, setProductType] = useState('');
    const [productTypesOptions, setProductTypesOptions] = useState([]);

    useEffect(() => {
        const fetchFarmProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/productviews/`);
                const latestProducts = response.data.products.slice(-10);
                setFarmProducts(latestProducts);
                setFilteredProducts(latestProducts);

                const uniqueProductTypes = [...new Set(response.data.products.map(product => product.product_type))];
                setProductTypesOptions(['', ...uniqueProductTypes]);
            } catch (error) {
                console.error('Error fetching farm products:', error);
            }
        };

        fetchFarmProducts();
    }, []);

    useEffect(() => {
        const filteredProducts = farmProducts.filter(product => {
            return (
                (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.owner_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (productType === '' || product.product_type.toLowerCase().includes(productType.toLowerCase()))
            );
        });
        setFilteredProducts(filteredProducts);
    }, [searchTerm, productType, farmProducts]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleProductTypeChange = (event) => {
        setProductType(event.target.value);
    };

    const openChat = (sid) => {
        navigate(`/buyer/${sid}`);
    };

    return (
        <div className="new-sales-container">
            <div className="new-search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select value={productType} onChange={handleProductTypeChange}>
                    {productTypesOptions.map((option, index) => (
                        <option key={index} value={option}>{option || 'All Types'}</option>
                    ))}
                </select>
            </div>
            <div className="new-product-list">
                {filteredProducts.map((product, index) => (
                    <div className="product-card" key={index}>
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
                         
                         <button className="chat-button" onClick={() => openChat(product.sid)}>Chat with Seller</button>
                    
                    </div>
                ))}
            </div>
        </div>
        
    );
}

export default Catalogue;