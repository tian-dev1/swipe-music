const mongoose = require("mongoose");

//const imageUrl = '/uploads/' + req.file.filename;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  //images: [imageUrl], // Guarda la ruta de la imagen en el array
  active: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;