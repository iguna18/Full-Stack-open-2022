import { connect } from 'react-redux'
const Notification = ({ message }) => {
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

const mapStateToProps = (state) => {
  return { 
    message: state.message
  }
}
const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification