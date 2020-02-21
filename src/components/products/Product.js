import React from "react";
import {useSelector} from "react-redux";

function Product(props) {

    const cart = useSelector(state=>state.cart);

    const returnPrd = (prd)=>{
        return prd.id === props.match.params.id;
    };

    const prd =cart.find(returnPrd);

    return(
        <div>
            <h1>{prd?prd.name:"Product does not exist"}</h1>
        </div>
    )
}

export default Product;