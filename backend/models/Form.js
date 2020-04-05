const mongoose = require('mongoose')
const randomstring = require('randomstring')

const schema = mongoose.Schema({
  form: mongoose.Schema.Types.Mixed,
  code: {
    type: String,
    required: true,
    default: randomstring.generate({ charset: 'numeric', length: 10 })
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
