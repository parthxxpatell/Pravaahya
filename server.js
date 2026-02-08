const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'pravaahya@gmail.com',
        pass: process.env.EMAIL_PASS // App-specific password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, inquiry_type, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER || 'pravaahya@gmail.com',
        to: 'pravaahya@gmail.com',
        subject: `Contact Form: ${subject || inquiry_type || 'New Message'}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Inquiry Type:</strong> ${inquiry_type || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><em>Sent from Pravaahya Contact Form</em></p>
        `,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Partner form endpoint
app.post('/api/partner', async (req, res) => {
    const { business_name, contact_person, email, phone, business_type, location, details } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER || 'pravaahya@gmail.com',
        to: 'pravaahya@gmail.com',
        subject: `Partnership Inquiry: ${business_name}`,
        html: `
            <h2>New Partnership Inquiry</h2>
            <p><strong>Business Name:</strong> ${business_name}</p>
            <p><strong>Contact Person:</strong> ${contact_person}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Business Type:</strong> ${business_type}</p>
            <p><strong>Location:</strong> ${location || 'N/A'}</p>
            <p><strong>Details:</strong></p>
            <p>${details || 'N/A'}</p>
            <hr>
            <p><em>Sent from Pravaahya Partner Form</em></p>
        `,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Partnership inquiry sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Team application endpoint
app.post('/api/team', async (req, res) => {
    const { name, email, phone, role, portfolio, skills, motivation } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER || 'pravaahya@gmail.com',
        to: 'pravaahya@gmail.com',
        subject: `Team Application: ${role} - ${name}`,
        html: `
            <h2>New Team Application</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Portfolio/LinkedIn:</strong> ${portfolio ? `<a href="${portfolio}">${portfolio}</a>` : 'N/A'}</p>
            <p><strong>Skills & Experience:</strong></p>
            <p>${skills}</p>
            <p><strong>Motivation:</strong></p>
            <p>${motivation}</p>
            <hr>
            <p><em>Sent from Pravaahya Join Team Form</em></p>
        `,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Application sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send application' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'pravaahya@gmail.com'}`);
});
