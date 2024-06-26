import { Blog } from '../models/blog.model.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("data", title, content);
    
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const blogs = await Blog.create({
      title: title,
      content: content,
      imageUrl: `/uploads/${req.file.filename}`,
    });
    console.log("Uploaded successfully", blogs);
    return res.status(201).json(blogs);
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({ message: "Something went wrong in the backend" });
  }
};

 export const getblog = async(req,res)=>{
  try{
    const blogs = await Blog.findAll();
    console.log("Fetched",blogs);
    res.status(202).json(blogs);
  } catch(error){
    console.error("Something went wrong", error);
  }
 }

 export const getblogId = async(req,res) => {
  try{
    const{blogId} = req.params;
    console.log("All data",blogId);
    const blogs = await Blog.findByPk(blogId);
    if(!blogs){
      res.status(200).json({message:"could not get blog by id"})
    }
    res.status(200).json(blogs);
  }catch(error){
    console.log("Something went wrong",error)
  }
 } 

 export const updateBlog =async(req,res)=>{
  try{
       const blogId = req.params.blogId;
       console.log("blogId",blogId)
       const{title,content}=req.body;
       console.log("title and conent",title,content)
       const {file} = req
       
       const blog = await Blog.findByPk(blogId);
       console.log("Boologid",blog)
       if(!blog){
          res.status(404).json({error:"Blog Id not found"});
       }
       blog.title=title;;
       blog.content=content;
       blog.imageUrl = file ? `/uploads/${file.filename}`:blog.imageUrl;
       
       await blog.save();
       
       res.status(200).json({message:"Succesfully blog updated"})


  }catch(error){
      console.error("Error updating books", error);
      res.status(500).json({ message: "Internal error" });



  }
}

 export const deleteBlog = async(req,res)=>{
  try{
    const blogId = req.params.blogId;
    console.log("blog id", blogId);
    if(!blogId) {
      return res.status(404).json({message:"blog Id is required"})
    }
    const blog = await Blog.findByPk(blogId);
    if(!blog){
      return res.status(404).json({message:"blog not found"});
    }
    await Blog.destroy({where:{id:blogId}});
    res.status(200).json({message: "blog deleted successfully"});
  }catch(error){
    console.error("Error deleting blog:", error);
    res.status(500).json({message: "Internal server error"});
  }
 }