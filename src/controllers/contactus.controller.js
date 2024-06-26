import { ContactUs } from '../models/contactus.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';


// Function to handle the submission of contact forms
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phonenum, subject, message } = req.body;
  console.log("Received request body:", req.body);

  if (![name,email,phonenum,subject,message].every((field) => field && field.trim() !== "")) {
    console.log("Missing required fields:",name, email, phonenum, subject, message);
    throw new ApiError(400, "All fields are required");
  }

  const existingcontact = await ContactUs.findOne({ where: { email: email } });
  if (existingcontact) {
    throw new ApiError(409, "resgister with this email already exists");
  }

  const newmesage = await ContactUs.create({
    
    email: email,
    phonenum:phonenum,
    subject:subject,
    message:message,
    name: name.toLowerCase(),
  });

  if (!newmesage) {
    throw new ApiError(500, "message registration failed");
  }
  
  res.status(201).json({ message: "message registered successfully",newmesage });
});

// Function to retrieve all contact form submissions
const getAllContactForms = async (req, res) => {

  try{
    const contacts = await ContactUs.findAll();
    if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: 'No contact forms found' });
  }
  res.status(200).json(contacts);
} catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({message: "Internal server problems"});
}
};
// Function to delete a contact form submission by ID
const deleteContactForm = async (req, res) => {
    try{
        const contactId = req.params.contactId;
        const contact = await ContactUs.findByPk( contactId  );
        if (!contact) {
          return res.status(404).json({ message: 'Contact form not found' });
    }
    await ContactUs.destroy({ where: { id: contactId } });
  res.status(200).json({ message: 'Contact form deleted successfully' });
  }catch ( error) {
    console.error("Error detected:", error);
    res.status(500).json({message:"Internal server problem"})
  }
};

// Function to update a contact form submission by ID
const updateContactForm = asyncHandler(async (req, res) => {
  try {
      const contactId = req.params.contactId;
      const { name, email, phonenum, subject, message } = req.body;
      console.log("data",name,email,phonenum,subject,message)
      
      const contact = await ContactUs.findByPk(contactId); // Correct parameter passing
      if (!contact) {
          return res.status(404).json({ message: 'Contact form not found' });
      }

      // Update contact details
      contact.name = name;
      contact.email = email;
      contact.phonenum = phonenum;
      contact.subject = subject;
      contact.message = message;

      await contact.save(); // Correct parameter passing
      res.status(200).json({ message: 'Contact form updated successfully' });
  } catch (error) {
      console.error("Error updating contact", error);
      res.status(500).json({ message: "Internal error" });
  }
});

export { submitContactForm, getAllContactForms, deleteContactForm, updateContactForm };
