const express = require('express')
const authenticateToken = require('../middleware/auth')

const router = express.Router()

const orders = []

router.post('/', authenticateToken, (req, res) => {
  const { items, total, address } = req.body

  if (!items || !total || !address) {
    return res.status(400).json({ message: 'Commande invalide' })
  }

  const newOrder = {
    id: orders.length + 1,
    email: req.user.email,
    items,
    total,
    address,
    date: new Date().toISOString(),
  }

  orders.push(newOrder)
  res.status(201).json({ message: 'Commande enregistrée', order: newOrder })
})

router.get('/', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.email === req.user.email)
  res.json(userOrders)
})

router.get('/all', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs' })
  }
  res.json(orders)
})

module.exports = router
