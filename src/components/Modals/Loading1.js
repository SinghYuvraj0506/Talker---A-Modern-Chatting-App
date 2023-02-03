import React from 'react'
import "./Modal.css"

function Loading1() {
  return (
    <div className="Loader_main_box">
        <img src={require("../loader.gif")} alt="Loading..." />
    </div>
  )
}

export default Loading1