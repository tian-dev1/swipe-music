const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json()); // Para leer JSON en las peticiones
app.use(cors()); // Permitir CORS
app.use(morgan("dev")); // Logs de peticiones

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "¡Hola, Express!" });
});


module.exports=app;