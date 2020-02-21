const initState = {
    toggle:false,
    sort:{
        type:{toggle:false, val:[]},
        color:{toggle:false, val:[]}
    },
    user:{
        name:"Luke",
        lastName:"Jones",
        country:"CANADA"
    },
    cart:[
        {
            id:"1234",
            name:"Diapers",
            type:"pants",
            color:"red",
            cost:{
                USA:6.99,
                CANADA:10.99,
                UK:1.22
            }
        },
        {
            id:"5678",
            name:"Shirts",
            type:"shirt",
            color:"blue",
            cost:{
                USA:7.99,
                CANADA:11.99,
                UK:2.22
            }
        },
        {
            id:"6969",
            name:"Pants",
            type:"pants",
            color:"green",
            cost:{
                USA:8.99,
                CANADA:12.99,
                UK:3.22
            }
        },
        {
            id:"6868",
            name:"Shorts",
            type:"pants",
            color:"red",
            cost:{
                USA:8.99,
                CANADA:12.99,
                UK:3.22
            }
        },
        {
            id:"6767",
            name:"Sweater",
            type:"shirt",
            color:"green",
            cost:{
                USA:8.99,
                CANADA:12.99,
                UK:3.22
            }
        },
        {
            id:"666",
            name:"Graphic Tee",
            type:"shirt",
            color:"blue",
            cost:{
                USA:8.99,
                CANADA:12.99,
                UK:3.22
            }
        }
    ]
};

const rootReducer = (state=initState, action)=>{
    if(action.type==="SET_TOGGLE"){
        return{
            ...state,
            toggle:!state.toggle,
            // user:{
            //     ...state.user,
            //     country:(!state.toggle?"USA":"CANADA")
            // }
        }
    }

    if(action.type==="CHANGE_COUNTRY"){
        return{
            ...state,
            user:{
                ...state.user,
                country:action.country
            }
        }
    }

    if(action.type==="CHANGE_SORT"){

        let orgArray = state.sort[action.prop].val;

        if(orgArray.includes(action.val)){
            let ind = orgArray.indexOf(action.val);
            orgArray.splice(ind,1);

        }else{
            orgArray.push(action.val)
        }

        let togg = orgArray.length > 0;


        return{
            ...state,
            sort:{
                ...state.sort,
                [action.prop]:{
                    toggle:togg,val:orgArray
                }

            }
        }
    }

    return state;
};

export default  rootReducer;