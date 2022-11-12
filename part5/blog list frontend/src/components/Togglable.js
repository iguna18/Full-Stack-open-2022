import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <div>
        {!visible ? <button id='showbutton'
          onClick={ () => setVisible(!visible) }>{ props.buttonLabel }</button> : <></>}
      </div>
      {visible ? props.children : <></>}
      <div>
        <button onClick={() => setVisible(!visible)}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
