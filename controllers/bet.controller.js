const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");

let _betService = null;

module.exports = class BetController extends BaseController {
  constructor({ BetService }) {
    super(BetService); // Llama al constructor de la clase base con el servicio inyectado
    _betService = BetService;
  }

  // Método para registrar una nueva apuesta
  placeBet = catchControllerAsync(async (req, res) => {
    const betData = req.body; // Espera los datos de la apuesta en el cuerpo de la solicitud
    const newBet = await _betService.placeBet(betData);
    res.status(201).json({ data: newBet });
  });

  // Método para obtener todas las apuestas de un usuario
  getUserBets = catchControllerAsync(async (req, res) => {
    const { userId } = req.params; // El `userId` debe venir como parámetro en la URL
    const bets = await _betService.getUserBets(userId);
    res.status(200).json({ data: bets });
  });
};
