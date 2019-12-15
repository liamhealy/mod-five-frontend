export default function userReducer(state = { user: null }, action) {
    switch(action.type) {
        case "SIGN_IN":
            return { user: action.payload }
        case "SIGN_OUT":
            return { user: null }
        default:
            return state
    }
}