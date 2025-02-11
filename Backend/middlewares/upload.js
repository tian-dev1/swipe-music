const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        // Usa el ID del usuario como nombre del archivo
        const userId = req.params ? req.params.id : 'default';
        
        cb(null, userId + path.extname(file.originalname)); // Nombre del archivo
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    // Aceptar solo imágenes
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limite de 5MB
});

module.exports = upload;