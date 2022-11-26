import { useSelector } from 'react-redux'
const Notification = () => {
  const message = useSelector(state => state.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: message.isError? 'red' : 'green' 
  }
  if(message.text == null || message.text === '')
    return <></>
  
  return (
    <div style={style}>
      {message.text}
    </div>
  )
}

export default Notification