import { Register } from "../models/register.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';


const submitRegistrationForm = async (req, res) => {
  const { name, phonenumber, email, currentaddress, age, gender, medicalcondition, query } = req.body;
  console.log("Received request body:", req.body);


  const stringFields = [name, phonenumber, email, currentaddress, gender, medicalcondition, query];
  const stringFieldNames = ['name', 'phonenumber', 'email', 'currentaddress', 'gender', 'medicalcondition', 'query'];
  
  for (let i = 0; i < stringFields.length; i++) {
    const field = stringFields[i];
    if (typeof field !== 'string' || field.trim() === "") {
      console.log(`Invalid or missing required string field: ${stringFieldNames[i]} (${field})`);
      throw new ApiError(400, `Field '${stringFieldNames[i]}' must be a non-empty string`);
    }
  }

  if (typeof age !== 'number' || age <= 0) {
    console.log("Invalid age:", age);
    throw new ApiError(400, "Age must be a positive number");
  }

  const existingContact = await Register.findOne({ where: { email: email } });
  if (existingContact) {
    throw new ApiError(409, "Register with this email already exists");
  }



  const newMessage = await Register.create({
    email: email,
    phonenumber: phonenumber,
    currentaddress: currentaddress,
    age: age,
    gender: gender,
    medicalcondition: medicalcondition,
    query: query,
    name: name.toLowerCase(),
  });

  if (!newMessage) {
    throw new ApiError(500, "Message registration failed");
  }

  res.status(201).json({ message: "Message registered successfully", newMessage });
};


// Function to retrieve all contact form submissions
const getAllRegistrationForms = async (req, res) => {

  try{
    const registers = await Register.findAll();
    if (!registers || registers.length === 0) {
        return res.status(404).json({ message: 'No registration forms found' });
  }
  res.status(200).json(registers);
} catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({message: "Internal server problems"});
}
};

// Function to delete a contact form submission by ID
const deleteRegistrationForm = async (req, res) => {
  try{
      const registerId = req.params.registerId;
      const register = await Register.findByPk( registerId  );
      if (!register) {
        return res.status(404).json({ message: 'Registration form not found' });
  }
  await Register.destroy({ where: { id: registerId } });
res.status(200).json({ message: 'Registration form deleted successfully' });
}catch ( error) {
  console.error("Error detected:", error);
  res.status(500).json({message:"Internal server problem"})
}
};

// Function to update a contact form submission by ID
const updateRegistrationForm = asyncHandler(async (req, res) => {
  try {
      const registerId = req.params.registerId;
      const { name, phonenumber, email, currentaddress, age, gender, medicalcondition, query  } = req.body;
      console.log("data",name, phonenumber, email, currentaddress, age, gender, medicalcondition, query )
      
      const register = await Register.findByPk(registerId); // Correct parameter passing
      if (!register) {
          return res.status(404).json({ message: 'Registration form not found' });
      }

      // Update contact details
      register.name = name;
      register.phonenumber = phonenumber;
      register.email = email;
      register.currentaddress = currentaddress;
      register.age = age;
      register.gender = gender;
      register.medicalcondition = medicalcondition;
      register.query = query;

      await register.save(); // Correct parameter passing
      res.status(200).json({ message: 'Registration form updated successfully' });
  } catch (error) {
      console.error("Error updating registration", error);
      res.status(500).json({ message: "Internal error" });
  }
});

export {submitRegistrationForm, getAllRegistrationForms,  deleteRegistrationForm ,   updateRegistrationForm }