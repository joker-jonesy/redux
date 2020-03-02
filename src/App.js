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
import {initCart} from "./redux/actions/setActions";

function App(props) {
    const change = useSelector(state=>state.change);
    const dispatch = useDispatch();
    const db = fire.firestore();

    React.useEffect(() => {
        let newItems = [];

        db.collection("products").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();

                let item = {
                    color: object.color,
                    cost: {
                        USA: object.cost.USA,
                        CANADA: object.cost.CANADA,
                        UK: object.cost.UK
                    },
                    name: object.name,
                    type: object.type,
                    id:doc.id
                };

                newItems.push(item);
            });

            dispatch(initCart(newItems));
        });
    }, [db,dispatch,change]);

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
