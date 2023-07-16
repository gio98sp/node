const express = require( 'express')
const router = express.Router()

const ThoughtsController = require('../controllers/ThoughtsController')

const checkAuth = require('../helpers/auth').checkAuth

router.post('/remove', checkAuth, ThoughtsController.removeThought)
router.get('/add', checkAuth, ThoughtsController.createThought)
router.post('/add', checkAuth, ThoughtsController.createThoughtSave)
router.get('/edit/:id', checkAuth, ThoughtsController.editThought)
router.post('/edit', checkAuth, ThoughtsController.updateThought)
router.get('/dashboard', checkAuth, ThoughtsController.dashboard)
router.get('/', ThoughtsController.showThoughts)

module.exports = router