require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submission
app.post("/contact-us", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "th.rider.clan@gmail.com",
    subject: "New Contact Form Submission",
    text: `You have a new contact form submission:
        \nName: ${name}
        \nEmail: ${email}
        \nPhone: ${phone}
        \nSubject: ${subject}
        \nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
