const { default: mongoose } = require('mongoose');
const monggose = require('mongoose');

const ClientSchema = new monggose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model('Client', ClientSchema);
