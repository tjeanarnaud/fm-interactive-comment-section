import React, { useState } from 'react'
import { ReactComponent as MinusIcon } from '../assets/icon-minus.svg'
import { ReactComponent as PlusIcon } from '../assets/icon-plus.svg'

import './vote.css'

const Vote = ({ score }) => {
  const [value, setValue] = useState(score)

  return (
    <div className="card__vote">
      <button
        className="vote__button"
        onClick={() => setValue((currentValue) => currentValue - 1)}
      >
        <MinusIcon />
      </button>
      <span className="vote__score">{value}</span>
      <button
        className="vote__button"
        onClick={() => setValue((currentValue) => currentValue + 1)}
      >
        <PlusIcon />
      </button>
    </div>
  )
}

export default Vote
