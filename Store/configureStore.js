import { createStore } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'
import setProfile from './Reducers/profileReducer'
import setSession from './Reducers/sessionReducer'
import storage from 'redux-persist/lib/storage'
import toggleWatchList from './Reducers/watchListReducer'

const rootPersistConfig = {
    key: 'root',
    storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar, setProfile, setSession, toggleWatchList}))