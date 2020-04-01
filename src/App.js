import React from 'react';
import './App.css';
import Home from "./components/home/Home";
import About from "./components/about/About";
import Products from "./components/products/Products";
import FirebaseProducts from "./components/firebaseProducts/FireBaseProducts";
import Product from "./components/products/Product";
import SignUpPage from "./components/signing/SignUp";
import SignInPage from "./components/signing/SignIn";
import Navigation from "./components/navigation/Nav";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import fire from "./firebase/Fire";
import {useSelector, useDispatch} from "react-redux";
import {initCart, checkSignIn, currentUser} from "./redux/actions/setActions";

function App(props) {
    const change = useSelector(state=>state.change);
    const signedIn = useSelector(state=>state.signedIn);
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

            console.log(user)

            if (user) {
                dispatch(checkSignIn(true));
                dispatch(currentUser(user));
            } else {
                dispatch(checkSignIn(false));
                dispatch(currentUser({name:""}));
            }
        });

    }, [db,dispatch,change]);

    return (
        <Router>
            <div className="App">
                <Navigation/>
                <Switch>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/about"}>
                        {signedIn? <About/>:<Redirect to={"/signin"}/>}
                    </Route>
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
