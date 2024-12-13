const { Router } = require("express");

module.exports = function ({ EventController, AuthMiddleware }) {
  const router = Router();

  // Ruta para obtener eventos deportivos
  router.get("/fetch", EventController.fetchSportsEvents);

  // Ruta para guardar eventos deportivos
  router.post("/save", EventController.saveEvents);

  // Ruta para obtener eventos por deporte
  router.get("/:sportId", EventController.getEventsBySport);

  return router;
};
