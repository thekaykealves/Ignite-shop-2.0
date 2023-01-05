import logoImg from '../../assets/logo.svg'
import Image from 'next/image'

import { CarryBag, HeaderContainer } from '../../styles/pages/components/header'

import { Handbag } from 'phosphor-react'
import Sidebar from './Sidebar'
import { useContext } from 'react'
import { SidebarContext } from '../../contexts/SidebarContext'
import { useShoppingCart } from 'use-shopping-cart'

export default function Header() {
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext)
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Image src={logoImg} width={130} height={50} alt="" priority />
    
      <div>
        <CarryBag onClick={toggleSidebar}>
          <Handbag size={24} />
          {cartCount > 0 ? (
            <span>{cartCount}</span>
          ) : (
            <></>
          )}
        </CarryBag>
        {
          isSidebarOpen ? (
            <Sidebar />
          ) : ''
        }
      </div>
    </HeaderContainer>
  )
}