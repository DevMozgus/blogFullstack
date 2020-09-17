import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideOnVisible = { display: visible ? 'none' : '' }
  const showOnVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        toggleVisible
      }
    }
  )

  return (
    <div >
      <div style={hideOnVisible} >
        <button onClick={toggleVisible}>{props.label1}</button>
      </div>
      <div style={showOnVisible} className="togglableContent" >
        {props.children}
        <button onClick={toggleVisible}>{props.label2}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
}

export default Togglable