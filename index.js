const express = require("express");
const catrouter = require("./router/categoryrouter");
const postrouter = require("./router/postrouter.js");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const authRouter = require("./router/auth.js");
const app = express();
require("./config/databaseconnection.js");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.use("/get-this-done", (req, res) => {
    console.log("return krdiya hai maine sab kuch");
    res.sendStatus(200); // ✅ Corrected response
});

// Serve static images from the 'images' folder
app.use("/resources", express.static(path.join(__dirname, "images")));

// Routes
app.use("/category", catrouter);
app.use("/post", postrouter);
app.use("/auth", authRouter);

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "A simple API with categories and posts",
        },
        servers: [{ url: "http://localhost:7400" }, { url: "http://172.20.10.6:7400" }, { url: "http://192.168.1.18:7400" }],
    },
    apis: ["./router/*.js"], // Point to your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(7400, () => {
    console.log("Server started at http://localhost:7400");
    console.log("Swagger docs available at http://localhost:7400/api-docs");
});
