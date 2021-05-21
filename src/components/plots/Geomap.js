import React from 'react'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { changeInputs, changeState, changeImage } from '../../store/actions'
import { sendParameters, getImage } from '../../models/ModelsBigD'

const mapStateToProps = (state) => {
    return {
      columns: state.colRed.columns,
      inputs: state.inRed.inputs,
      states: state.stateRed.currentState,
      img: state.imgRed.currentImage
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputs: inputs => dispatch(changeInputs(inputs)),
        changeState: states => dispatch(changeState(states)),
        changeImage: img => dispatch(changeImage(img))
    }
}

const ConnectedGeoMap = ({ columns, inputs, changeInputs, states, changeState, img, changeImage }) => {
    const [loColumns, setColumns] = useState(columns)
    const [locInputs, setInputs] = useState(inputs)
    const [locState, setLocState] = useState(states)
    const [locImg, setImage] = useState(img)

    const handleChange = (e) => {
        let id = e.target.id
        let pos = ""
        let value = ""

        value = e.target.value

        inputs[id] = value
        inputs.plot = 'geo'
        changeInputs(inputs)
        setInputs(inputs)

        console.log("EVENT:", e)
        console.log("COLUMNS", columns)
        console.log("INPUTS", inputs)

        console.log("ID", id, "POS", pos, "VALUE", value)

        console.log("INPUTS", inputs)
        console.log("LOCINPUTS", locInputs)
    }

    const onSubmit = () => {
        console.log("Submit")
        states.parameters = false
        changeState(states)
        setLocState({states})
        states.parameters = true
        changeState(states)
        setLocState({states})
    }

    useEffect(() => {
        didUpdate()
    })

    const didUpdate = () => {
        if (states.parameters){
            console.log("Sending parameters")
            sendParams()

        }
        else if (states.display){
            console.log("Displaying image")
            getImg()
        }
    }

    const sendParams = async() =>{
        const res = sendParameters(inputs)
        let res_resolved = await res
        states.display = true
        states.parameters = false
        changeState(states)
        setLocState({states})
    }

    const getImg = async() => {
        const data = getImage(inputs.plot)
        let data_resolved = await data
        states.display = false
        changeState(states)
        setLocState({states})

        changeImage(data_resolved)
        setImage({img})

    }

    return (
        <div>

            <img alt="" src={img}/><br/>

            <input placeholder='Enter title here...' type='text' id='title' name='title' onChange={handleChange}></input><br/>


            <button type='button' onClick={onSubmit}>Submit</button>
        </div>
    )
}

const GeoMap = connect(mapStateToProps, mapDispatchToProps)(ConnectedGeoMap)


export default GeoMap