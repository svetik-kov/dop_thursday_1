import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { LinearLoader } from '../common/components/Loader/LinearLoader'
import { useAppSelector } from './store'
import { selectAppStatus } from './app-selectors'

export const App = () => {
  const appStatus=useAppSelector(selectAppStatus)
  return (
    <div>
      { appStatus==='loading' &&  <LinearLoader/>}
      <Decks />
      <GlobalError />
    </div>
  )
}
