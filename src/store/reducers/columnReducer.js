import { CHANGE_COLUMNS } from '../constants'

const initState = {
    columns: []
}

export const columnReducer = (state=initState, action) => {
    switch (action.type) {
        case CHANGE_COLUMNS:
            return Object.assign({}, state, {
                columns: action.payload
            })
        default:
            return state
    }
}
