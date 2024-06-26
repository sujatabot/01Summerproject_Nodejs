import { Router } from 'express';
import {
  submitContactForm,
  getAllContactForms,
  deleteContactForm,
  updateContactForm
} from '../controllers/contactus.controller.js';

const router3 = Router();

router3.route("/Submit").post(submitContactForm);
router3.get('/admin/contactus', getAllContactForms);
router3.delete('/admin/contactus/:contactId', deleteContactForm);
router3.put('/admin/contactus/:contactId', updateContactForm);

export { router3 };
