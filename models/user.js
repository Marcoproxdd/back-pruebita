const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definir el esquema de usuario
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Asegura que el correo electrónico sea único
      lowercase: true,  // Convierte el correo a minúsculas
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,  // Longitud mínima de la contraseña
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,  // Agrega automáticamente las fechas de creación y actualización
  }
);

// Método para comparar la contraseña cifrada con la proporcionada
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware para cifrar la contraseña antes de guardar el usuario
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();  // Si la contraseña no se modificó, pasa al siguiente middleware
  }

  // Cifra la contraseña antes de guardarla
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Crear el modelo de usuario
const User = mongoose.model("User", userSchema);

module.exports = User;
