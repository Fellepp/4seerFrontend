import React from 'react'
import { changeInputs } from '../store/actions'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import LinearReg from './machineLearning/LinearReg'
import Forest from './machineLearning/Forest'
import Kmeans from './machineLearning/Kmeans'

const mapStateToProps = (state) => {
    return {
      columns: state.colRed.columns,
      input: state.inRed.inputs
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputs: inputs => dispatch(changeInputs(inputs))
    }
}

const ConnectedPredicts = ({ columns, changeInputs, input }) => {
    const [currentInput, setCurrentInput] = useState({})

    useEffect(() => {
        console.log("Re-rendering")
    })

    const typePlot = () => {
        const updatePlot = (newPlot) => {
            input.plot = newPlot
            changeInputs(input)
            setCurrentInput({input})
        }

        return(
            <div>
                {input.plot === 'lin' ? <LinearReg/> : <></>}
                {input.plot === 'forest' ? <Forest/> : <></>}
                {input.plot === 'kmeans' ? <Kmeans/> : <></>}

                <br/>

                <button onClick={() => {updatePlot("lin")}}>Linear regression</button>
                <button onClick={() => {updatePlot("forest")}}>Random forest</button>
                <button onClick={() => {updatePlot("kmeans")}}>Kmeans clustering</button>
          </div>
        )
    }

    return (
        <div>
            {typePlot()}
        </div>
    )
}

const Predicts = connect(mapStateToProps, mapDispatchToProps)(ConnectedPredicts)
export default Predicts