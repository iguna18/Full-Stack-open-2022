const Message = ({ text, isError }) => {
  const messageStyle = {
    color:(isError?'red':'green')
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