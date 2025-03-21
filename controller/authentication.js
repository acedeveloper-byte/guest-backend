const authModel = require("../models/Authentication")
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
    const { user_name, phone, email, website, password } = req.body
    try {

        console.log("email:::", email)
        if (user_name && phone && email && website && password === "") {
            return res.status(200).json({ baseResponse: { message: "BAD_REQUEST", status: 0 }, response: [] })
        }

        const newUser = new authModel({
            user_name, phone, email, website, password
        })


        if (newUser) {
            welcomeusersmtpserver(email)
            return res.status(201).json({ baseResponse: { message: "REQUEST_FULLFIED", status: 1 }, response: await newUser.save() })
        } else {
            return res.status(200).json({ baseResponse: { message: "SOMETHING_WENT_WRONG", status: 0 }, response: [] })

        }
    } catch (error) {
        return res.status(200).json({ baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 }, response: error.message })

    }
}


const welcomeusersmtpserver = async (to) => {

    console.log("email", to)
    const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: "mayank.kumarace@gmail.com",
            pass: "zyzh xasq vyyu mgnm", // Use the App Password from Google
        },
    });

    try {
        const mailOptions = {
            from: '"Get human Posting" mayank.kumarace@gmail.com',
            to: to,
            subject: "Welcome to GetHumanPosting",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome Email</title>
<style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #0a1735;
            color: #fff;
            padding: 50px 40px;
            border-radius: 8px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .logo {
            display: block;
            max-width: 100px;
            margin-bottom: 30px;
        }
        .header {
            display: flex;
            align-items: center;
        }
        .profile {
            width: 100px;
            height: 100px;
            background: #ccc;
            border-radius: 50%;
            margin-right: 20px;
        }
        .intro {
            font-size: 18px;
            line-height: 1.6;
        }
        .bold {
            font-weight: bold;
        }
        .content {
            background: #fff;
            color: #333;
            padding: 30px;
            border-radius: 8px;
            line-height: 1.8;
            margin-top: 20px;
        }
        .list-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
        }
        .green-dot {
            height: 12px;
            width: 12px;
            background-color: #4caf50;
            border-radius: 50%;
            margin-right: 10px;
        }
        .cta-btn {
            display: block;
            width: 100%;
            max-width: 320px;
            margin: 30px auto;
            padding: 15px 0;
            background-color: #5af58e;
            color: #000;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            border-radius: 4px;
            transition: 0.3s;
        }
        .cta-btn:hover {
            background-color: #4cd87b;
        }
        .footer {
            font-size: 14px;
            text-align: center;
            margin-top: 20px;
            color: #ccc;
        }
</style>
</head>
<body>
 
<div class="container">
<img src="logo.png" alt="GH Logo" class="logo">
 
    <div class="header">
<div class="profile"></div>
<div>
<p class="intro">
<span class="bold">My name is Olek</span> and I’m really excited to welcome you on board with 
<span class="bold">Tidio Live Chat & Chatboats!</span>
</p>
</div>
</div>
 
    <div class="content">
<p>You just joined thousands of Shopify store owners that are already skyrocketing their revenue with Tidio by:</p>
 
        <div class="list-item">
<div class="green-dot"></div>
<span>Driving product sales</span>
</div>
<div class="list-item">
<div class="green-dot"></div>
<span>Providing blazing-fast customer support</span>
</div>
<div class="list-item">
<div class="green-dot"></div>
<span>Saving abandoned carts</span>
</div>
<div class="list-item">
<div class="green-dot"></div>
<span>Automating customer service</span>
</div>
 
        <p>There’s just one tiny thing left to do to make all those amazing things happen:</p>
 
        <a href="#" class="cta-btn">Start Talking with your visitors</a>
</div>
 
    <div class="footer">
        © 2025 GetHumanPosting. All rights reserved.
</div>
</div>
 
</body>
</html>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }



}


const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {

        if (email && password === "") {
            return res.status(200).json({ baseResponse: { message: "BAD_REQUEST", status: 0 }, response: [] })
        }

        const newUser = await authModel.findOne({
            email, password
        })

        if (newUser) {
            return res.status(200).json({ baseResponse: { message: "REQUEST_FULLFIED", status: 1 }, response: newUser })
        } else {
            return res.status(200).json({ baseResponse: { message: "SOMETHING_WENT_WRONG", status: 0 }, response: [] })

        }
    } catch (error) {
        return res.status(200).json({ baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 }, response: error.message })

    }
}



module.exports = { registerUser, loginUser }
