const express = require('express')
const router = express.Router()
const { createWorkout , selectWorkout , selectSingleWorkout , deleteSingleWorkouts , updateSingleWorkouts } = require('../Controllers/workoutController')


// GET a ALL workouts
router.get('/', selectWorkout)

// GET a single workouts
router.get('/:id', selectSingleWorkout)

// POST new workouts
router.post('/', createWorkout)

// DELETE a workouts
router.delete('/:id', deleteSingleWorkouts)

// UPDATE a workouts
router.patch('/', updateSingleWorkouts)

module.exports = router