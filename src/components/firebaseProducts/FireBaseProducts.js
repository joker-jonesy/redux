import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeSort, checkChange} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";

function FirebaseProducts(props) {
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const [country] = React.useState(user.country);
    const dispatch=useDispatch();
    const [value, setValues] = React.useState({
        color: "",
        cost: {
            USA: "",
            CANADA: "",
            UK: ""
        },
        name: "",
        type: ""
    });


    const db = fire.firestore();

    const handleChange = prop => event => {
        if (prop === "cost") {
            setValues({
                ...value, [prop]: {
                    USA: Number(event.target.value),
                    CANADA: Number(event.target.value)+5,
                    UK: Number(event.target.value)/2

                }
            });
        } else {
            setValues({...value, [prop]: event.target.value});
        }

    };

    const submit =()=>{
        if(!isNaN(value.cost.USA)){
            db.collection("products").add(value).then(()=>{
                    setValues({
                        color: "",
                        cost: {
                            USA: "",
                            CANADA: "",
                            UK: ""
                        },
                        name: "",
                        type: ""
                    });
                    dispatch(checkChange());
            });

        }

    };

    const deleteItem =(id)=>{
        db.collection("products").doc(id).delete().then(()=>{
            dispatch(checkChange());
        })
    };


    let itemsEle = cart.map((it, idx) =>

        <div key={idx}>
            <h1>{it.name}</h1>
            <h4>{country === "USA" && "Cost in USA:" + it.cost.USA}</h4>
            <h4>{country === "CANADA" && "Cost in CANADA:" + it.cost.CANADA}</h4>
            <h4>{country === "UK" && "Cost in UK:" + it.cost.UK}</h4>
            <button onClick={()=>{deleteItem(it.id)}}>Delete Me</button>
        </div>
    );

    let style = {
        color: "red"
    };

    return (
        <div>
            <div>
                <input type="text" placeholder="Name" onChange={handleChange("name")} value={value.name}/>
                <input type="text" placeholder="Cost" onChange={handleChange("cost")} value={value.cost.USA}/>
                <input type="text" placeholder="Type" onChange={handleChange("type")} value={value.type}/>
                <input type="text" placeholder="Color" onChange={handleChange("color")} value={value.color}/>
                <button onClick={submit}>Submit</button>
            </div>
            {cart.length === 0 ? "No Items Filtered" : itemsEle}
        </div>
    )
}

export default FirebaseProducts;