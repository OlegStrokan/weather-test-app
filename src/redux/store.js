
import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import {mainReducer} from "./weather-reducer/reducer";


let rootReducer = combineReducers({
    main: mainReducer,
})

let store = createStore(rootReducer,applyMiddleware(thunkMiddleware))



export default store
