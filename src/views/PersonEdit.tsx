import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useStore } from '@/store'
import { maskNumber, parseSafeNumberInput, MAX_SAFE_NUMBER } from '@/utils/numbers'

const MIN_INPUT_WIDTH = 77
const MAX_INPUT_WIDTH = 320
const INPUT_CHAR_WIDTH = 13
const INPUT_EXTRA_PADDING = 20


function getInputWidth(value: string): number {
  const calculatedWidth = value.length * INPUT_CHAR_WIDTH + INPUT_EXTRA_PADDING

  return Math.min(
    MAX_INPUT_WIDTH,
    Math.max(MIN_INPUT_WIDTH, calculatedWidth)
  )
}

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()

  const person = useStore((state) =>
    state.people.find((p) => p.id === Number(id))
  )

  const updatePersonAge = useStore((state) => state.updatePersonAge)

  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [error, setError] = useState('')

  const nameStyles = useMemo(
    () =>
      `block text-sm font-bold pb-3 ${
        isFocused ? 'text-[#3D06D7]' : 'text-gray-700'
      }`,
    [isFocused]
  )

  const imageStyles = useMemo(
    () =>
      `w-22 h-22 rounded-full border ${
        isFocused ? 'border-[#3D06D7]' : 'border-transparent'
      } object-cover p-1`,
    [isFocused]
  )

  function handleFocus() {
    setIsFocused(true)
  }

  function handleBlur() {
    setIsFocused(false)
    setIsHovered(false)
  }

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
  }

  function handleAgeChange(value: string) {
    const nextValue = parseSafeNumberInput(value)

    if (nextValue === null) {
      setError(`Maximum allowed value is ${MAX_SAFE_NUMBER}`)
      return
    }

    setError('')
    updatePersonAge(person!.id, nextValue)
  }

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

  const maskedAge = maskNumber(person.ageInHours)

  const inputBorderColor = error
    ? '#DC2626'
    : isFocused
      ? '#906FEE'
      : isHovered
        ? '#AA9DCE'
        : '#CFCADF'

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-[#3D06D7] hover:underline text-sm">
        &larr; Back
      </Link>

      <div className="flex items-center gap-3">
        <img src="/images/cat.png" alt={person.name} className={imageStyles} />

        <div>
          <label htmlFor="hours-input" className={nameStyles}>
            {person.name.toUpperCase()} IS
          </label>

          <div className="flex items-center gap-2">
            <input
              id="hours-input"
              type="text"
              inputMode="numeric"
              value={maskedAge}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(event) => handleAgeChange(event.target.value)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                width: `${getInputWidth(maskedAge)}px`,
                opacity: isFocused ? 1 : 0.3,
                borderColor: inputBorderColor,
              }}
              className={`border rounded px-2 py-1 text-lg outline-none text-center transition-all duration-200 ${
                isFocused ? 'text-[#1E0E4C]' : 'text-[#1E0E4C]/60'
              }`}
              placeholder="0"
            />

            <span className="text-gray-600 text-lg font-light">
              hours old
            </span>
          </div>

          {error && (
            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}