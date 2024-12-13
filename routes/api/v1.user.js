const { Router } = require("express");

module.exports = function ({ UserController }) {
  const router = Router();
  
  // Ruta para obtener un usuario por su ID
  router.get("/:userId", UserController.getUserById);

  router.get("/", UserController.getAllUsers);
  // Ruta para registrar un nuevo usuario
  router.post("/register", UserController.createUser);

  return router;
};
