import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatus } from '../../app/app-reducer'
import { isAxiosError } from 'axios'

/*export const fetchDecksTC = () => (dispatch: Dispatch) => {
  decksAPI.fetchDecks().then((res) => {
    dispatch(setDecksAC(res.data.items))
  })
}*/
export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatus('succeeded'))

  } catch (e) {
    dispatch(setAppStatus('failed'))
  }
}
export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {

    let errorMessage = ''
    if (isAxiosError<ServerError>(e)) {
      //throw new Error('BOOM')
      //case 1 ошибка запроса(приходит с бэкенда) axios создает объект ошибки, в response.data  помещает ответ сервера
      //case 2 network error (на стороне клиента) -axios сщздает объект ошибки, текст ошибки берем из поля message
      errorMessage = e.response
        ? e.response.data.errorMessages[0].message //case1
        : e.message //case2
      console.log(errorMessage)
    } else {
      //case 3 ошибка вне запроса-генерируется js-имеет поле message
      errorMessage = (e as Error).message
      console.log(errorMessage)
    }
  }
}

type ServerError = {
  errorMessages: Array<{
    message: string,
    field: string
  }>
}

/*
"errorMessages": [
  {
    "field": "name",
    "message": "name must be shorter than or equal to 30 characters"
  }
]*/
