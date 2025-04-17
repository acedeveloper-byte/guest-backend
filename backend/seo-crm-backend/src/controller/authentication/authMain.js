// const Auth = require('../../schema/authModel');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.JWT || 'ace-digital-solutions';
const nodemailer = require('nodemailer');
const Auth = require('../../schema/authModel');
const { json } = require('body-parser');
const { response } = require('express');

// add user
const adduser = async (req, res) => {
  try {
    const { user_name, email, number, password, site } = req.body;

    if (!user_name || !email || !number || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const newUser = await Auth.create({
      user_name,
      email,
      number,
      password,
      site,
    });

    return res.status(201).json({
      message: 'User added successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// edit user
const edituser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_name, email, number, password, site } = req.body;

    if (!user_id) {
      return res.status(400).json({
        baseResponse: {
          message: 'User ID is required',
          status: 'ERROR',
        },
      });
    }

    const updatedUser = await Auth.findByIdAndUpdate(
      { _id: user_id },
      { user_name, email, password, number, site },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        baseResponse: {
          message: 'User not found',
          status: 'ERROR',
        },
      });
    }

    res.status(200).json({
      baseResponse: {
        message: 'User edited successfully',
        status: 'OK',
      },
      response: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      baseResponse: {
        message: 'Something went wrong',
        status: 'ERROR',
      },
      response: [],
    });
  }
};

// delete user
const deleteuser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_name, email, number, password, site } = req.body;

    if (!user_id) {
      return res.status(200).json({
        baseResponse: {
          message: 'No User found',
          status: 'ERROR',
        },
      });
    }

    const deleteduser = await Auth.findByIdAndDelete({
      _id: user_id,
    });
    if (!deleteduser) {
      return res.status(400).json({
        baseResponse: {
          message: 'User does not exist',
          status: 'Error',
        },
      });
    }
    res.status(200).json({
      baseResponse: {
        message: 'user deleted successfully',
        message: 'OK',
      },

      response: deleteduser,
    });
  } catch (error) {
    // Fixed catch syntax
    console.error('Error in deleteuser:', error);
    res.status(500).json({
      baseResponse: {
        message: 'Something went wrong',
        status: 'Error',
      },
      response: [],
    });
  }
};

// fetch user
const fetchuser = async (req, res) => {
  try {
    const fetcheduser = await Auth.find({});

    if (!fetcheduser) {
      return res.status(200).json({
        baseResponse: {
          message: 'Something went wrong',
          status: 'error',
        },
      });
    } else {
      res.status(200).json({
        baseResponse: {
          message: 'user fetch successfully',
          status: 'Ok',
        },
        response: fetcheduser,
      });
    }
  } catch (error) {
    console.error('error in fetchuser'.error);
    res.status(500).json({
      baseResponse: {
        message: 'something went wrong',
        status: 'error',
      },
    });
  }
};

// login controller

const login = async (req, res) => {
  console.log('req.body:', req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user in database
    const newLogin = await Auth.findOne({ email: email });

    const token = jwt.sign(
      { id: newLogin._id, email: newLogin.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    if (!newLogin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = (await newLogin.password) === password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        name: newLogin.user_name,
        email: newLogin.email,
        phone: newLogin.number,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed' });
  }
};

// login controlller end

const sendEmail = async () => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use "gmail", "outlook", "yahoo", etc.
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password', // Use App Password (not your Gmail password)
      },
    });

    // Email details
    const mailOptions = {
      from: '"Your Name" <your-email@gmail.com>',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'Hello, this is a test email!',
      html: '<b>Hello, this is a test email!</b>',
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Call the function to send an email
module.exports = { adduser, edituser, deleteuser, fetchuser, login, sendEmail };

// SECRET_KEY = ACEDIGITALSOLUTIONS@EFFECTIVE
