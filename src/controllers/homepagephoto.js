
import { HomePhotos } from '../models/Home.model.js';


export const createHomePhoto = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "url of image is required" });
    }

    console.log("File received:", file);

    const image = await HomePhotos.create({
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
  export const deleteHomePhoto = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedPhoto = await HomePhotos.destroy({ where: { id:id } });
  
      if (deletedPhoto) {
        res.status(200).json({ message: 'Photo deleted successfully' });
      } else {
        res.status(404).json({ error: 'Photo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  };
  export const updateHomePhoto = async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
  
      const updatedPhoto = await HomePhotos.update({ title }, { where: { id } });
  
      if (updatedPhoto[0]) {
        res.status(200).json({ message: 'Photo updated successfully' });
      } else {
        res.status(404).json({ error: 'Photo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export const getAllHomePhotos = async (req, res) => {
  try {
    const photos = await HomePhotos.findAll();

    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};