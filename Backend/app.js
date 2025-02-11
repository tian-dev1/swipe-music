const express = require("express");
const swaggerDocs = require('./config/swagger'); // Importa la configuración de Swagger
const cors = require("cors");
const morgan = require("morgan");

const app = express();

//Routes
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

// Middlewares
app.use(express.json()); // Para leer JSON en las peticiones
app.use(cors()); // Permitir CORS
app.use(morgan("dev")); // Logs de peticiones

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "¡Hola, Express!" });
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Configurar Swagger
swaggerDocs(app);


module.exports=app;