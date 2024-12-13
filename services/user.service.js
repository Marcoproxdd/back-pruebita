const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const User = require("../models/user"); // Asumiendo que tu modelo está en models/user.model

let _user = null;

module.exports = class UserService extends BaseService {
  constructor({ User }) {
    super(User); // `User` es el modelo de MongoDB
    _user = User;
  }

  // Método para crear un nuevo usuario
  createUser = catchServiceAsync(async ({ name, email, password }) => {
    // Verificar si el usuario ya existe por correo
    const userExists = await _user.findOne({ email });

    if (userExists) {
      throw new AppError("El correo ya está registrado", 400);
    }

    // Crear el nuevo usuario
    const newUser = new _user({ name, email, password });

    // Guardar el usuario en la base de datos
    await newUser.save();

    return newUser;
  });

  // Método para obtener un usuario por su ID
  getUserById = catchServiceAsync(async (userId) => {
    const user = await _user.findById(userId);
    
    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }

    return user;
  });

  // Método para obtener todos los usuarios
  getAllUsers = catchServiceAsync(async () => {
    const users = await _user.find(); // Encuentra todos los usuarios en la base de datos
    
    if (!users || users.length === 0) {
      throw new AppError("No hay usuarios registrados", 404);
    }

    return users;
  });
};
