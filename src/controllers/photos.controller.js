
import { Photo } from "../models/photos.model.js";

const createPhoto = async (req, res) => {
    try {
        const { filename,mimeType } = req.body;
        console.log("filename,mime",filename,mimeType);
        const file = req.file;
    
        if (!file) {
          return res.status(400).json({ message: "url of image is required" });
        }
    
        console.log("File received:", file);
    
        const image = await Photo.create({
          filename:filename,mimeType:mimeType,
          url: `/uploads/${file.filename}`,
        });
    
        console.log("Image saved to database:", image);
        res.status(201).json(image);
      } catch (error) {
        console.error("Error saving image:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };

const getAllPhotos = async (req, res) => {
    try{
        const photos = await Photo.findAll();
        console.log("photo",photos)
     
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching photos'});
    }
};

const getPhotoById = async (req, res) => {
    const {id} = req.params;
    try {
        const photo = await Photo.findByPk(id);
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found'});
        }
        res.status(200),json(photo);
    } catch (error){
        res.status(500).json({error: 'Error fetching photo'});
    }
};

const updatePhotoById = async (req, res) => {
    const { id } = req.params;
    const { filename, url, mimeType }= req.body;
    try {
        const photo = await Photo.findByPk(id);
        if(!photo) {
            return res.status(404).json({ error: 'Photo not found'});
        }
        await photo.update({ filename, url, mimeType});
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: 'Error updating photo'});
    }
};

const deletePhotoById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const deletedPhoto = await Photo.destroy({ where: { id:id } });
    
        if (deletedPhoto) {
          res.status(200).json({ message: 'Photo deleted successfully' });
        } else {
          res.status(404).json({ error: 'Photo not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  
    };

export {createPhoto, getAllPhotos, getPhotoById, updatePhotoById, deletePhotoById};