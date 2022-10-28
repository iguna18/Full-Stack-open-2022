const Blog = ({blog}) => (
  <div>
    {Object.keys(blog).map(key => `${key}: ${blog[key]} `)} 
  </div>  
)

export default Blog