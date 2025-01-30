const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("🟢 Conectado a MongoDB");
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("🔴 Error al conectar a MongoDB", error);
});








// Middlewares
app.use(express.json()); // Para leer JSON en las peticiones
app.use(cors()); // Permitir CORS
app.use(morgan("dev")); // Logs de peticiones

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "¡Hola, Express!" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
