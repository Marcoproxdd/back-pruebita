const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");

let _eventService = null;

module.exports = class EventController extends BaseController {
  constructor({ EventService }) {
    super(EventService); // Llama al constructor de la clase base con el servicio inyectado
    _eventService = EventService;
  }

  // Método para obtener eventos desde la API externa y devolverlos al cliente
  fetchSportsEvents = catchControllerAsync(async (req, res) => {
    const events = await _eventService.fetchSportsEvents();
    res.status(200).json({ data: events });
  });

  // Método para guardar eventos en la base de datos
  saveEvents = catchControllerAsync(async (req, res) => {
    const { events } = req.body; // Espera un arreglo de eventos en el cuerpo de la solicitud
    const savedEvents = await _eventService.saveEvents(events);
    res.status(201).json({ data: savedEvents });
  });

  // Método para filtrar eventos por deporte
  getEventsBySport = catchControllerAsync(async (req, res) => {
    const { sportId } = req.params; // El parámetro `sportId` debe venir en la URL
    const events = await _eventService.getEventsBySport(sportId);
    res.status(200).json({ data: events });
  });
};
