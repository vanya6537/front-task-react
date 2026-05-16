import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">
          Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <div className="flex items-center gap-3">
        <img
          src="/images/cat.png"
          alt={person.name}
              className="w-22 h-22 rounded-full border border-[#3D06D7] object-cover p-1"
        />
        <div>
          <label htmlFor="hours-input" className="block text-sm font-bold tracking-wide text-gray-700">
            {person.name.toUpperCase()} IS
          </label>
          <div className="flex items-center gap-2">
            <input
              id="hours-input"
              type="text"
              value={person.ageInHours}
              onChange={(e) => updatePersonAge(person.id, Number(e.target.value) || 0)}
              className="border border-gray-300 rounded px-2 py-1 text-lg outline-none"
              placeholder="0"
            />
            <span className="text-gray-600">hours old</span>
          </div>
        </div>
      </div>
    </div>
  )
}
