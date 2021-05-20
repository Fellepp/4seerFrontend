import { sendFile, sendParameters, getImage } from '../models/ModelsBigD'
import React, { useState, useEffect } from 'react'

const UploadCSV = () => {
  const[columns, setColums] = useState([])
  const[image, setImage] = useState(null)
  const[state, setState] = useState({
    status: "",
    sent: false,
    received: false,
    display: false,
    currentImage: ""
  })

  const[input, setInput] = useState({
    csv: "",
    x_label: "",
    y_label: "",
    title: "",
    plot: "",
    head: ""
  })

  const handleFile = async(e) => {
    setImage(null)
    setState({sent: false, received: false, display: false})
    const file = e.target.files[0]
    console.log(file)
    const res = sendFile(file)
    setState({sent: true, received: false})
    let res_resolved = await res;
    setState({sent: true, received: true})
    setColums(res_resolved.data)
    setInput({...input,
      csv: file.name
    })
    //console.log(res_resolved.data)
  }

  async function getImageD() {
    const data = getImage(state.currentImage);
    const data_resolved = await data;
    setImage(data_resolved)
  }

  function didUpdate() {
    if (state.display){
      getImageD()
    }
  }
  
  useEffect(didUpdate);

  const showOptions = () => {
    const setColumns = () => {
      var dropdown = document.getElementById("x-label")
      columns.map(function (item) {
        var option = document.createElement("option");
        option.value = item
        option.text = item
        dropdown.appendChild(option)
      })

      var dropdown = document.getElementById("y-label")
      columns.map(function (item) {
        var option = document.createElement("option");
        option.value = item
        option.text = item
        dropdown.appendChild(option)
      })
      
    }

    const onSubmit = async(e) => {
      setState({display: false})
      e.preventDefault()
      console.log("Sending", input)
      const res = sendParameters(input)
      let res_resolved = await res
      console.log(res_resolved)
      setState({display: true, currentImage: res_resolved.data})
    }

    const handleChange = (e) => {
      let {name,value} = e.target;
      if (!name || !value) {
        return
      }
      console.log(e.target.name, e.target.value)
      setInput({...input,
        [name]: value
      })
      console.log(input)
    }

    return(
      <div>
        <div id="dd_col1" onLoad={setColumns()}>
            <label id="col1_label_name">x-label: </label>
            <select id="x-label" name="x_label" onChange={handleChange}></select>
        </div>
        <div id="dd_col2">
            <label id="col2_label_name">y-label: </label>
            <select id="y-label" name="y_label" onChange={handleChange}></select>
        </div>
        <input placeholder='Enter title here...' type='text' id='title' name='title' onChange={handleChange}></input>
        <div>
          <input type='radio' name='plot' value="line" onChange={handleChange}/> Lineplot <br/>
          <input type='radio' name='plot' value="bar" onChange={handleChange}/> Barplot <br/>
          <input type='radio' name='plot' value="scatter" onChange={handleChange}/> Scatterplot 
        </div>
        <label>How many elements?</label>
        <select id='head' name='head' onChange={handleChange}>
          <option value="" disabled selected hidden> Choose your size </option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
        </select><br/>

        <button type='button' onClick={onSubmit}>Submit</button>
      </div>
    )
  }

  return (
    <div className="file-uploader">
      <input type="file" accept=".csv" onChange={handleFile}></input>
      {state.received ? showOptions() : <></>}
      <img alt="" src={image}/>
      {image === null ? <p>You have to upload the dataset before you can display any data</p> : <></>}
    </div>
  )
}

export default UploadCSV
