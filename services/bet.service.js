const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _bet = null;

module.exports = class BetService extends BaseService {
  constructor({ Bet }) {
    super(Bet); // `Bet` es el modelo de MongoDB
    _bet = Bet;
  }

  // Método para registrar una apuesta
  placeBet = catchServiceAsync(async (betData) => {
    const { userId, eventId, amount, selectedOutcome, odds } = betData;
  
    if (!userId || !eventId || !amount || !selectedOutcome || !odds) {
      throw new AppError("Todos los campos son obligatorios", 400);
    }
  
    // Crear la nueva apuesta con todos los campos requeridos
    const newBet = await _bet.create({
      userId,
      eventId,
      amount,
      selectedOutcome,
      odds,
      potentialWinnings: amount * odds,
    });
  
    return newBet;
  });
  

  // Método para obtener todas las apuestas de un usuario
  getUserBets = catchServiceAsync(async (userId) => {
    const bets = await _bet.find({ userId });
    if (!bets.length) {
      throw new AppError("No se encontraron apuestas para el usuario", 404);
    }
    return bets;
  });
};
