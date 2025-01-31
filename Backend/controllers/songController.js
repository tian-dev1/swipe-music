const Song = require('../models/song');

// Register a new song
async function register(req, res){
    try {
        const { title, artist, album, year, genre, duration, createdBy, status } = req.body;

        // Verificar si la canción ya existe
        const existingSong = await Song.findOne({ title });

        if (existingSong) {
            return res.status(400).json({ message: "La canción ya existe" });
        }
        
        // Crear una nueva canción
        const newSong = new Song({title, artist, album, year, genre, duration, createdBy, status});
        console.log("newSong", newSong);
        // Guardar en la base de datos
        const songStored = await newSong.save();

        res.status(201).json({ message: "Canción Creada", song: songStored });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al crear canción" });
    }
}
// List all songs
async function list(req, res) {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al listar canciones" });
    }
}

module.exports = {
    register, list
}