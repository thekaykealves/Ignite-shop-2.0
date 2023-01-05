import Image from "next/image";
import { X } from "phosphor-react";
import { useContext, useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { 
  ButtonClose, 
  InfosShoppingCart,
  InfosShoppingCartWrapper, 
  ProductDescription,
  ProductSelected,
  ProductsSelected,
  SidebarContainer,
  SidebarWrapper
} from "../../styles/pages/components/sidebar";

import { useShoppingCart } from "use-shopping-cart";
import axios from "axios";

export default function Sidebar() {
  const { toggleSidebar } = useContext(SidebarContext)

  const { 
    cartCount, 
    cartDetails, 
    removeItem,
    clearCart,
  } = useShoppingCart()

  const products = []

  for (const id in cartDetails) {
    const product = cartDetails[id]

    products.push(product)
  }

  const prices = products.map((product) => {
    return product.price
  })

  let totalPrice = 0;
  let formatPrice;
  for (const price of prices) {
    formatPrice = price.toString().replace('R$', '').replace(',', '.')
    totalPrice = totalPrice + Number(formatPrice)
  }

  const formatTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/createCheckout', {
        products: products,
      })
  
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

      clearCart()
    } catch (error) {
      // conectar com alguma ferramenta de observabilidade (datadog, Sentry)

      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar o checkout!')
    }
  }

  return (
    <SidebarContainer>
      <ButtonClose>
        <button>
          <X onClick={toggleSidebar} size={24} weight="bold" />
        </button>
      </ButtonClose>

      <SidebarWrapper>
        {cartCount > 0 ? (
          <>
            <div>
              <h3>Sacola de compras</h3>

              <ProductsSelected>
                {products.map(product => {
                  return (
                    <ProductSelected key={product.id}>
                      <Image src={product.imageUrl} alt="" width={100} height={100} />

                      <ProductDescription>
                        <div>
                          <span>{product.name}</span>
                          <strong>{product.price}</strong>
                        </div>
                        <button onClick={() => removeItem(product.id)}>
                          Remover
                        </button>
                      </ProductDescription>
                    </ProductSelected>
                  )
                })}
              </ProductsSelected>
            </div>

            <InfosShoppingCartWrapper>
              <InfosShoppingCart>
                <div>
                  <span>Quantidade</span>
                  {cartCount > 1 ? (
                    <span>{cartCount} itens</span>
                  ) : (
                    <span>{cartCount} item</span>
                  )}
                </div>
                <div>
                  <strong>Valor total</strong>
                  <strong>{formatTotal}</strong>
                </div>
              </InfosShoppingCart>

              <button 
                disabled={cartCount === 0 && isCreatingCheckoutSession}
                onClick={handleBuyProducts}
              >
                Finalizar compra
              </button>
            </InfosShoppingCartWrapper>
          </>
        ) : (
          <div>
            <h3>Oops!</h3>
          
            <span>Sua sacola está vazia, adicione produtos.</span>
          </div>
        )}
      </SidebarWrapper>
    </SidebarContainer>
  )
}