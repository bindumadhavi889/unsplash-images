import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
  const storedDarkMode = localStorage.getItem('darkTheme')
  if(storedDarkMode===null){
    return prefersDarkMode
  }
  return storedDarkMode==='true'
}
export const AppProvider = ({children}) => {
  const [dark,setDark] = useState(false)
  const [searchTerm,setSearchTerm] = useState('dog')
  const toggleDark = () =>{
    const newTheme = !dark
    setDark(newTheme)
    localStorage.setItem('darkTheme',newTheme)
  }

  useEffect(()=>{
    document.body.classList.toggle('dark-theme',dark)
  },[dark])
  
  return (
    <AppContext.Provider value={{dark,toggleDark,searchTerm,setSearchTerm}}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => useContext(AppContext)