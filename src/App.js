import React from 'react';
import './App.css';
import Home from "./components/home/Home";
import About from "./components/about/About";
import Products from "./components/products/Products";
import FirebaseProducts from "./components/firebaseProducts/FireBaseProducts";
import Product from "./components/products/Product";
import SignUpPage from "./components/signing/SignUp";
import SignInPage from "./components/signing/SignIn";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import fire from "./firebase/Fire";
import {useSelector, useDispatch} from "react-redux";
import {initCart, checkSignIn, currentUser} from "./redux/actions/setActions";

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

        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(checkSignIn(true));
                dispatch(currentUser(user));
            } else {
                dispatch(checkSignIn(false));
                dispatch(currentUser({name:""}));
            }
        });

    }, [db,dispatch,change]);

    const SignOut = ()=>{
        fire.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    }

    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/fireproducts"}>Products</Link>
                    <Link to={"/product/1"}>Product</Link>
                    <Link to={"/signup"}>Sign Up</Link>
                    <Link to={"/signin"}>Sign In</Link>
                    <button onClick={SignOut}>Sign Out</button>
                </nav>
                <Switch>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/about"} component={About} />
                    <Route path={"/fireproducts"} component={FirebaseProducts} />
                    <Route path={"/product/:id"} component={Product}/>
                    <Route path={"/signup"} component={SignUpPage}/>
                    <Route path={"/signin"} component={SignInPage}/>
                </Switch>
            </div>
        </Router>
    );
}



export default App;
