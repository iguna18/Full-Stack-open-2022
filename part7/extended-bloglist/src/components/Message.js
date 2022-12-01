import {useDispatch, useSelector} from 'react-redux'

const Message = () => {
  // const dispatch = useDispatch()
  // dispatch()
  let text = useSelector(state => state.message)
  const messageStyle = {
    colort:'purple'
    // color:(isError?'red':'green')
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