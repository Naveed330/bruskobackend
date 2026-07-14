import express from "express";
import { get } from "http";
const blogRoutes = express.Router();
import { createBlog } from '../Controller/blogController/createBlog.js'
import { getBlogs } from '../Controller/blogController/getBlogsRoutes.js'
import { editBlog } from '../Controller/blogController/editBlogRoute.js'
import { deleteBlog } from '../Controller/blogController/deleteBlogRoute.js'
import { singleBlogRoute } from '../Controller/blogController/singleBlogRoute.js'
import upload from '../middleware/teamMiddleware.js'

blogRoutes.post("/create-blog", upload.single("image"), createBlog);
blogRoutes.get("/get-blogs", getBlogs);
blogRoutes.get("/get-blogs-detail/:id", singleBlogRoute);
blogRoutes.put("/edit-blog/:id", upload.single("image"), editBlog);
blogRoutes.delete("/delete-blog/:id", deleteBlog);

export default blogRoutes;