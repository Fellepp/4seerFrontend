import React from 'react'
import Lineplot from './plots/Lineplot'
import Barplot from './plots/Barplot'
import Scatterplot from './plots/Scatterplot'
import Boxplot from './plots/Boxplot'
import Distplot from './plots/Distplot'
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
                {input.plot === 'box' ? <Boxplot/> : <></>}
                {input.plot === 'dist' ? <Distplot/> : <></>}

                <br/>

                <button onClick={() => {updatePlot("line")}}>Lineplot</button>
                <button onClick={() => {updatePlot("bar")}}>Barplot</button>
                <button onClick={() => {updatePlot("scatter")}}>Scatterplot</button>
                <br/>
                <button onClick={() => {updatePlot("box")}}>Boxplot</button>
                <button onClick={() => {updatePlot("dist")}}>Distplot</button>

                <br/>
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