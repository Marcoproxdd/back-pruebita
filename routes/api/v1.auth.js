const { Router } = require('express');
const { AuthController } = require('../../controllers/auth.controller');

module.exports = function ({ AuthController, AuthMiddleware }) {
  const router = Router();

  // Ruta para la autenticación de usuario
  router.post('/login', AuthController.authenticateUser);

  // Ruta para obtener los datos de usuario si la autenticación es exitosa
  // Esta ruta estará protegida por AuthMiddleware
  router.get('/profile', AuthMiddleware.verifyToken, AuthController.getUserProfile);

  return router;
};
