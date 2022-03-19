import { useState, useEffect, useContext } from "react"
import { AppContext } from "../context"
import { getImage } from "../utils"

const Welcome = () => {
  return (
    <div className="w-full flex justify-center items-center p-4 pt-6">
      <div className="flex md:p-16 md:mx-4 py-6 px-4 justify-between md:flex-row flex-col blurry-bg-tsp ">
        <LeftNav/>
        <Card/>
      </div>
    </div>
  )
}

const LeftNav = () => {
  const { welcomeInfo:{ leftNav } } = useContext(AppContext)

  return (
    <ul className="md:w-auto md:mr-14 w-full md:mb-0 mb-10 flex md:flex-col flex-row justify-between md:justify-start">
      {leftNav.map(item => (
        <li key={item.id} className="md:pt-12 md:first:pt-0 pr-4 md:pr-0 last:pr-0 md:text-xl cursor-pointer
        text-base font-semibold ease-in-out transition text-gray-400 hover:text-gray-100" >{ item.name }</li>
      ))}
    </ul>
  )
}

const Card = () => {

  const { welcomeInfo:{ welcomeText } } = useContext(AppContext)

  const [ dynamicWelconmeText, setDynamicWelconmeText ] = useState('')

  const [isCursorFlicker, setIsCursorFlicker] = useState(true)

  useEffect(() => {

    var index = 0

    var intervalLock = true

    const choseeWelcomeText = () => {
      if (index < welcomeText.length - 1) {
        index += 1
        return
      }
      index = 0
    }

    const clearWelcomeText = () => {
      if (intervalLock) return
      intervalLock = false
      const interval = setInterval(() => {
        setDynamicWelconmeText((pre)=>{
          if (!pre) {
            clearInterval(interval)
            setIsCursorFlicker(true)
            intervalLock = true
            setTimeout(() => {
              addWelcomeText()
            }, 2000)
            return pre
          }
          setIsCursorFlicker(false)
          return pre.slice(0, pre.length-1)
        })
      }, 80)
    }

    const addWelcomeText = () => {
      if (!intervalLock) return
      intervalLock = true
      const interval = setInterval(() => {
        setDynamicWelconmeText((pre)=>{
          setIsCursorFlicker(false)
          if (!pre) return welcomeText[index][0]
          if (pre.length < welcomeText[index].length) return pre + welcomeText[index][pre.length]
          choseeWelcomeText()
          clearInterval(interval)
          setIsCursorFlicker(true)
          intervalLock = false
          setTimeout(() => {
            clearWelcomeText()
          }, 5000);
          return pre
        })
      }, 200)
    }

    addWelcomeText()

  }, []);

  return (
    <div className="flex md:flex-row flex-col justify-between bg-white rounded-lg overflow-hidden">
      <div className="flex-none md:w-48 md:h-auto h-40 w-full relative">
        <img src={getImage('NFTArt.png')} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="md:w-[25rem] flex-col p-6">
        <div className="flex flex-col">
          <h1 className="md:w-auto w-72 text-xl font-semibold h-24 min-h-full break-words">
            { dynamicWelconmeText }
            <span className={`text-2xl ${isCursorFlicker && 'cursor-flicker'}`}>|</span>
          </h1>
          <div className="text-xl font-semibold text-gray-500">
            基于React框架
          </div>
          <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
            使用 Tailwindcss 实现响应式页面
          </div>
        </div>
        <div className="flex items-baseline mt-4 mb-6">
          <div className="ml-auto text-sm text-gray-500 underline">CSS3动画</div>
        </div>
        <div className="flex space-x-3 mb-4 text-sm font-medium">
          <div className="flex-auto flex space-x-3">
            <button className="color-animated btn-gradual w-1/2 flex items-center justify-center rounded-md text-white" >Decorative buttons</button>
            <button className="transition duration-500 btn-animated w-1/2 flex items-center justify-center rounded-md border text-purple-700">Decorative buttons</button>
          </div>
          <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300" type="button" aria-label="like">
            <svg className="hover:text-red-500" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500">
          点击右上角EXPLORE可去Github查看源码，欢迎点星
        </p>
      </div>
    </div>
  )
}

export default Welcome