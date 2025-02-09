const mongoose = require("mongoose");
const app = require("./app");
const CONSTANTS = require("./utils/constants");
const dotenv = require('dotenv');


// Cargar variables de entorno según el entorno
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
    console.log(CONSTANTS.SERVER_LOGS.MONGO_CONNECTED);
    app.listen(PORT, () => {
        console.log(`${CONSTANTS.SERVER_LOGS.INFO_SERVER_RUNNING} ${PORT} in env ${env}`);
    });
}).catch((error) => {
    console.log(`${CONSTANTS.SERVER_LOGS.MONGO_ERROR}`, error);
});
