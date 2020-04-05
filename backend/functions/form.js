const Form = require('../models/Form.js')
const moment = require('moment')

class Forms {
  static async list (req, res) {
    const forms = await Form.find({ user: req.user._id }).exec()
    res.send(forms)
  }

  static async adminList (req, res) {
    const filter = (req.query.filter) ? { 'form.addressQuarantine.city': req.query.filter } : {}
    const query = { verified: 1, homeDate: { $gte: moment().subtract(14, 'days').toDate() }, ...filter }
    const items = await Form.find(query, { code: 1, user: 1, form: 1 })
      .populate('user', 'name')
      .skip((new Number(req.query.page) - 1) * new Number(req.query.perPage))
      .limit(new Number(req.query.perPage))
      .exec()
    const resp = {
      items,
      pagination: {
        currentPage: new Number(req.query.page),
        totalRows: await Form.countDocuments(query)
      }
    }
    res.send(resp)
  }

  static async single (req, res) {
    const form = await Form.findOne({ code: req.params.code }).exec()
    res.send(form)
  }

  static async search (req, res) {
    res.send(await Form.find({ code: { $regex: `^${req.query.code}` } }, { code: 1 }).exec())
  }

  static async update (req, res) {
    await Form.updateOne({ code: req.params.code, verified: 0 }, { $set: { form: req.body } }).exec()
    res.sendStatus(200)
  }

  static async verify (req, res) {
    await Form.updateOne({ code: req.params.code }, { $set: req.body }).exec()
    res.sendStatus(200)
  }

  static async add (req, res) {
    const room = new Form({
      user: req.user._id,
      form: req.body
    })
    await room.save()
    res.sendStatus(200)
  }
}

module.exports = Forms
