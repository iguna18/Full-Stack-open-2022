import { connect } from "react-redux"
import { changeFilter } from '../reducers/filterSlice'

const Filter = (props) => {
  const handleChange = (event) => {
    props.changeFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { changeFilter }

export default connect(null, mapDispatchToProps)(Filter)