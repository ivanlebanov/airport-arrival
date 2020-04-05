const mongoose = require('mongoose')

const schema = mongoose.Schema({
  form: mongoose.Schema.Types.Mixed,
  code: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verified: {
    type: Boolean,
    default: false,
    required: true
  },
  homeDate: {
    type: Date
  }
})
module.exports = mongoose.model('Form', schema, 'Form')
