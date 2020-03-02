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

    if(action.type==="INIT_CART"){
        return{
            ...state,
            cart:action.value
        }
    }

    return state;
};

export default  rootReducer;