import { createContext, ReactNode, useState } from "react"

interface ShoppingCartType {
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

interface ShoppingCartProviderProps {
  children: ReactNode
}

export const SidebarContext = createContext({} as ShoppingCartType)

export function SidebarContextProvider({ children }: ShoppingCartProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  return (
    <SidebarContext.Provider
      value={{
        toggleSidebar,
        isSidebarOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}