import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import './Products.css';

const Products = (props) => {
    const navigate2 = useNavigate();
    const { deleteProduct, addCartFunc } = useContext(ProductContext);
    const { obj } = props;
    const { id, title, description, image, price } = obj;

    const updFunc = () => {
        navigate2('/form', { state: { idt: id, data: obj } });
    };

    const delFunc = () => {
        deleteProduct(id);
    };

    const cartFunc = () => {
        addCartFunc(obj);
    };

    return (
        <li className="product-card">
            <img src={image} alt={title} className="product-img" />
            <div className="product-details">
                <h3 className="product-title">{title}</h3>
                <p className="product-description">{description}</p>
                <p className="product-price">₹{price}</p>
            </div>
            <div className="product-buttons">
                <button className="product-btn edit" onClick={updFunc}>Edit</button>
                <button className="product-btn delete" onClick={delFunc}>Delete</button>
                <button className="product-btn cart" onClick={cartFunc}>Add to Cart</button>
            </div>
        </li>
    );
};

export default Products;
