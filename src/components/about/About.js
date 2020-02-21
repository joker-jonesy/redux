import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setToggle, changeCountry} from "../../redux/actions/setActions";

function About(){

    const [countries] = React.useState(["USA", "CANADA"]);
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();

    return(
        <div>
            <h1>{user.name} {user.lastName}</h1>
            <h3>{user.country}</h3>
            <button onClick={()=>dispatch(setToggle())}>Toggle Power</button>
            <button onClick={()=>dispatch(changeCountry("USA"))}>USA</button>
            <button onClick={()=>dispatch(changeCountry("CANADA"))}>CANADA</button>
            <button onClick={()=>dispatch(changeCountry("UK"))}>UK</button>
        </div>
    )
}

export default About;