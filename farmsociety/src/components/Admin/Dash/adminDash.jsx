import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDash.css'
import ModalImage from "react-modal-image";
const AdminDash = () => {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('sellers');
    const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Fetch sellers with is_approved=false
    axios.get('http://127.0.0.1:8000/adminSell/')
      .then(response => {
        if (Array.isArray(response.data.sellers)) {
          setSellers(response.data.sellers);
        } else {
          console.error('Invalid data format for sellers:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching sellers:', error);
      });

    // Fetch farm products with is_approved=false
    axios.get('http://127.0.0.1:8000/adminProd/')
      .then(response => {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('Invalid data format for farm products:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching farm products:', error);
      });
  }, []);

  const approveSeller = (sellerId) => {
    // Update seller approval status to true
    axios.put(`http://127.0.0.1:8000/sellers/${sellerId}/`, { is_approved: true })
      .then(response => {
        // Refresh sellers list after approval
        setSellers(prevSellers => prevSellers.filter(seller => seller.sid !== sellerId));
      })
      .catch(error => {
        console.error('Error approving seller:', error);
      });
  };
  const approveProduct = (productId) => {
    // Update seller approval status to true
    axios.put(`http://127.0.0.1:8000/apfarm-products/${productId}/`, { is_approved: true })
      .then(response => {
        // Refresh sellers list after approval
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Error approving seller:', error);
      });
  };

  const deleteSeller = (sellerId) => {
    // Delete seller
    axios.delete(`http://127.0.0.1:8000/delsellers/${sellerId}/`)
      .then(response => {
        // Refresh sellers list after deletion
        setSellers(prevSellers => prevSellers.filter(seller => seller.sid !== sellerId));
      })
      .catch(error => {
        console.error('Error deleting seller:', error);
      });
  };

  const deleteProduct = (productId) => {
    // Delete farm product
    axios.delete(`http://127.0.0.1:8000/product/farm-products/${productId}/`)
      .then(response => {
        // Refresh products list after deletion
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Error deleting farm product:', error);
      });
  };

  return (
    <div className="AdminDashContainer">
      <h1 className="AdminDashHeading">Admin Dashboard</h1>
      <div className="AdminTabs">
        <button
          className={`AdminTabButton ${activeTab === 'sellers' ? 'ActiveTab' : ''}`}
          onClick={() => handleTabChange('sellers')}
        >
          Unapproved Sellers
        </button>
        <button
          className={`AdminTabButton ${activeTab === 'products' ? 'ActiveTab' : ''}`}
          onClick={() => handleTabChange('products')}
        >
          Unapproved Farm Products
        </button>
      </div>
      {activeTab === 'sellers' ? (
        <div className="AdminSection">
          <h2 className="AdminSectionHeading">Unapproved Sellers</h2>
          <table className="AdminTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Aadhar Card</th>
                <th>Farm ID</th>
                <th>Subscription Plans</th>
                <th>Amount Paid</th>
                <th>Transaction ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {sellers.map(seller => (
              <tr key={seller.sid}>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td className='AdminImageColumn'>
                  {seller.aadhar && 
                    <ModalImage
                      small={`data:image/jpeg;base64,${seller.aadhar}`}
                      large={`data:image/jpeg;base64,${seller.aadhar}`}
                      alt="Aadhar Card"
                    />
                  }
                </td>
                <td className='AdminImageColumn'>
                  {seller.farmId && 
                    <ModalImage
                      small={`data:image/jpeg;base64,${seller.farmId}`}
                      large={`data:image/jpeg;base64,${seller.farmId}`}
                      alt="Farm ID"
                    />
                  }
                </td>
                <td>{seller.subscription_plans}</td>
                <td>{seller.amount_paid}</td>
                <td>{seller.transaction_id}</td>
                <td className='AdminButtonColumn'>
                  <button className='AdminButton ApproveButton' onClick={() => approveSeller(seller.sid)}>Approve</button>
                  <button className='AdminButton DeleteButton' onClick={() => deleteSeller(seller.sid)}>Delete</button>
                </td>
              </tr>
            ))}
         </tbody>
        </table>
      </div>
    ) : (
      <div className="AdminSection">
      <h2 className="AdminSectionHeading">Unapproved Farm Products</h2>
      <table className="AdminTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Product Type</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render table rows for unapproved farm products */}
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.product_type}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              <td className='AdminImageColumn'>
                {product.image && 
                  <ModalImage
                    small={`data:image/jpeg;base64,${product.image}`}
                    large={`data:image/jpeg;base64,${product.image}`}
                    alt="Product Image"
                  />
                }
              </td>
              <td className='AdminButtonColumn'>
                <button className='AdminButton ApproveButton' onClick={() => approveProduct(product.id)}>Approve</button>
                <button className='AdminButton DeleteButton' onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </div>
);
};

export default AdminDash;