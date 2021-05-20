import React from 'react'
import { changeState, changeColumns, changeInputs } from '../store/actions'
import { connect } from 'react-redux'
import { sendFile, sendParameters, getImage } from '../models/ModelsBigD'
import GraphMapper from './graphMapper'
import { useState } from 'react'

const mapStateToProps = (state) => {
    return {
      currentState: state.stateRed.currentState,
      columns: state.colRed.columns,
      inputs: state.inRed.inputs
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: currentState => dispatch(changeState(currentState)),
        changeColumns: columns => dispatch(changeColumns(columns)),
        changeInputs: inputs => dispatch(changeInputs(inputs))
    }
}

const ConnectedVisualizeUpload = ({ currentState,  changeState, columns, changeColumns, inputs, changeInputs }) => {
    const handleCSV = async(e) => {
        const file = e.target.files[0]
        const res = sendFile(file)
        changeState({sent: true, received: false, display: false})
        let res_resolved = await res;
        changeState({sent: true, received: true, display: false})
        changeColumns(res_resolved.data)
        inputs.csv = file.name
        changeInputs(inputs)
    }

    const resetState = (e) => {
        console.log("Click")
        changeState({sent: false, received: false, display: false})
    }
    return (
        <div className="file-uploader">
            {currentState.received ? <GraphMapper/> : <></>}
            <input type="file" accept=".csv" onClick={resetState} onChange={handleCSV}></input>
            {currentState.sent ? <></> : <p>You have to upload the dataset before you can display any data</p>}
            {console.log(currentState)}
            {console.log(columns)}
        </div>
    )
}

const VisualizeUpload = connect(mapStateToProps, mapDispatchToProps)(ConnectedVisualizeUpload)
export default VisualizeUpload
