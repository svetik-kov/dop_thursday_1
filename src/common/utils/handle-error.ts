import { Dispatch } from 'redux'
import { isAxiosError } from 'axios'
import { setAppError } from '../../app/app-reducer'

export const handleError=(e:unknown,dispatch:Dispatch)=>{
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
  dispatch(setAppError(errorMessage))
}

type ServerError = {
  errorMessages: Array<{
    message: string,
    field: string
  }>
}