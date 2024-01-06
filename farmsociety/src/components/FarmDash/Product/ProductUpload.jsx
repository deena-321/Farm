import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./productUpload.css";

function ProductUpload() {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCost, setProductCost] = useState("");

  const { sid } = useParams();

  const handleProductUpload = async () => {
    try {
      if (productImage) {
        const formData = new FormData();
        formData.append("seller", sid);
        formData.append("name", productName);
        formData.append("product_type", productType);
        formData.append("quantity", productQuantity);
        formData.append("description", productDescription);
        formData.append("image", productImage);
        formData.append("is_approved", "False");
        formData.append("cost", productCost);


        const response = await fetch("http://127.0.0.1:8000/create_product/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Product uploaded successfully!");
          resetForm();
        } else {
          console.error("Product upload failed");
        }
      } else {
        console.error("Seller ID (sid) is not available from the URL or image is not selected");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const resetForm = () => {
    setProductName("");
    setProductType("");
    setProductQuantity("");
    setProductDescription("");
    setProductImage(null);
    setProductCost("");
  };

  return (
    <div className="product-upload-container">
      <div className="input-group">
        <label className="label">Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label">Product Type:</label>
        <input
          type="text"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label">Product Quantity:</label>
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label className="label">Product Description:</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="textarea-field"
        />
      </div>
      <div className="input-group">
  <label className="label">Product Cost:</label>
  <input
    type="number"
    value={productCost}
    onChange={(e) => setProductCost(e.target.value)}
    className="input-field"
  />
</div>
      <div className="input-group">
        <label className="label">Product Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
      </div>
      <div className="button-group">
        <button onClick={handleProductUpload} className="upload-button">Upload Product</button>
      </div>
    </div>
  );
}

export default ProductUpload;
