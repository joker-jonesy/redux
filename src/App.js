import React from 'react';
import './App.css';
import Home from "./components/home/Home";
import About from "./components/about/About";
import Products from "./components/products/Products";
import FirebaseProducts from "./components/firebaseProducts/FireBaseProducts";
import Product from "./components/products/Product";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import fire from "./firebase/Fire";
import {useSelector, useDispatch} from "react-redux";

function App(props) {

    const cart = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    const db = fire.firestore();
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/fireproducts"}>Products</Link>
                    <Link to={"/product/1"}>Product</Link>
                </nav>
                <Switch>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/about"} component={About} />
                    <Route path={"/fireproducts"} component={FirebaseProducts} />
                    <Route path={"/product/:id"} component={Product}/>
                </Switch>
            </div>
        </Router>
    );
}



export default App;
