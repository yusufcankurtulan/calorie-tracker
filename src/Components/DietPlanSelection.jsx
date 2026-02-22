import { DIET_PLANS, GOALS } from '../data/goalsAndDiets'

export default function DietPlanSelection({ selectedGoal, onSelect, onBack }) {
  const plans = DIET_PLANS.filter((p) => p.goalId === selectedGoal.id)
  const goalInfo = GOALS.find((g) => g.id === selectedGoal.id)

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-warmGray hover:text-charcoal font-medium mb-8 transition-colors"
      >
        <span className="text-lg">←</span> Geri
      </button>
      <div className="text-center mb-10">
        <span className="text-5xl block mb-4">{goalInfo?.icon}</span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">
          {selectedGoal.title} için Diyet Önerileri
        </h2>
        <p className="text-warmGray font-medium">
          Size uygun planı seçin ve takibine başlayın
        </p>
      </div>
      <div className="space-y-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onSelect(plan)}
            className="w-full p-6 rounded-3xl border-2 border-white hover:border-white bg-sand/30 hover:bg-sand/50 shadow-soft hover:shadow-card text-left transition-all duration-300"
          >
            <h3 className="font-semibold text-charcoal text-lg mb-2">{plan.name}</h3>
            <p className="text-warmGray text-sm mb-4 leading-relaxed">{plan.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-sand text-warmGray text-sm font-medium rounded-full border border-white">
                {plan.dailyCalories} kcal/gün
              </span>
              <span className="px-3 py-1 bg-sand text-warmGray text-xs font-medium rounded-full border border-white">
                P: {plan.protein}g
              </span>
              <span className="px-3 py-1 bg-sand text-warmGray text-xs font-medium rounded-full border border-white">
                K: {plan.carbs}g
              </span>
              <span className="px-3 py-1 bg-sand text-warmGray text-xs font-medium rounded-full border border-white">
                Y: {plan.fat}g
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {plan.features.map((f, i) => (
                <span key={i} className="text-xs text-warmGray/80 px-2 py-0.5 rounded-full border border-white">
                  ✓ {f}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
