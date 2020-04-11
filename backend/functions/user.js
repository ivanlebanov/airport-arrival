const User = require('../models/User.js')

class Users {
  static async register (req, res) {
    try {
      const user = new User(req.body)
      await user.save()
      const token = await user.generateAuthToken()
      res.send({ user, token })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static async search (req, res) {
    res.send(await User.find({ email: { $regex: `^${req.query.email}` } }, { email: 1, name: 1, isAdmin: 1 }).exec())
  }

  static async makeAdmin (req, res) {
    try {
      await User.updateOne({ email: req.body.email }, { $set: { isAdmin: req.body.status } }).exec()
      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
    }
  }

  static async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findByCredentials(email, password)
      if (!user) {
        return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
      }
      const token = await user.generateAuthToken()
      res.send({ user, token })
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static async authenticated (req, res) {
    res.send(req.user)
  }

  static async logout (req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => { return token.token !== req.token })
      await req.user.save()
      res.send()
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = Users
