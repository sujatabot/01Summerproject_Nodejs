
import {Image} from "../models/image.model.js"

const createImage = async (req, res) => {
    try {
        const image = req.file.path;
        
        const createdImage = await Image.create({ url: image });
        console.log("image",createImage);

        // Sending a success response with the created photo
        res.status(201).json({ success: true, photo: createdImage });
    } catch (err) {
        // Handling different types of errors
        if (err.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ success: false, message: err.message });
        } else {
            // Handle other errors
            console.error("Error creating image:", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
};

const getAllImages = async (req, res) => {
    try{
        const images = await Image.findAll();
        console.log("image",images)
     
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching images'});
    }
};

const getImageById = async (req, res) => {
    const {id} = req.params;
    try {
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: 'image not found'});
        }
        res.status(200),json(image);
    } catch (error){
        res.status(500).json({error: 'Error fetching image'});
    }
};

const updateImageById = async (req, res) => {
    const { id } = req.params;
    const { filename, url, mimeType }= req.body;
    try {
        const image = await Image.findByPk(id);
        if(!image) {
            return res.status(404).json({ error: 'Image not found'});
        }
        await image.update({ filename, url, mimeType});
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: 'Error updating image'});
    }
};

const deleteImageById = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found'});
        }
        await image.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Errpr deleting image'});
    }
};

export {createImage, getAllImages, getImageById, updateImageById, deleteImageById};