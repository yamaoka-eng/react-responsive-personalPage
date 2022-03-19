import { useState } from 'react'
import { Navbar, CarouselCards, Welcome} from './components'

export default function App() {
  return (
    <div className='App overflow-auto bg-fixed'>
      <Navbar/>
      <CarouselCards/>
      <Welcome/>
    </div>
  )
}
