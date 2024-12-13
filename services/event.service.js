const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const axios = require("axios");

let _event = null;

module.exports = class EventService extends BaseService {
    constructor({ Event }) {
      super(Event); // `Event` es el modelo de MongoDB
      _event = Event;
    }
  
    // Método para obtener eventos deportivos desde la API externa y guardarlos en la base de datos
    fetchSportsEvents = catchServiceAsync(async () => {
      const API_URL =
        "https://betapi.zgameslatam.com/v1/api/sport-events/prematch-highlights?sportId=sr:sport:1&statusSportEvent=NotStarted&marketId=1&limit=10";
  
      const response = await axios.get(API_URL);
  
      if (response.status !== 200) {
        throw new AppError("Error al obtener los eventos deportivos", 500);
      }
      
      // Procesa cada evento para asegurarte de que los campos requeridos están bien formateados
      const formattedEvents = response.data.data.map(event => {
        return {
          eventId: event.eventId,
          sportId: event.sportId,  // Asegúrate de enviar el sportId de la API
          sport: event.sportId,    // Aquí estamos asignando sport igual a sportId
          sportEventName: event.sportEventName.en,
          startDate: event.scheduled,  // Asegúrate de que esté en el formato correcto
          tournament: event.tournament.tournamentName.en,
          competitors: [
            {
              name: event.competitorHome.competitorName.en,
              country: event.competitorHome.countryName.en
            },
            {
              name: event.competitorAway.competitorName.en,
              country: event.competitorAway.countryName.en
            }
          ],
          eventStatus: event.eventStatus.statusEventSport,
          odds: event.markets[0]?.marketLines[0]?.outcomes.map(outcome => ({
            value: outcome.odds,
            type: outcome.outcomeName.en,
            probability: outcome.probability
          }))
        };
      });
  
      // Guarda los eventos formateados en la base de datos
      await _event.insertMany(formattedEvents);
  
      return formattedEvents; // Opcional: devuelve los eventos formateados si los necesitas
    });

  // Método para guardar eventos en la base de datos
  saveEvents = catchServiceAsync(async (events) => {
    const savedEvents = await _event.insertMany(events);
    return savedEvents;
  });
  // Método para obtener todos los eventos guardados en la base de datos
  getAllEvents = catchServiceAsync(async () => {
    const events = await _event.find({});
    if (!events.length) {
    throw new AppError("No se encontraron eventos", 404);
  }
  return events;
});

  // Método para buscar eventos por deporte
  getEventsBySport = catchServiceAsync(async (sportId) => {
    const events = await _event.find({ sportId });
    if (!events.length) {
      throw new AppError("No se encontraron eventos para el deporte especificado", 404);
    }
    return events;
  });
};
