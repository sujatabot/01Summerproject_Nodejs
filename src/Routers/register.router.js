import { Router } from 'express';
import {
  submitRegistrationForm,
  getAllRegistrationForms,
  deleteRegistrationForm,
  updateRegistrationForm
} from '../controllers/register.controller.js';

const router4 = Router();


router4.route("/Submit").post(submitRegistrationForm);
router4.get('/admin/register', getAllRegistrationForms);
router4.delete('/admin/register/:registerId', deleteRegistrationForm);
router4.put('/admin/register/:registerId', updateRegistrationForm);    

export { router4 };
