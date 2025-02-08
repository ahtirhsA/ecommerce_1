import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Products from './Products'
import {v4 as uuidv4} from 'uuid'
import ProductContext from '../context/ProductContext'

const Home=()=>{

    const navigate=useNavigate()


   const {vendors}=useContext(ProductContext)

   const addFunc=()=>{
       navigate('/form')
   }

   const cartFuncc=()=>{
    navigate('/cart')
   }

    return (
        <div>
            <button onClick={addFunc}> Add </button>
            <button onClick={cartFuncc}>Cart</button>
            <ul>
                {
                   vendors.map((i)=><Products key={i.id} obj={i}/>) 
                }
            </ul>
        </div>
    )
}

export default Home