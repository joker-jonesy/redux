import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setToggle, changeCountry, initCart} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";

function About(){

    const [myItems, setMyItems] = React.useState([]);
    const [countries] = React.useState(["USA", "CANADA"]);
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const db = fire.firestore();

    React.useEffect(() => {
        let newItems = [];

        db.collection("people").doc("fwYuJlXnvDrRRzcpGGEr").collection("mystuff").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();

                let item = {
                    name: object.name,
                    id:doc.id
                };

                newItems.push(item);
            });

            setMyItems(newItems);
        });
    }, [db]);

    let myItemsEle = myItems.map((it,idx)=>
        <div key={idx}>{it.name}</div>
    );

    return(
        <div>
            <h1>{user.name} {user.lastName}</h1>
            <h3>{user.country}</h3>
            <button onClick={()=>dispatch(setToggle())}>Toggle Power</button>
            <button onClick={()=>dispatch(changeCountry("USA"))}>USA</button>
            <button onClick={()=>dispatch(changeCountry("CANADA"))}>CANADA</button>
            <button onClick={()=>dispatch(changeCountry("UK"))}>UK</button>
            {myItemsEle}
        </div>
    )
}

export default About;