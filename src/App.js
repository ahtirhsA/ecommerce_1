import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import FormPage from "./components/FormPage";
import ProductContext from "./context/ProductContext";
import Register from "./components/Register";
import Login from "./components/Login"

const App = () => {

  const [vendors, setVendorsArr] = useState([]);
  const [cart,setCart]=useState([])
  const [loggedInUser,setUser]=useState('')

  const userFunc=(nam)=>{
    setUser(loggedInUser) 
  }


  const addCartFunc=(cartItems)=>{


    const arrUsers1=JSON.parse(localStorage.getItem('users'))

    const indx1= arrUsers1.findIndex((i) => i.username === loggedInUser); 

   setCart(prevCart=>{
    arrUsers1[indx1].cart.push(cartItems)
    localStorage.setItem('users',JSON.stringify(arrUsers1))
    return [...prevCart,cartItems]
   })
  }

  const addProduct = (item) => {


    setVendorsArr((prev) => {
      const updatedVendors = [...prev, item];
      localStorage.setItem('vendors', JSON.stringify(updatedVendors)); // Save to localStorage
      return updatedVendors;
    });
  };

  const updateProduct = (identity, ob) => {
    const newArr = vendors.map((i) => {
      if (i.id === identity) {
        return { ...i, ...ob };
      }
      return i;
    });

    setVendorsArr(newArr);
    localStorage.setItem('vendors', JSON.stringify(newArr)); // Save updated vendors to localStorage
  };

  const deleteProduct = (delId) => {
    const filArr = vendors.filter((i) => i.id !== delId);

    setVendorsArr(filArr);
    localStorage.setItem('vendors', JSON.stringify(filArr)); // Save filtered vendors to localStorage
  };

  const vendorApi = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const jsondata = await response.json();

    if (response.ok) {
      setVendorsArr(jsondata);
      localStorage.setItem('vendors', JSON.stringify(jsondata)); // Save fetched vendors to localStorage
    }
  };

  useEffect(() => {



    const arrUsers=JSON.parse(localStorage.getItem('users'))||[]

    const indx = arrUsers.findIndex((i) => i.username === loggedInUser); 



    const savedVendors = localStorage.getItem('vendors');
    if (savedVendors) {
      try {
        const parsedVendors = JSON.parse(savedVendors);
        setVendorsArr(parsedVendors); // Successfully parsed vendors
      } catch (error) {
        console.error("Error parsing vendors from localStorage:", error);
        vendorApi(); // Fetch data again if there was an error
      }
    } else {
      vendorApi(); // Fetch data if no vendors in localStorage
    }


    if (indx!==-1){
    if ('cart' in arrUsers[indx]){
      setCart(arrUsers[indx].cart)
    }
    else{
       setCart([])
       arrUsers[indx]['cart']=[]
       localStorage.setItem('users',JSON.stringify(arrUsers))
    }
  }




  }, [loggedInUser]);

  return (
    <ProductContext.Provider value={{ vendors, addProduct, updateProduct, deleteProduct,cart,addCartFunc,loggedInUser,userFunc}}>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </ProductContext.Provider>
  );
};

export default App;
