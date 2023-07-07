const { default: mongoose } = require('mongoose');
const monggose = require('mongoose');

const ProjectSchema = new monggose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    enum: ['Not Started', 'In Progess', 'Completed'],
  },
  clientId: {
    type: monggose.Schema.Types.ObjectId,
    ref: 'Client',
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
