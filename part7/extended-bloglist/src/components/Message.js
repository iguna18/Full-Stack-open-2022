import {useDispatch, useSelector} from 'react-redux'

const Message = () => {
  let text = useSelector(state => state.message)
  const messageStyle = {
    color:'purple'
  }
  if(!text)
    return null

  return (
    <div style={messageStyle}>
      {text}
    </div>
  )
}

export default Message