import Image from 'next/image'
import styles from './SelectHard.module.scss'

interface Props {
  select: {
    id: number
    name: string
    image: string
  }
  onChange: (hard: {
    id: number
    name: string
    image: string
  }) => void
}

const SelectHard: React.FC<Props> = ({ select, onChange }) => {

  const options = [
    {
      id: 1,
      name: 'PlayStation 5',
      image: '/playstation.jpg'
    },
    {
      id: 2,
      name: 'Nintendo Switch',
      image: '/switch.jpg'
    },
    {
      id: 3,
      name: 'Steam Deck',
      image: '/steam.jpg'
    }
  ]

  const setHard = (hard: Props['select']) => {
    if (select.id !== hard.id) {
      onChange(hard)
    } else {
      onChange(
        {
          id: 0,
          name: '',
          image: ''
        }
      )
    }
  }

  return (
    <div className={styles.selectHard}>
      {options.map((option)=>
        <div
          key={option.id}
          className={`
            ${styles.selectOption}
            ${select.id === option.id && styles.active }
            ${select.id !== 0 && select.id !== option.id && styles.disabled}
          `}
          onClick={() => setHard(option)}
        >
          <Image
            src={option.image}
            alt={option.name}
            className={styles.optionImage}
            width={80}
            height={80}
          />
        </div>
      )}
    </div>
  )
}

export default SelectHard
