import React from 'react'
import { changeState, changeColumns, changeInputs, changeImage } from '../store/actions'
import { connect } from 'react-redux'
import { sendFile, sendParameters, getImage } from '../models/ModelsBigD'
import Predicts from './Predicts'
import { useState, useEffect } from 'react'

const mapStateToProps = (state) => {
    return {
      currentState: state.stateRed.currentState,
      columns: state.colRed.columns,
      inputs: state.inRed.inputs,
      img: state.imgRed.currentImage
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: currentState => dispatch(changeState(currentState)),
        changeColumns: columns => dispatch(changeColumns(columns)),
        changeInputs: inputs => dispatch(changeInputs(inputs)),
        changeImage: img => dispatch(changeImage(img))
    }
}

const ConnectedPredictMapper = ({ currentState,  changeState, columns, changeColumns, inputs, changeInputs, img, changeImage }) => {
    const [locStates, setLocStates] = useState(currentState)

    const handleCSV = async(e) => {
        if (e.target.files[0]){
            const file = e.target.files[0]
            const res = sendFile(file)
            currentState.sent = true
            changeState(currentState)
            setLocStates(currentState)
    
            let res_resolved = await res;
            currentState.received = true
            changeState(currentState)
            setLocStates(currentState)
    
            changeColumns(res_resolved.data)
            inputs.csv = file.name
            changeInputs(inputs)
        }
    }

    const resetState = (e) => {
        console.log("Click")
        changeState({sent: false, received: false, parameters: false,  display: false})
        changeImage("")
        changeInputs({csv: "", plot: "", title: "", y_label: "", x_label: "", arg1: ""})
        changeColumns([])
    }

    return (
        <div className="file-uploader">
            {currentState.received ? <Predicts/> : <></>}
            <br/>
            <input type="file" accept=".csv" onClick={resetState} onChange={handleCSV}></input>
            {currentState.sent ? <></> : <p>You have to upload the dataset before you can display any data</p>}
        </div>
    )
}

const PredictMapper = connect(mapStateToProps, mapDispatchToProps)(ConnectedPredictMapper)
export default PredictMapper
