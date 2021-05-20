import { CHANGE_IMG, CHANGE_STATE, CHANGE_COLUMNS, CHANGE_INPUTS } from './constants'

export const changeState = (newState) => {
    return { type: CHANGE_STATE, payload: newState }
}

export const changeImage = (newImage) => {
    return { type: CHANGE_IMG, payload: newImage }
}

export const changeColumns = (updatedColumns) => {
    return { type: CHANGE_COLUMNS, payload: updatedColumns }
}

export const changeInputs = (newInputs) => {
    return { type: CHANGE_INPUTS, payload: newInputs }
}