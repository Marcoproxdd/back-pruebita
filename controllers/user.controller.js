const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");

let _userService = null;

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService); // Llama al constructor de la clase base con el servicio inyectado
    _userService = UserService;
  }

  // Método para crear un nuevo usuario
  createUser = catchControllerAsync(async (req, res) => {
    const { name, email, password } = req.body;

    // Crear un nuevo usuario utilizando el servicio
    const newUser = await _userService.createUser({ name, email, password });

    res.status(201).json({ message: "Usuario creado con éxito", user: newUser });
  });

  // Método para obtener un usuario por ID
  getUserById = catchControllerAsync(async (req, res) => {
    const { userId } = req.params; // El parámetro `userId` debe venir en la URL
    const user = await _userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ user });
  });

  // Método para obtener todos los usuarios
  getAllUsers = catchControllerAsync(async (req, res) => {
    const users = await _userService.getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No hay usuarios registrados" });
    }

    res.status(200).json({ users });
  });
};
