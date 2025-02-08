import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../context/ProductContext'
import './Products.css'


const Products=(props)=>{

    const navigate2=useNavigate()

    const {deleteProduct,addCartFunc}=useContext(ProductContext)

    const {obj}=props

    const {id,title,description,image,category,rating,price}=obj

    const updFunc=()=>{

        navigate2('/form',{state:{idt:id, data:obj}})
    }

    const delFunc=()=>{
        deleteProduct(id)
    }

    const cartFunc=()=>{
        addCartFunc(obj)
    }
    

    return(
        <li>
            <img src={image} alt={title} className='img'/>
            <div>
                <h3> {title} </h3>
                <p> {description}</p>
                <p> {price}</p>
            </div>
            <button onClick={updFunc}> Edit </button>
            <button onClick={delFunc}> Delete </button>
            <button onClick={cartFunc}> Add to cart </button>
        </li>
    )
}

export default Products