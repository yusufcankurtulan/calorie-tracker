import AddMealForm from './AddMealForm'
import MealList from './MealList'
import DietList from './DietList'

export default function DietTracker({ meals, dietPlan, goal, onAdd, onUpdate, onDelete, onReset }) {
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0)
  const target = dietPlan?.dailyCalories || 2000
  const progress = Math.min((totalCalories / target) * 100, 100)
  const remaining = Math.max(target - totalCalories, 0)
  const overBy = totalCalories > target ? totalCalories - target : 0

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="glass-card rounded-3xl shadow-soft p-5 flex-1 min-w-[200px]">
          <p className="text-sm text-warmGray font-medium">Seçili Plan</p>
          <p className="font-semibold text-charcoal text-lg mt-1">{dietPlan?.name}</p>
          <p className="text-sm text-warmGray font-medium mt-2">Hedef: {target} kcal/gün</p>
        </div>
        <button
          onClick={onReset}
          className="px-5 py-2.5 text-sm font-medium text-warmGray hover:text-charcoal bg-sand/50 hover:bg-sand border-2 border-white rounded-full transition-colors"
        >
          Planı Değiştir
        </button>
      </div>

      <DietList dietPlan={dietPlan} />

      <div className="mb-10 glass-card rounded-3xl shadow-soft p-6 bg-sand">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-charcoal">Günlük Kalori İlerlemesi</h3>
          <span className="font-bold text-charcoal text-xl">{totalCalories} / {target} kcal</span>
        </div>
        <div className="h-4 md:h-5 bg-white rounded-full overflow-hidden relative border border-charcoal/10">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden ${
              totalCalories > target
                ? 'bg-[#2D2A26]'
                : progress >= 100
                ? 'bg-[#4A4540]'
                : progress >= 80
                ? 'bg-[#6B6560]'
                : 'bg-charcoal/30'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {progress > 0 && progress < 100 && (
              <span className="absolute inset-0 progress-bar-shimmer" />
            )}
          </div>
        </div>
        <p className="text-sm text-warmGray mt-3 font-medium">
          {totalCalories <= target
            ? goal?.id === 'lose' && remaining > 0
              ? `Hedefinizin altında kalarak ${remaining} kcal açık bırakıyorsunuz ✓`
              : remaining === 0
              ? 'Günlük hedefinize ulaştınız!'
              : `Hedefe ulaşmak için ${remaining} kcal daha tüketin`
            : `Hedefin ${overBy} kcal üzerindesiniz`}
        </p>
      </div>

      <AddMealForm onAdd={onAdd} />

      <section>
        <h2 className="font-display text-xl font-bold text-charcoal mb-5">Öğün Listesi</h2>
        <MealList meals={meals} onUpdate={onUpdate} onDelete={onDelete} />
      </section>
    </main>
  )
}
