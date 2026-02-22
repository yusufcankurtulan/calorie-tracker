import { useState, useEffect } from 'react'

export default function UpdateMealModal({ meal, onClose, onSave }) {
  const [name, setName] = useState(meal.name)
  const [calories, setCalories] = useState(meal.calories.toString())
  const [mealType, setMealType] = useState(meal.mealType)
  const [note, setNote] = useState(meal.note || '')

  useEffect(() => {
    setName(meal.name)
    setCalories(meal.calories.toString())
    setMealType(meal.mealType)
    setNote(meal.note || '')
  }, [meal])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !calories) return

    onSave({
      ...meal,
      name: name.trim(),
      calories: parseInt(calories, 10) || 0,
      mealType,
      note: note.trim() || undefined,
    })
  }

  return (
    <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-card rounded-3xl shadow-lift max-w-md w-full p-6 animate-slide-up">
        <h3 className="font-display text-xl font-bold text-charcoal mb-5">Öğünü Düzenle</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Yemek Adı</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Kalori</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              min="1"
              className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Öğün Türü</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30"
            >
              <option value="kahvaltı">Kahvaltı</option>
              <option value="öğle">Öğle</option>
              <option value="akşam">Akşam</option>
              <option value="ara öğün">Ara Öğün</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Not (Opsiyonel)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-charcoal/10 rounded-2xl hover:bg-sand font-medium text-charcoal transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-sand hover:bg-dusty text-charcoal font-semibold rounded-2xl border border-charcoal/10 transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
