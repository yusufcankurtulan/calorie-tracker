import { useState } from 'react'
import UpdateMealModal from './UpdateMealModal'

export default function MealItem({ meal, onUpdate, onDelete }) {
  const [showModal, setShowModal] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`"${meal.name}" öğününü silmek istediğinize emin misiniz?`)) {
      onDelete(meal.id)
    }
  }

  return (
    <>
      <div className="glass-card rounded-2xl shadow-soft p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-card transition-all duration-300 group">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-charcoal">{meal.name}</span>
            <span className="px-3 py-1 text-xs font-medium bg-sand text-warmGray rounded-full">
              {meal.mealType}
            </span>
          </div>
          {meal.note && <p className="text-sm text-warmGray mt-1">{meal.note}</p>}
          <p className="text-xs text-warmGray/70 mt-1">{meal.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-charcoal text-lg">{meal.calories} kcal</span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-sand hover:bg-dusty text-charcoal text-sm font-medium rounded-xl transition-colors"
            >
              Düzenle
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-sand/70 hover:bg-dusty text-warmGray hover:text-charcoal text-sm font-medium rounded-xl transition-colors"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <UpdateMealModal
          meal={meal}
          onClose={() => setShowModal(false)}
          onSave={(updated) => {
            onUpdate(updated)
            setShowModal(false)
          }}
        />
      )}
    </>
  )
}
