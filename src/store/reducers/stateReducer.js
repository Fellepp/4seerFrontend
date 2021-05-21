import { CHANGE_STATE } from '../constants'
import update from 'react-addons-update'

const initState = {
    currentState: {
        sent: false,
        received: false,
        parameters: false,
        display: false
    }
}

export const stateReducer = (state=initState, action) => {
    switch (action.type) {
        case CHANGE_STATE:
            return Object.assign({}, state, {
                currentState: action.payload
            })
        default:
            return state
    }
}
