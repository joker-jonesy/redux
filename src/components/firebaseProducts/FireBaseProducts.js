import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeSort, checkChange} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";

function FirebaseProducts(props) {
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const [items, setItems]=React.useState(cart);
    const sort= useSelector(state=>state.sort);
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

    React.useEffect(()=>{
        let sortedList = cart;
        for(let i in sort){
            if(sort[i].toggle){
                sortedList=sortedList.filter(it=>{
                    return sort[i].val.includes(it[i])
                });
            }
        }


        setItems(sortedList);
    },[sort, cart]);

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

    const addToMyStuff=(it)=>{

        const newItem ={
            name:it.name
        };

        db.collection("people").doc("fwYuJlXnvDrRRzcpGGEr").collection("mystuff").add(newItem).then(()=>{
            console.log("added");
        });
    };


    let itemsEle = items.map((it, idx) =>

        <div key={idx} onClick={()=>{addToMyStuff(it)}}>
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

                <button style={sort.type.val.includes("shirt")?style:null} onClick={()=>dispatch(changeSort("type","shirt"))}>Shirts</button>
                <button onClick={()=>dispatch(changeSort("type","pants"))}>Pants</button>
                <button onClick={()=>dispatch(changeSort("color","red"))}>Red</button>
                <button onClick={()=>dispatch(changeSort("color","green"))}>Green</button>
                <button onClick={()=>dispatch(changeSort("color","blue"))}>Blue</button>

                <input type="text" placeholder="Name" onChange={handleChange("name")} value={value.name}/>
                <input type="text" placeholder="Cost" onChange={handleChange("cost")} value={value.cost.USA}/>
                <input type="text" placeholder="Type" onChange={handleChange("type")} value={value.type}/>
                <input type="text" placeholder="Color" onChange={handleChange("color")} value={value.color}/>
                <button onClick={submit}>Submit</button>
            </div>
            {items.length === 0 ? "No Items Filtered" : itemsEle}
        </div>
    )
}

export default FirebaseProducts;