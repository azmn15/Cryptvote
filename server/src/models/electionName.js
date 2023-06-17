const mongoose = require('mongoose');

const electionNameSchema = mongoose.Schema({
  election_id: {
    type: Number,
  },
  election_name: {
    type: String,
  },
  election_organizer: {
    type: String,
  },
  election_password: {
    type: String,
  },
  election_end_datetime: {
    type: Date,
  },
});

const ElectionName = mongoose.model('electionlists', electionNameSchema);

module.exports = ElectionName;

