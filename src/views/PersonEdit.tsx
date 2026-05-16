import { Link, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useStore } from '@/store'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)

  const [isFocused, setIsFocused] = useState<boolean>(false)
const [isHovered, setIsHovered] = useState<boolean>(false)
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

  function handleHover() {
    setIsHovered(true)
  }

  function handleLeaveHover(){
    setIsHovered(false)
  }
  
  function handleFocus(){
    setIsFocused(true)
  }

  function handleBlur(){
    handleLeaveHover()
    setIsFocused(false)
  }

 function maskNumber(value: string | number): string {
  console.log('Masking value:', String(value).length)
  // when String(value).length us 61 we should show error, because max number length is 61
  const raw = String(value)

  // Remove exponential, infinity, NaN, letters, dots, spaces, etc.
  // no leading zeros allowed, except for the single zero case
  const digitsOnly = raw.replace(/^0+(?=\d)|[^\d]/g, '')

  if (!digitsOnly) return '0'

  return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function unmaskNumber(value: string): string {
  const digitsOnly = value.replace(/[^\d]/g, '')

  return digitsOnly || '0'
}

  function getInputWidth(value: string): number {
    const minWidth = 77
    const charWidth = 13
    const extraPadding = 20

    return Math.max(minWidth, value.length * charWidth + extraPadding)
  }

  // error max number length is 61 

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
// input classname should change text color if focused more black
// based on               className="border border-gray-300 rounded px-2 py-1 text-lg outline-none text-center focus:border-[#3D06D7] transition-all duration-200"


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
              onChange={(e) => {
                const nextValue = unmaskNumber(e.target.value)
                updatePersonAge(person.id, +nextValue)
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeaveHover}
              style={{
                width: `${getInputWidth(maskedAge)}px`,
                opacity: isFocused ? 1 : 0.3,
                borderColor: isFocused ? '#906FEE' : isHovered? '#AA9DCE':'#CFCADF',
              }}
              className="border border-gray-300 color-[#1E0E4C] hover:border-[#AA9DCE]  rounded px-2 py-1 text-lg outline-none text-center focus:border-[#3D06D7] transition-all duration-200"
              placeholder="0"
            />

            <span className="text-gray-600 text-lg font-weight-light">hours old</span>
          </div>
        </div>
      </div>
    </div>
  )
}