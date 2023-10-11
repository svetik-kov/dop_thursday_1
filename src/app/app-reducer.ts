export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-APP-STATUS':
      return {...state,status:action.status}
    default:
      return state
  }
}
export const  setAppStatus=(status: RequestStatusType)=>{
  return {type:'APP/SET-APP-STATUS' as const, status}
}
type SetAppStatusType=ReturnType<typeof setAppStatus>
type ActionsType = SetAppStatusType
