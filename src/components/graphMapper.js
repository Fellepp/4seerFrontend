import React from 'react'
import Lineplot from './plots/Lineplot'
import Barplot from './plots/Barplot'
import Scatterplot from './plots/Scatterplot'
import { changeInputs } from '../store/actions'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

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

const ConnectedGraphMapper = ({ columns, changeInputs, input }) => {
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
                {input.plot === 'line' ? <Lineplot/> : <></>}
                {input.plot === 'bar' ? <Barplot/> : <></>}
                {input.plot === 'scatter' ? <Scatterplot/> : <></>}

                <button onClick={() => {updatePlot("line")}}>Line</button>
                <button onClick={() => {updatePlot("bar")}}>Bar</button>
                <button onClick={() => {updatePlot("scatter")}}>Scatter</button>
          </div>
        )
    }

    return (
        <div>
            {typePlot()}
        </div>
    )
}

const GraphMapper = connect(mapStateToProps, mapDispatchToProps)(ConnectedGraphMapper)
export default GraphMapper