const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

//Routes
const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");

// Middlewares
app.use(express.json()); // Para leer JSON en las peticiones
app.use(cors()); // Permitir CORS
app.use(morgan("dev")); // Logs de peticiones

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "¡Hola, Express!" });
});

app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);



module.exports=app;