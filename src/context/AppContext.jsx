import React, { useEffect, useState } from "react"

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {

  const navItems = [
    {title: 'React17'},
    {title: 'Responsive'},
    {title: 'Tailwind'},
    {title: 'Context'}
  ]

  const [personInfoArray, setPersonInfoArray] = useState(
    [
      { name: 'Yamaoka' },
      { name: 'across' },
      { name: 'the' },
      { name: 'world' }
    ]
  )

  return (
    <AppContext.Provider
      value={{
        personInfoArray,
        navItems
      }}
    >
      { children }
    </AppContext.Provider>
  )
}