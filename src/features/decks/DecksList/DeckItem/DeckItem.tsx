import s from './DeckItem.module.css'
import { useAppDispatch } from '../../../../app/store.ts'
import { deleteDeckTC, updateDeckTC } from '../../decks-thunks.ts'
import { Deck } from '../../decks-api.ts'
import { useState } from 'react'

type DeckProps = {
  deck: Deck
}

const TEST_ACC_NAME = 'test'

export const DeckItem = ({ deck }: DeckProps) => {
  const isTestingDeck = deck.author.name === TEST_ACC_NAME
  const dispatch = useAppDispatch()
const [isLoadind,setIsLoading]=useState(false)

  const handleDeleteButtonClick = () => {
    setIsLoading(true)
    dispatch(deleteDeckTC(deck.id)).then((res)=>{
      setIsLoading(false)
    })

  }

  const handleEditButtonClick = () => {
    setIsLoading(true)
    dispatch(updateDeckTC({ id: deck.id, name: `${deck.name} updated` })).then((res)=>{
      setIsLoading(false)
    })
  }

  return (
    <li className={s.item}>
      <h3 className={s.title}>
        {deck.name}
        {isTestingDeck && '✨'}
      </h3>
      <p className={s.characteristic}>
        <b>Author:</b> {deck.author.name}
      </p>
      <p className={s.characteristic}>
        <b>Created:</b> {new Date(deck.created).toLocaleString('ru-Ru')}
      </p>
      <p className={s.characteristic}>
        <b>Updated:</b> {new Date(deck.updated).toLocaleString('ru-Ru')}
      </p>

      {isTestingDeck && (
        <div className={s.buttonBox}>
          <button onClick={handleEditButtonClick} disabled={isLoadind}>update</button>
          <button onClick={handleDeleteButtonClick} disabled={isLoadind}>delete</button>
        </div>
      )}
    </li>
  )
}
