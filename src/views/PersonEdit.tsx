import { Link, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useStore } from '@/store'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  }

   const handleBlur = () => {
    setIsFocused(false);
  }

  const nameStyles = useMemo(() =>   `block text-sm font-bold tracking-wide pb-3  ${isFocused ? "text-[#3D06D7]" : "text-gray-700"}`, [isFocused]);
  
const imageStyles = useMemo(() => `w-22 h-22 rounded-full border ${isFocused ? "border-[#3D06D7]" : "border-none"} object-cover p-1`, [isFocused]);
  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-[#3D06D7] hover:underline text-sm">
          Back to list
        </Link>
      </div>
    )
  }
  function maskNumber(num: number): string  {
    // 1000 -> 1 000, 1000000 -> 1 000 000
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  function unmaskNumber(str: string): number  {
    // "1 000" -> 1000, "1 000 000" -> 1000000
    return Number(str.replace(/\s/g, ''))
  }
  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-[#3D06D7] hover:underline text-sm">
        &larr; Back
      </Link>

      <div className="flex items-center gap-3">
        <img
          src="/images/cat.png"
          alt={person.name}
              className={imageStyles}
        />
        <div>
          <label htmlFor="hours-input" className={nameStyles}>
            {person.name.toUpperCase()} IS
          </label>
          <div className="flex items-center gap-2">
            <input
              id="hours-input"
              type="text"
              value={maskNumber(person.ageInHours)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => updatePersonAge(person.id, unmaskNumber(e.target.value) || 0)}
              // Starting at a width of 72 px, the input should adapt to the size of the entered value
              // add adaptive width to the input based on the length of the entered value
              className={`border border-gray-300 rounded px-2 py-1 text-lg outline-none text-center focus:border-[#3D06D7] transition-all duration-200 ${maskNumber(person.ageInHours).length > 3 ? 'w-auto' : 'w-[77px]'}`}
              // className="border border-gray-300 rounded px-2 py-1 text-lg outline-none w-20 text-center focus:border-[#3D06D7]"
              placeholder="0"
            />
            <span className="text-gray-600 text-lg">hours old</span>
          </div>
        </div>
      </div>
    </div>
  )
}
