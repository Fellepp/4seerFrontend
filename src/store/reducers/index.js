import { createStore, combineReducers } from 'redux';
import { stateReducer } from './stateReducer'
import { imgReducer } from './imgReducer'
import { inputReducer } from './inputReducer'
import { columnReducer } from './columnReducer'


const rootReducer = combineReducers({
    stateRed: stateReducer,
    imgRed: imgReducer,
    colRed: columnReducer,
    inRed: inputReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;