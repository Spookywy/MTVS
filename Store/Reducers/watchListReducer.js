const initialState = { watchList: []}

function toggleWatchList(state = initialState, action) {
    let nextState
    switch(action.type) {
        case 'TOGGLE_WATCHLIST':
            const watchListIndex = state.watchList.findIndex(item => item.id === action.value.id)
            if(watchListIndex !== -1){
                // removal
                nextState = {
                    ...state,
                    watchList: state.watchList.filter( (item, index) => index !== watchListIndex)
                }
            } else {
                // add
                nextState = {
                    ...state,
                    watchList: [ ...state.watchList, action.value]
                }
            }
            // return state if nextstate is undefined
            return nextState || state
        case 'CLEAR_WATCHLIST':
            nextState = {
                ...state,
                watchList: []
            }
            return nextState || state
            
        default:
            return state
    }
}

export default toggleWatchList