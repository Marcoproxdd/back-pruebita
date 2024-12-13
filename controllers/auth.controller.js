const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");

let _authService = null;

module.exports = class AuthController extends BaseController {
  constructor({ AuthService }) {
    super(AuthService); // Llama al constructor de la clase base con el servicio inyectado
    _authService = AuthService;
  }

  // Método para autenticar al usuario
  authenticateUser = catchControllerAsync(async (req, res) => {
    const { username, password } = req.body;

    // Llamar al servicio de autenticación
    const { user, token } = await _authService.authenticateUser(username, password);

    // Si el usuario no existe o la autenticación falla
    if (!user || !token) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Devolver los datos del usuario junto con el token
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token, // Enviar el token si decides usar JWT
    });
  });
};
