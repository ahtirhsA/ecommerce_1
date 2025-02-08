import React,{useContext} from 'react'
import ProductContext from '../context/ProductContext'

const Cart=()=>{

    const {cart}=useContext(ProductContext)

    return(
      <ul>
        {
            cart.map((i)=>{
                return (
                    <li key={i.id}>
                        <img src={i.image} alt={i.title}/>
                        <span> {i.price}</span>
                    </li>
                )
            })
        }
      </ul>
    )
}

export default Cart