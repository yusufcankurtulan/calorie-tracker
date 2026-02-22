import MealItem from './MealItem'

export default function MealList({ meals, onUpdate, onDelete }) {
  if (meals.length === 0) {
    return (
      <div className="glass-card rounded-3xl shadow-soft p-16 text-center">
        <p className="text-6xl mb-6 opacity-40">📋</p>
        <p className="text-charcoal font-medium">Henüz öğün eklenmemiş.</p>
        <p className="text-sm text-warmGray mt-2">Yukarıdaki formu kullanarak ilk öğününüzü ekleyin.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          meal={meal}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
