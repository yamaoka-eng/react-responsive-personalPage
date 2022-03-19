import { useEffect, useState, useRef, useContext } from "react"
import { AppContext } from "../context"
import { getImage } from "../utils"

const CardContent = ({personInfo}) => {

  const { imgUrl } = personInfo

  const [ isPluse, useIsPluse ] = useState(false)

  useEffect(()=>{
    const randomTime = (Math.round(Math.random() * 10)) * 110
    setTimeout(()=>useIsPluse(true),randomTime)
  },[])

  return (
    <div  onMouseMove={()=>useIsPluse(false)} onMouseLeave={()=>useIsPluse(true)} className={`flex w-52 h-32 transition-all hover:scale-110
    justify-center items-center ${isPluse && 'animate-pulse'}`}>
      <img  className="h-full" src={getImage(imgUrl)} alt="" />
    </div>
  ) 
}

const CarouselCard = ({ Component, personInfo, boxCount, speed, speedChange }) => {

  const liEl = useRef(null)

  const [transX, setTransX] = useState(999999)

  useEffect(()=>{
    setTransX(((document.body.offsetWidth/liEl.current.scrollWidth) * 100) + 3)
  },[])

  useEffect(()=>{
    const boxWith = liEl.current.scrollWidth
    const timeMove = setInterval(() => {
      const windowWith = document.body.offsetWidth
      setTransX(prevtransX => {
        if (prevtransX <= -(boxCount * 100)) return (((windowWith/boxWith) * 100) + 3)
        return  prevtransX - speed
      })
    }, 30)
    return () => clearInterval(timeMove)
  },[speed])

  return (
    <li ref={liEl} className="px-3 md:px-4 flex-none"  onMouseMove={()=>speedChange('low')} onMouseLeave={()=>speedChange('high')} style={{transform: `translateX(${transX}%)`}}><Component personInfo={personInfo} /></li>
  )
}

const CarouselCards = () => {

  const { personInfoArray, speedObj } = useContext(AppContext)

  const [speed, setSpeed] = useState(speedObj.high)

  const speedChange = (speedType) => {
    switch (speedType) {
      case 'high':
        setSpeed(speedObj.high)
        return
      case 'low':
        setSpeed(speedObj.low)
        return
    }
  }

  return (
    <ul className="relative flex w-full py-8 overflow-hidden">
      <li className="absolute z-10 h-32 -left-10">
        <img className="h-full" src={getImage('棒冰.png')} alt="" />
      </li>
      {personInfoArray.map((item, index)=>(<CarouselCard key={index} Component={CardContent} speed={speed} speedChange={speedChange} boxCount={personInfoArray.length} personInfo={item} />))}
      <li className="absolute z-10 h-32 -right-16">
        <img className="h-full" src={getImage('甜甜圈.png')} alt="" />
      </li>
    </ul>
  )
}

export default CarouselCards
