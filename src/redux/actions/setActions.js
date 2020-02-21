export const setToggle = ()=>{
    return {
        type:"SET_TOGGLE"
    }
};

export const changeCountry = (country)=>{
    return {
        type:"CHANGE_COUNTRY",
        country:country
    }
};

export const changeSort = (prop,val)=>{
    return {
        type:"CHANGE_SORT",
        val:val,
        prop:prop
    }
};

