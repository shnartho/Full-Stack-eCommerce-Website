export const initialstate =  {
    profile:null,
    pagereload:null,
    cartuncomplit:null,
    cartcomplit:null
}

const reducer = (state,action) =>{
    switch(action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile:action.profile
            }
        case "PAGE_RELOAD":
            return {
                ...state,
                pagereload:action.pagereload
            }
        case "ADD_CARTUNCOMPLIT":
            return {
                ...state,
                cartuncomplit:action.cartuncomplit
            }
        case "ADD_CARTCOMPLIT":
            return {
                ...state,
                cartcomplit:action.cartcomplit
            }
        default:
            return state;    
    }
}

export default reducer;