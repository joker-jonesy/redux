import React from "react";
import fire from "../../firebase/Fire";
import {useDispatch} from "react-redux";
import {checkChange} from "../../redux/actions/setActions";

function SignUpPage(){
    const [value, setValues] = React.useState({
        email: "",
        password:"",
        name:""
    });
    const dispatch = useDispatch();
    const db = fire.firestore();

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = ()=>{
        fire.auth().createUserWithEmailAndPassword(value.email, value.password).then(()=>{
            let user = fire.auth().currentUser;

            user.updateProfile({
                displayName: value.name
            }).then(function() {
                setValues({
                    email: "",
                    password:"",
                    name:""
                });

                dispatch(checkChange());

                db.collection("people").doc(user.uid).collection("mystuff").add({name:"Jerry"});
            }).catch(function(error) {
                // An error happened.
            });



        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
           let errorMessage = error.message;
            // ...
        });
    };


    return(
        <div>
            <input onChange={handleChange("email")} placeholder={"Email..."}/>
            <input onChange={handleChange("password")} placeholder={"Password..."} type={"password"}/>
            <input onChange={handleChange("name")} placeholder={"Name..."}/>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default SignUpPage;