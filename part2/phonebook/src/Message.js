const Message = ({messageText, isError}) => {
    if(!messageText) return null
    const messageStyle = {
        color:(isError?'red':'green')
    }
    return (
        <div>
            <h2 style={messageStyle}>
                {messageText}
            </h2>
        </div>
    )
        
    
}

export default Message