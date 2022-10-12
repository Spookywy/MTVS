const initialState = { name: "Name", username: "Username", accountAPI: undefined}

function setProfile(state = initialState, action) {
    let nextState
    switch(action.type) {
        case 'SET_NAME':
            nextState = {
                ... state,
                name: action.value
            }
            return nextState || state
        case 'SET_USERNAME':
            nextState = {
                ... state,
                username: action.value
            }
            return nextState || state
        case 'SET_ACCOUNT_API':
            nextState = {
                ... state,
                accountAPI: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default setProfile