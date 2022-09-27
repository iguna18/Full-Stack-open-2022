const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user_id')
  response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  request.body.user_id = request.user_id
  if(!request.body.title && !request.body.url) {
    response.status(400).end()
    return
  }
  const user = await User.findById(request.body.user_id)
  if(!user) {
    return response.status(401).end({error:"token in correct format but the passed id deosnt belong to any user (expired token?)"})
  }
  const blog = new Blog(request.body)
  const result = await blog.save()

  if(!user.blog_ids) //in case the document is not in the format described in the scheme
    user.blog_ids = []
  
  user.blog_ids = user.blog_ids.concat(result.id)
  await user.save()

  response.status(201).json(result)
})
 

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog || !blog.user_id) 
    return response.status(404).send({error:"nothing to delete"})
  
  // console.log(blog.user_id.toString(), request.user_id.toString())
  if (blog.user_id.toString() != request.user_id.toString()) {
    return response.status(401).send({error:"unauthorized, this blog was not created by the currently logged in user, cannot delete"})
  }

  //deleting every mention of this blog in creator user's bloglist
  const user = await User.findById(blog.user_id)
  user.blog_ids = user.blog_ids.filter(b_id => b_id != blog.id)
  user.save()

  await Blog.findByIdAndRemove(request.params.id)
  response.json({deleted:blog})
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  
  const blog = request.body
  const ret = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.status(200).send(ret)
})

module.exports = blogsRouter