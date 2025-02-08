import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from './Products';
import ProductContext from '../context/ProductContext';
import './Home.css'; // Importing the CSS file

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [fil, setFil] = useState([]);
  const { vendors } = useContext(ProductContext);

  const addFunc = () => {
    navigate('/form');
  };

  const cartFuncc = () => {
    navigate('/cart');
  };

  const handleCheckboxChange = (category) => {
    if (!fil.includes(category)) {
      setFil((prev) => [...prev, category]);
    } else {
      const xy = fil.filter((i) => i !== category);
      setFil(xy);
    }
  };

  const arrItems = fil.length !== 0 ? vendors.filter((i) => fil.includes(i.category.toLowerCase())) : vendors;
  const filteredArr = arrItems.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      {/* Filters Section */}
      <div className="filters">
        <div className="search-bar">
          <input
            type="search"
            placeholder="Enter your search item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="checkbox-group">
          <label htmlFor="check1">
            Clothing
            <input type="checkbox" id="check1" onChange={() => handleCheckboxChange('clothing')} value="clothing" />
          </label>
          <label htmlFor="check2">
            Electronics
            <input type="checkbox" id="check2" onChange={() => handleCheckboxChange('electronics')} value="electronics" />
          </label>
          <label htmlFor="check3">
            Watches
            <input type="checkbox" id="check3" onChange={() => handleCheckboxChange('watches')} value="watches" />
          </label>
        </div>
      </div>

      {/* Product list section */}
      <div className="product-list">
        <div>
          <button onClick={addFunc}>Add</button>
        </div>
        <div>
          <button onClick={cartFuncc}>Cart</button>
        </div>

        <ul>
          {filteredArr.map((i) => (
            <li key={i.id} className="product-item">
              <Products obj={i} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
