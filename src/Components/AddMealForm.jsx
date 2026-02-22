import { useState, useRef, useEffect } from 'react'
import { searchFoods } from '../data/foodDatabase'

export default function AddMealForm({ onAdd }) {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [mealType, setMealType] = useState('öğle')
  const [note, setNote] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (name.length >= 2) {
      setSuggestions(searchFoods(name))
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [name])

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectFood = (food) => {
    setName(food.name)
    setCalories(food.calories.toString())
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1))
    } else if (e.key === 'Enter' && selectedIndex >= 0 && suggestions[selectedIndex]) {
      e.preventDefault()
      handleSelectFood(suggestions[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !calories) return

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      calories: parseInt(calories, 10) || 0,
      date: new Date().toISOString().split('T')[0],
      mealType,
      note: note.trim() || undefined,
    })

    setName('')
    setCalories('')
    setMealType('öğle')
    setNote('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl shadow-soft p-6 mb-10">
      <h2 className="font-display text-xl font-bold text-charcoal mb-5">Yeni Öğün Ekle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative" ref={wrapperRef}>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Yemek Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Yazın veya arayın..."
            className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30 transition-all"
            required
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur border-2 border-charcoal/10 rounded-2xl shadow-lift max-h-60 overflow-auto">
              {suggestions.map((food, index) => (
                <li key={`${food.name}-${food.calories}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectFood(food)}
                    className={`w-full px-4 py-3 text-left flex justify-between items-center transition-colors rounded-xl mx-1 my-0.5 ${
                      index === selectedIndex ? 'bg-sand' : 'hover:bg-sand/70'
                    }`}
                  >
                    <span className="text-charcoal font-medium">{food.name}</span>
                    <span className="text-sm text-charcoal font-semibold">
                      {food.calories} kcal
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Kalori</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Arayın veya girin"
            min="0"
            className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">Öğün Türü</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30 transition-all"
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
            placeholder="örn: Az tuzlu"
            className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-charcoal/10 focus:border-charcoal/20 bg-sand/30 transition-all"
          />
        </div>
      </div>
      <p className="text-xs text-warmGray mt-3 font-medium">
        Besin adı yazarak arayın — seçtiğinizde kalori otomatik dolar
      </p>
      <button
        type="submit"
        className="mt-5 px-8 py-3 bg-gradient-to-r from-cream via-sand to-[#F5EFE7] hover:opacity-90 text-charcoal font-semibold rounded-2xl border-2 border-charcoal/10 transition-all duration-300"
      >
        Ekle
      </button>
    </form>
  )
}
