const initialState = {session_id: undefined}

function setSession(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SET_SESSION_ID':
            nextState = {
                ...state,
                session_id: action.value
            }
            return nextState || state
    
        default:
            return state;
    }
}

export default setSession