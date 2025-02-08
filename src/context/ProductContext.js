import React from "react";


const ProductContext=React.createContext(
    {
        loggedInUser:'',
        userFunc:()=>{},
        vendors:[],
        addProduct:()=>{},
        updateProduct:()=>{},
        deleteProduct:()=>{},
        cart:[],
        addCartFunc:()=>{}
    }
)

export default ProductContext