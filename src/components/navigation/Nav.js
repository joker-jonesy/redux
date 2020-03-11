import React from "react";
import fire from "../../firebase/Fire";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Navigation(){

    const signedIn = useSelector(state=>state.signedIn);

    const SignOut = ()=>{
        fire.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    };

    return(
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/fireproducts"}>Products</Link>
            <Link to={"/product/1"}>Product</Link>
            {!signedIn?(<span><Link to={"/signup"}>Sign Up</Link> <Link to={"/signin"}>Sign In</Link></span>):(<button onClick={SignOut}>Sign Out</button>)}


        </nav>
    )
}

export default Navigation;