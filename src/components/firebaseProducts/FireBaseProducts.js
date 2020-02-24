import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeSort} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";

function FirebaseProducts(props) {
    const [items, setItems] = React.useState([]);
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const sort = useSelector(state => state.sort);
    const [country] = React.useState(user.country);
    const dispatch = useDispatch();

    // React.useEffect(()=>{
    //     let sortedList = cart;
    //     for(let i in sort){
    //         if(sort[i].toggle){
    //             sortedList=sortedList.filter(it=>{
    //                 return sort[i].val.includes(it[i])
    //             });
    //         }
    //     }
    //
    //
    //     setItems(sortedList);
    // },[sort, cart]);

    const db = fire.firestore();

    React.useEffect(()=> {
        let newItems = [];

        db.collection("products").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();
                console.log(doc.data().name);

                let item = {
                    color: object.color,
                    cost: {
                        USA: object.cost.USA,
                        CANADA: object.cost.CANADA,
                        UK: object.cost.UK
                    },
                    name: object.name,
                    type: object.type
                };

                newItems.push(item);
            });
        });

        setItems(newItems);

    }, [cart]);


    let itemsEle = items.map((it, idx) =>

        <div key={idx}>
            <h1>{it.name}</h1>
            <h4>{country === "USA" && "Cost in USA:" + it.cost.USA}</h4>
            <h4>{country === "CANADA" && "Cost in CANADA:" + it.cost.CANADA}</h4>
            <h4>{country === "UK" && "Cost in UK:" + it.cost.UK}</h4>
        </div>
    );

    let style = {
        color: "red"
    };

    return (
        <div>
            <button style={sort.type.val.includes("shirt") ? style : null}
                    onClick={() => dispatch(changeSort("type", "shirt"))}>Shirts
            </button>
            <button onClick={() => dispatch(changeSort("type", "pants"))}>Pants</button>
            <button onClick={() => dispatch(changeSort("color", "red"))}>Red</button>
            <button onClick={() => dispatch(changeSort("color", "green"))}>Green</button>
            <button onClick={() => dispatch(changeSort("color", "blue"))}>Blue</button>
            {items.length === 0 ? "No Items Filtered" : itemsEle}
        </div>
    )
}

export default FirebaseProducts;