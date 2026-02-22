import { useState, useEffect } from 'react'
import GoalSelection from '../Components/GoalSelection'
import DietPlanSelection from '../Components/DietPlanSelection'
import DietTracker from '../Components/DietTracker'

const STORAGE_MEALS = 'calorie_tracker_meals'
const STORAGE_GOAL = 'calorie_tracker_goal'
const STORAGE_DIET = 'calorie_tracker_diet'

function loadInitialState() {
  try {
    const savedGoal = localStorage.getItem(STORAGE_GOAL)
    const savedDiet = localStorage.getItem(STORAGE_DIET)
    const goal = savedGoal ? JSON.parse(savedGoal) : null
    const diet = savedDiet ? JSON.parse(savedDiet) : null
    let step = 'goal'
    if (diet) step = 'tracker'
    else if (goal) step = 'diet'
    return { goal, diet, step }
  } catch {
    return { goal: null, diet: null, step: 'goal' }
  }
}

export default function HomePage() {
  const initial = loadInitialState()
  const [step, setStep] = useState(initial.step)
  const [selectedGoal, setSelectedGoal] = useState(initial.goal)
  const [selectedDiet, setSelectedDiet] = useState(initial.diet)
  const [meals, setMeals] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_MEALS)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (selectedGoal) localStorage.setItem(STORAGE_GOAL, JSON.stringify(selectedGoal))
  }, [selectedGoal])

  useEffect(() => {
    if (selectedDiet) localStorage.setItem(STORAGE_DIET, JSON.stringify(selectedDiet))
  }, [selectedDiet])

  useEffect(() => {
    localStorage.setItem(STORAGE_MEALS, JSON.stringify(meals))
  }, [meals])

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal)
    setStep('diet')
  }

  const handleDietSelect = (diet) => {
    setSelectedDiet(diet)
    setStep('tracker')
    localStorage.setItem(STORAGE_DIET, JSON.stringify(diet))
  }

  const handleReset = () => {
    setSelectedGoal(null)
    setSelectedDiet(null)
    setStep('goal')
    localStorage.removeItem(STORAGE_GOAL)
    localStorage.removeItem(STORAGE_DIET)
  }

  const handleAdd = (meal) => setMeals((prev) => [meal, ...prev])
  const handleUpdate = (updated) =>
    setMeals((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
  const handleDelete = (id) => setMeals((prev) => prev.filter((m) => m.id !== id))

  return (
    <div className="min-h-screen bg-organic relative">
      <header className="relative z-10 border-b border-charcoal/5 bg-white/60 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
            Kalori Takip
          </h1>
          <p className="text-warmGray mt-2 font-medium">
            {step === 'goal' && 'Hedefinizi seçin ve diyet planınıza başlayın'}
            {step === 'diet' && 'Size uygun diyet planını seçin'}
            {step === 'tracker' && 'Günlük kalori alımınızı takip edin'}
          </p>
        </div>
      </header>

      {step === 'goal' && (
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 animate-fade-in">
          <GoalSelection onSelect={handleGoalSelect} />
        </div>
      )}
      {step === 'diet' && selectedGoal && (
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 animate-fade-in">
          <DietPlanSelection
            selectedGoal={selectedGoal}
            onSelect={handleDietSelect}
            onBack={() => setStep('goal')}
          />
        </div>
      )}
      {step === 'tracker' && selectedDiet && (
        <div className="relative z-10 animate-fade-in">
          <DietTracker
            meals={meals}
            dietPlan={selectedDiet}
            goal={selectedGoal}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  )
}
