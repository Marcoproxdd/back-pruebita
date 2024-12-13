const { Router } = require("express");

module.exports = function ({ BetController, AuthMiddleware }) {
  const router = Router();

  // Ruta para registrar una nueva apuesta
  router.post("/place", BetController.placeBet);

  // Ruta para obtener las apuestas de un usuario
  router.get("/:userId", BetController.getUserBets);

  return router;
};
