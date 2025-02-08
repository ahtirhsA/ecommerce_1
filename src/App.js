import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import FormPage from "./components/FormPage";
import ProductContext from "./context/ProductContext";
import Register from "./components/Register";
import Login from "./components/Login"
import Cart from "./components/Cart";

const App = () => {

  const [vendors, setVendorsArr] = useState([]);
  const [cart,setCart]=useState([])
  const [loggedInUser,setUser]=useState('')

  const userFunc=(nam)=>{
    setUser(nam) 
  }

  console.log(loggedInUser)

  const addCartFunc=(cartItems)=>{

    const x=JSON.parse(localStorage.getItem('users'))
    const indi=x.findIndex((i)=>i.username==loggedInUser)

    x[indi].cart.push(cartItems)
       
    setCart(prev=>[...prev,cartItems])
    localStorage.setItem('users',JSON.stringify(x))

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

    const savedVendors = localStorage.getItem('vendors');
    if (savedVendors) {
      //try {
        const parsedVendors = JSON.parse(savedVendors);
        setVendorsArr(parsedVendors); // Successfully parsed vendors
     // } catch (error) {
       // console.error("Error parsing vendors from localStorage:", error);
       // vendorApi(); // Fetch data again if there was an error
    //  }
    } else {
      vendorApi(); // Fetch data if no vendors in localStorage
    }

   const userArr=JSON.parse(localStorage.getItem('users'))
   const indx=userArr.findIndex((i)=>i.username==loggedInUser)
   if (indx !== -1){
   if ('cart' in userArr[indx]){
       setCart(userArr[indx].cart)
   }
   else{
      setCart([])
      userArr[indx].cart=[]
      localStorage.setItem('users',JSON.stringify(userArr))
   }
  }
   




  }, [loggedInUser]);

  return (
    <ProductContext.Provider value={{ vendors, addProduct, updateProduct, deleteProduct,cart,loggedInUser,userFunc,addCartFunc}}>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </ProductContext.Provider>
  );
};

export default App;
