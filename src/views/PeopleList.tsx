import { Link } from 'react-router-dom'
import { useStore } from '@/store'
import { maskNumber } from '@/utils/numbers'
import styles from '@/styles/PeopleList.module.css'

export default function PeopleList() {
  const people = useStore((state) => state.people)

  const peopleWithYears = people.map((person) => ({
    ...person,
    ageInYears: Math.floor(person.ageInHours / 8760),
  }))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-gray-700">People</h1>

      <div className="flex flex-col gap-3">
        {peopleWithYears.map((person, index) => (
          <Link
            key={person.id}
            to={`/person/${person.id}`}
            style={{ '--stagger-index': index } as React.CSSProperties}
            className={`${styles.personCard} flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-violet-500`}
          >
            <img
              src="/images/cat.png"
              alt={person.name}
              className="w-[88px] h-[88px] rounded-full border border-[#3D06D7] object-cover p-1"
            />

            <div>
              <div className="font-bold text-gray-700">{person.name}</div>
              <div className="text-gray-600">
                {maskNumber(person.ageInYears)} years old
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/settings" className="text-violet-600 hover:underline text-sm">
        Settings
      </Link>
    </div>
  )
}