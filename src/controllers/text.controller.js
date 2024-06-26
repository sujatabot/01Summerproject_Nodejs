import { Text } from "../models/text.model.js";

export const createText  = async(req,res) => {
try{
    const{ content,title} = req.body;
    console.log("data",content,title);
     
    const text = await Text.create({
content: content,title:title
    });
    console.log("successfully created content", text);
    return res.status(201).json(text);
}catch(error){
   console.error("Something went wrong",error);
   return res.status(500).json({message: "Something went wrong in backend"});
}
};

export const getText = async (req,res)=>{
    try{
    const text = await Text.findAll();
    console.log("Fetched",text);
    res.status(202).json(text);
    }catch(error){
        console.error("Something went wrong",error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getTextById = async (req, res) => {
    try {
      const { textId } = req.params;
      console.log("All data", textId);
      const text = await Text.findByPk(textId);
      if (!text) {
        return res.status(404).json({ message: "Could not get text by id" });
      }
      res.status(200).json(text);
    } catch (error) {
      console.error("Something went wrong", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const updateText = async (req, res) => {
    try {
      const { textId } = req.params;
      console.log("textId", textId);
      const { content ,title} = req.body;
  
      const text = await Text.findByPk(textId);
      console.log("textId", text);
      if (!text) {
        return res.status(404).json({ error: "Text Id not found" });
      }
  
      text.content = content || text.content;
      text.title = title ||text.title
      await text.save();
      res.status(200).json({ message: "Successfully text updated", text });
    } catch (error) {
      console.error("Error updating text", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const deleteText = async (req, res) => {
    try {
      const { textId } = req.params;
      console.log("text id", textId);
      if (!textId) {
        return res.status(404).json({ message: "Text Id is required" });
      }
      const text = await Text.findByPk(textId);
      if (!text) {
        return res.status(404).json({ message: "Text not found" });
      }
      await Text.destroy({ where: { id: textId } });
      res.status(200).json({ message: "Text deleted successfully" });
    } catch (error) {
      console.error("Error deleting text:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };