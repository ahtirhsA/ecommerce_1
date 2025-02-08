import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import { v4 as uuidv4 } from 'uuid';

const FormPage = () => {
  const [item, setItem] = useState({ title: '', description: '', price: '', category: '', image: '' });

  const { addProduct, updateProduct } = useContext(ProductContext);
  const navigate1 = useNavigate();
  const location = useLocation();
  const idt = location.state ? location.state.idt : null;

  // Using useEffect to update state after initial mount
  useEffect(() => {
    if (location.state) {
      setItem(location.state.data);
    }
  }, [location.state]);

  const handleChange = (field) => (event) => {
    const { value, type, files } = event.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imgUrl = URL.createObjectURL(file); 
        setItem((prevItem) => ({ ...prevItem, image: imgUrl }));
      }
    } else {
      setItem((prevItem) => ({ ...prevItem, [field]: value }));
    }
  };

  const submitFunc = (e) => {
    e.preventDefault();

    const prodDetails = {
      id: uuidv4(),
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image
    };

    addProduct(prodDetails);
    navigate1('/home');
  };

  const updateFunc = (e) => {
    e.preventDefault();

    const updObj = {
      id: idt,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image
    };

    updateProduct(idt, updObj);
    navigate1('/home');
  };

  return (
    <div>
      <form onSubmit={idt ? updateFunc : submitFunc}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="title"
            id="title"
            value={item.title}
            onChange={handleChange('title')}
          />
        </div>

        <div>
          <label htmlFor="desc">Description</label>
          <textarea
            rows={10}
            cols={30}
            id="desc"
            placeholder="Enter description"
            value={item.description}
            onChange={handleChange('description')}
            
          ></textarea>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            placeholder="Enter price"
            id="price"
            value={item.price}
            onChange={handleChange('price')}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            value={item.category}
            onChange={handleChange('category')}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Watches">Watches</option>
          </select>
        </div>

        <div>
          <label htmlFor="img">Upload Image</label>
          <input
            type="file"
            id="img"
            onChange={handleChange('image')}
          />
        </div>

        <div>
          {item.img && (
            <img
              src={item.img}
              alt="Uploaded preview"
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
        </div>
        <button type="submit">{idt ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default FormPage;
