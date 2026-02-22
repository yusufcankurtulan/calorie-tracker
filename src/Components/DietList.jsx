import { useState } from 'react'

export default function DietList({ dietPlan }) {
  const [isOpen, setIsOpen] = useState(false)
  const dietList = dietPlan?.dietList || []

  if (dietList.length === 0) return null

  return (
    <div className="mb-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 glass-card rounded-3xl shadow-soft hover:shadow-card transition-all text-left"
      >
        <h3 className="font-semibold text-charcoal flex items-center gap-2">
          <span className="text-2xl">📝</span>
          Örnek Günlük Diyet Listesi
        </h3>
        <span className="text-2xl text-warmGray font-light w-8 h-8 flex items-center justify-center rounded-full bg-sand">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 glass-card rounded-3xl shadow-soft overflow-hidden animate-fade-in">
          <div className="p-5 border-b border-charcoal/5 bg-sand/30">
            <p className="text-sm text-warmGray font-medium">
              Bu plana uygun örnek menü. Kaloriler yaklaşıktır, porsiyonları ihtiyacınıza göre ayarlayın.
            </p>
          </div>
          <div className="divide-y divide-charcoal/5">
            {dietList.map((meal, index) => (
              <div key={index} className="p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-sand text-warmGray rounded-full mb-2">
                    {meal.mealType}
                  </span>
                  <p className="text-charcoal font-medium">{meal.items}</p>
                </div>
                <span className="text-sm font-bold text-charcoal whitespace-nowrap">
                  ~{meal.calories} kcal
                </span>
              </div>
            ))}
          </div>
          <div className="p-5 bg-sand/30 text-sm text-warmGray font-medium">
            <strong>Toplam:</strong> ~{dietList.reduce((s, m) => s + m.calories, 0)} kcal
          </div>
        </div>
      )}
    </div>
  )
}
