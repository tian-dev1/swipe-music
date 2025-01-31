const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;



mongoose.connect(MONGO_URI)
.then(() => {
    console.log("🟢 Conectado a MongoDB");
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("🔴 Error al conectar a MongoDB", error);
});
