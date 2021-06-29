import {combineReducers} from 'redux';
import authReducer from './authReducer'
import postReducer from './postReducer';

const rootReducer = combineReducers({
    authReducer:authReducer,
    postReducer:postReducer
})
export default rootReducer