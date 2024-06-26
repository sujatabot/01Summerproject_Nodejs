
import { AboutUsPhotos } from '../models/aboutphoto.model.js';



export const createAboutusPhoto = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "url of image is required" });
    }

    console.log("File received:", file);

    const image = await AboutUsPhotos.create({
      title: title,
      url: `/uploads/${file.filename}`,
    });

    console.log("Image saved to database:", image);
    res.status(201).json(image);
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  export const deleteAboutusPhoto = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedPhoto = await AboutUsPhotos.destroy({ where: { id:id } });
  
      if (deletedPhoto) {
        res.status(200).json({ message: 'Photo deleted successfully' });
      } else {
        res.status(404).json({ error: 'Photo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  };
  export const updateAboutusPhoto = async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
  
      const updatedPhoto = await AboutUsPhotos.update({ title }, { where: { id:id } });
  
      if (updatedPhoto) {
        res.status(200).json({ message: 'Photo updated successfully' });
      } else {
        res.status(404).json({ error: 'Photo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export const getAllAboutusPhotos = async (req, res) => {
  try {
    const photos = await AboutUsPhotos.findAll();

    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};