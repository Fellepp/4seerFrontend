import React from 'react'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { changeInputs } from '../../store/actions'

const mapStateToProps = (state) => {
    return {
      columns: state.colRed.columns,
      inputs: state.inRed.inputs
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputs: inputs => dispatch(changeInputs(inputs))
    }
}

const ConnectedLineplot = ({ columns, inputs, changeInputs }) => {
    const [loColumns, setColumns] = useState(columns)
    const [locInputs, setInputs] = useState(inputs)

    const handleChange = (e) => {
        let id = e.target.id
        let pos = ""
        let value = ""

        if (id === "y_label"){
            pos = e.target.options.selectedIndex
            value = columns[e.target.options.selectedIndex]
        }
        else if (id === "x_label" || id === "title"){
            value = [e.target.value]
        }

        inputs[id] = value
        changeInputs(inputs)
        setInputs(inputs)

        console.log("EVENT:", e)
        console.log("COLUMNS", columns)
        console.log("INPUTS", inputs)

        console.log("ID", id, "POS", pos, "VALUE", value)

        console.log("INPUTS", inputs)
        console.log("LOCINPUTS", locInputs)
    }

    return (
        <div>
            <input placeholder='Enter title here...' type='text' id='title' name='title' onChange={handleChange}></input><br/>

            <input placeholder='Enter player name(s) here...' type='text' id='x_label' name='x-label' onChange={handleChange}></input><br/>

            <select id="y_label" onChange={handleChange}>
                {loColumns.map((column) => (
                    <option key={column} label={column}></option>
                ))}
            </select>
        </div>
    )
}

const Lineplot = connect(mapStateToProps, mapDispatchToProps)(ConnectedLineplot)


export default Lineplot