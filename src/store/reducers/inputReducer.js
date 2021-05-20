import { CHANGE_INPUTS } from '../constants'

const initState = {
    inputs: {
        csv: "",
        plot: "",
        title: "",
        y_label: "",
        x_label: "",
        arg1: ""
    }
}

export const inputReducer = (state=initState, action) => {
    switch (action.type) {
        case CHANGE_INPUTS:
            return Object.assign({}, state, {
                inputs: action.payload
            })
        default:
            return state
    }
}
