import React, { useEffect, useState } from "react"

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {

  const navItems = [
    {title: 'React'},
    {title: 'Responsive'},
    {title: 'Tailwind'},
    {title: 'Context'},
    {title: 'Nodejs'}
  ]

  const [personInfoArray, setPersonInfoArray] = useState(
    [
      { imgUrl: '01-Sake.png' },
      { imgUrl: '02-cake.png' },
      { imgUrl: '03-sushi.png' },
      { imgUrl: '04-icecream.png' },
      { imgUrl: '05-mochi.png' },
      { imgUrl: '06-hamburger.png' },
      { imgUrl: '07-macadamianut.png' },
      { imgUrl: '08-milkshake.png' },
      { imgUrl: '09-icecream.png' },
    ]
  )

  const speedObj = { high: 1, low: 0.2 }

  const welcomeInfo = {
    leftNav: [
      { id: '01', name: 'Sumple' },
      { id: '02', name: 'Playful' },
      { id: '03', name: 'Elegant' },
      { id: '04', name: 'Brutalist' },
    ],
    welcomeText: [
      "Welcome to Yamaoka's Personality Homepage.",
      "To read without reflecting is like eating without digesting.",
      "You can change your life if you want to."
    ]
  }

  return (
    <AppContext.Provider
      value={{
        personInfoArray,
        navItems,
        speedObj,
        welcomeInfo
      }}
    >
      { children }
    </AppContext.Provider>
  )
}