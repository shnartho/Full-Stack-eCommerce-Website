export const initialstate =  {
    profile:null,
    pagereload:null,
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
                profile:action.pagereload
            }
        default:
            return state;    
    }
}

export default reducer;