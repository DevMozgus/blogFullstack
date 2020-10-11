const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { response } = require("express");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  if (blogs.length > 20) {
    await Blog.deleteMany({})
    await User.deleteMany({})
  }
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = request.token; //getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: [],
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const post = await Blog.findById(request.params.id);
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  if (post.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: "invalid token" });
  }
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const post = await Blog.findById(request.params.id);
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  /* if (post.user.toString() !== decodedToken.id.toString()) {
    response.status(401).json({ error: "invalid token" });
  } */

  const body = request.body;

  const user = await User.findById(decodedToken.id);

  const blog = {
    title: post.title,
    author: post.author,
    url: post.url,
    likes: body.likes,
    user: post.user,
    comments: post.comments,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (updatedBlog) {
    response.status(201).json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogRouter.put("/:id/comments", async (request, response) => {
  const post = await Blog.findById(request.params.id);
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  /* if (post.user.toString() !== decodedToken.id.toString()) {
    response.status(401).json({ error: "invalid token" });
  } */

  const body = request.body;

  const user = await User.findById(decodedToken.id);

  const blog = {
    title: post.title,
    author: post.author,
    url: post.url,
    likes: post.likes,
    user: post.user,
    comments: body.comments,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (updatedBlog) {
    response.status(201).json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;
