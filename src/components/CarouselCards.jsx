import { useEffect, useState, useRef, useContext } from "react"
import { AppContext } from "../context"

const Card = ({personInfo}) => {
  const { name } = personInfo
  return (
    <div className="flex w-80 h-32 transition-all blurry-bg-tsp hover:scale-110
    justify-center items-center gradient-text-gay-white animate-pulse">
      <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">{ name }</h1>
    </div>
  ) 
}

const CarouselCard = ({ Component, personInfo, boxCount, speed }) => {

  const liEl = useRef(null)

  const [transX, setTransX] = useState(999999)

  useEffect(()=>{
    setTransX(((document.body.offsetWidth/liEl.current.scrollWidth) * 100) + 10)
  },[])

  useEffect(()=>{
    const boxWith = liEl.current.scrollWidth
    const timeMove = setInterval(() => {
      const windowWith = document.body.offsetWidth
      setTransX(prevtransX => {
        if (prevtransX <= -(boxCount * 100)) return (((windowWith/boxWith) * 100) + 10)
        return  prevtransX - speed
      })
    }, 30)
    return () => clearInterval(timeMove)
  },[speed])

  return (
    <li ref={liEl} className="px-3 md:px-4 flex-none" style={{transform: `translateX(${transX}%)`}}><Component personInfo={personInfo} /></li>
  )
}

const CarouselCards = () => {

  const { personInfoArray } = useContext(AppContext)

  const [speed, setSpeed] = useState(0.6)

  return (
    <ul className="flex w-full py-8 overflow-hidden"  onMouseMove={()=>setSpeed(0.2)} onMouseLeave={()=>setSpeed(0.6)}>
      {personInfoArray.map((item, index)=>(<CarouselCard key={index} Component={Card} speed={speed} boxCount={personInfoArray.length} personInfo={item} />))}
    </ul>
  )
}

export default CarouselCards
