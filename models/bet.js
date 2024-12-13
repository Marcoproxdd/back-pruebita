const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  eventId: {
    type: String,
    ref: "Event",
    required: true
  },
  sportEventName:{
    type: String,
    ref: "Event",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  selectedOutcome: {
    type: String,
    enum: ['1', 'X', '2'], // "1" = Victoria equipo A, "X" = Empate, "2" = Victoria equipo B
    required: true
  },
  odds: {
    type: Number,
    required: true
  },
  potentialWinnings: {
    type: Number
  }
});

betSchema.pre('save', function(next) {
  // Calcular las ganancias potenciales antes de guardar la apuesta
  this.potentialWinnings = this.amount * this.odds;
  next();
});

const Bet = mongoose.model("Bet", betSchema);
module.exports = Bet;
