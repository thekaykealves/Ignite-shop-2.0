import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { SidebarContextProvider } from '../contexts/SidebarContext'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const stripeKey = process.env.STRIPE_PRODUCTS_KEY

  return (
    <CartProvider
      shouldPersist
      cartMode="checkout-session"
      stripe={stripeKey}
      currency="BRL"
    >
      <Container>
        <SidebarContextProvider>
          <Component {...pageProps} />
        </SidebarContextProvider>
      </Container>
    </CartProvider>
  )
}
