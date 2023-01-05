import { GetStaticPaths, GetStaticProps } from "next"
import Head from 'next/head'

import { ImageContainer, ProductContainer, ProductDatails } from "../../styles/pages/product"

import { stripe } from '../../lib/stripe'
import Stripe from "stripe"
import { useRouter } from "next/router"
import Image from "next/image"

import Header from "../components/Header"
import { useShoppingCart } from "use-shopping-cart"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string
    defaultPriceId: string
    currency: 'BRL'
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart()
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <Header />

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDatails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
        
          <button
            onClick={() => addItem(product)}
          >
            Colocar na sacola
          </button>
        </ProductDatails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_Mz4Nb65jmFUvyq' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hora
  }
}