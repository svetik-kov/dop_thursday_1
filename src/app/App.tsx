import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { LinearLoader } from '../common/components/Loader/LinearLoader'
import { useAppSelector } from './store'
import { selectAppStatus } from './app-selectors'
import { ReactNode } from 'react'

export const App = () => {
  const appStatus=useAppSelector(selectAppStatus)



  return (
    <div>
      <List item={['css','html']} renderItem={(item)=>item.toUpperCase()}/>
      <List item={[1.123,2.56]}  renderItem={(item)=>item.toFixed()}/>
      { appStatus==='loading' &&  <LinearLoader/>}
      <Decks />
      <GlobalError />
    </div>
  )
}

type ListType<T>= {
  item: T[]
  renderItem: (item: T) => ReactNode
}

function List<T>(props:ListType<T>){
  return(
<ul>
  {props.item.map((item,index)=>(
    <li key={index}>{props.renderItem(item)}</li>
  ))}
</ul>
  )
}