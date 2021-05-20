import { CHANGE_IMG } from '../constants'

const initState = {
    currentImage: null
}

export const imgReducer = (state=initState, action) => {
    switch (action.type) {
        case CHANGE_IMG:
            return Object.assign({}, state, {
                currentImage: action.payload
            })
        default:
            return state
    }
}
