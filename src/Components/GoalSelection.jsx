import { GOALS } from '../data/goalsAndDiets'

const goalStyles = 'from-sand/80 to-cream border-white hover:border-white hover:shadow-card bg-sand/50'

export default function GoalSelection({ onSelect }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">
          Hedefiniz Nedir?
        </h2>
        <p className="text-warmGray font-medium">
          Size uygun diyet planları için hedefinizi seçin
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {GOALS.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onSelect(goal)}
            className={`p-6 rounded-3xl border-2 bg-gradient-to-br text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-slide-up ${goalStyles}`}
          >
            <span className="text-5xl block mb-4">{goal.icon}</span>
            <h3 className="font-semibold text-charcoal text-lg mb-2">{goal.title}</h3>
            <p className="text-sm text-warmGray leading-relaxed">{goal.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
