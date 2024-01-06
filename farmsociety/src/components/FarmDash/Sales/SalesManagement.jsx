import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./sales.css"; // Import your CSS file


function SalesManagement() {
    const { sid } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleUpdateQuantity = async (productId, operation) => {
        try {
            // Simulate API call to update product quantity
            // Replace this with your actual API endpoint
            const response = await fetch(`http://127.0.0.1:8000/update/${productId}/${operation}/`, {
                method: "PUT", // or "PATCH" based on your API endpoint
            });

            if (response.ok) {
                const updatedProducts = products.map(product => {
                    if (product.id === productId) {
                        return { ...product, quantity: operation === "add" ? product.quantity + 1 : product.quantity - 1 };
                    }
                    return product;
                });
                setProducts(updatedProducts);
            } else {
                throw new Error("Failed to update product quantity");
            }
        } catch (error) {
            console.error("Error updating product quantity:", error);
        }
    };


    const handleRemoveProduct = async (productId) => {
        try {
            // Simulate API call to remove product
            // Replace this with your actual API endpoint
            const response = await fetch(`http://127.0.0.1:8000/drop/${productId}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                const updatedProducts = products.filter(product => product.id !== productId);
                setProducts(updatedProducts);
            } else {
                throw new Error("Failed to remove product");
            }
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    useEffect(() => {
        // Simulate API call to fetch products
        // Replace this with your actual API endpoint
        fetch(`http://127.0.0.1:8000/product/${sid}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [sid]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    if (products.length === 0) {
        return <div className="error">No products found</div>;
    }

    return (
        <div className="sales-container">
            <h1>Product Details</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Available</th>
                        <th>Description</th>
                        <th>Update</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.product_type}</td>
                            <td>{product.quantity}</td>
                            <td>{product.is_available ? "Yes" : "No"}</td>
                            <td>{product.description}</td>
                            <td className="product-actions">
                                <button onClick={() => handleUpdateQuantity(product.id, "add")}>Increase Quantity</button>
                                <button onClick={() => handleUpdateQuantity(product.id, "subtract")}>Decrease Quantity</button>
                            </td>
                            <td className="product-actions">
                                <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesManagement;