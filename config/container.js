//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require('awilix');

//Config
const config = require('.');

//Routes
const Routes = require('../routes');

//Services
const { ExampleService, BetService, EventService, UserService,  } = require('../services');
//Controllers
const {
  ExampleController,
  BetController,
  EventController,
  UserController,
  AuthController,
} = require('../controllers');

//Startup
const { Database, Server,  } = require('../startup');


//Routes
const {
  ExampleRoutes,
  BetRoutes,
  EventoRoutes,
  UserRoutes,
  AuthRoutes
} = require('../routes/api/index');

//Models
const { Example, Bet, Event, User } = require('../models');

//Funtions
//const { FaqsFunctions } = require('../functions');

const { protect } = require('../middleware/authMiddleware');
const AuthUtils = require('../utils/auth');
const container = createContainer();

container
  .register({
    //Configuración principal
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    AuthUtils: asClass(AuthUtils).singleton(),
    Database: asClass(Database).singleton(),
    Server: asClass(Server).singleton(),
  })
  .register({
    //Configuración de los servicios
    ExampleService: asClass(ExampleService).singleton(),
    EventService: asClass(EventService).singleton(),
    BetService: asClass(BetService).singleton(),
    UserService: asClass(UserService).singleton(),
  })
  .register({
    //Configuración de los controladores
    ExampleController: asClass(
      ExampleController.bind(ExampleController)
    ).singleton(),
    EventController: asClass(
      EventController.bind(EventController)
    ).singleton(),
    BetController: asClass(
      BetController.bind(BetController)
    ).singleton(),
    UserController: asClass(
      UserController.bind(UserController)
    ).singleton(),
    AuthController: asClass(
      AuthController.bind(AuthController)
    ).singleton(),
  })
  .register({
    //Configuración de rutas
    ExampleRoutes: asFunction(ExampleRoutes).singleton(),
    EventoRoutes: asFunction(EventoRoutes).singleton(),
    BetRoutes: asFunction(BetRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),

  })
  .register({
    //Configuración de modelos
    Example: asValue(Example),
    Bet: asValue(Bet),
    Event: asValue(Event),
    User: asValue(User),

  })
  .register({
    //middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  })
  


module.exports = container;
