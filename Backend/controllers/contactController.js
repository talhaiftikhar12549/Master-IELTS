import ErrorResponse from "../utils/errorResponse.js";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
export const handleContactForm = async (req, res, next) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return next(new ErrorResponse("All fields are required", 400));
  }

  try {
    await Contact.create({ firstName, lastName, email, message });

    console.log(process.env.EMAIL_USER);
    

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your company email
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Email to company
    const mailToCompany = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL,
      subject: `New Contact Submission: ${firstName} ${lastName}`,
      text: `
            New contact form submission:
            Name: ${firstName} ${lastName}
            Email: ${email}
            Message: ${message}
                `,
    };

    // Confirmation email to user
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting us!",
      text: `Hi ${firstName},\n\nThanks for reaching out. We’ve received your message and will get back to you soon.`,
    };

    await transporter.sendMail(mailToCompany);
    await transporter.sendMail(mailToUser);

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to send emails", 500));
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (admin)
export const getContactListings = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Newest first
    res
      .status(200)
      .json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch contact messages", 500));
  }
};

// @desc    Get a single contact message by ID
// @route   GET /api/contact/:id
// @access  Private (admin)
export const getContactListing = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new ErrorResponse("Contact message not found", 404));
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to fetch contact message", 500));
  }
};

// @desc    Delete a contact message by ID
// @route   DELETE /api/contact/:id
// @access  Private (admin)
export const deleteContactListing = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return next(new ErrorResponse("Contact message not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Contact message deleted" });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Failed to delete contact message", 500));
  }
};