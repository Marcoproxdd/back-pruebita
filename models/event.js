const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  sportId: { type: String, required: true },
  sport: { type: String, required: true },  // Asegúrate de que este campo esté presente
  sportEventName: { type: String, required: true },
  startDate: { type: Date, required: true },
  tournament: { type: String, required: true },
  competitors: [
    {
      name: String,
      country: String
    }
  ],
  eventStatus: { type: String, required: true },
  odds: [
    {
      value: { type: Number, required: true },
      type: { type: String, required: true },
      probability: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
