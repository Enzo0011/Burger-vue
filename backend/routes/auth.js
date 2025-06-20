const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

const users = []

;(async () => {
  const existing = users.find(u => u.email === 'admin@admin.fr')
  if (!existing) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    users.push({
      name: 'Admin',
      email: 'admin@admin.fr',
      password: hashedPassword,
      role: 'admin',
    })
  }
})()

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  const existing = users.find(u => u.email === email)
  if (existing) return res.status(400).json({ message: 'Email déjà utilisé' })

  const hashedPassword = await bcrypt.hash(password, 10)
  users.push({ name, email, password: hashedPassword, role: 'user' })
  res.status(201).json({ message: 'Compte créé avec succès' })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' })

  const token = jwt.sign(
    { email: user.email, name: user.name, role: user.role || 'user' },
    'U0VDUkVUX0tFWQ==',
    { expiresIn: '1h' }
  )

  res.json({ token, user: { email: user.email, name: user.name, role: user.role || 'user' } })
})

module.exports = router