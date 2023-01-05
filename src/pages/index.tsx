import { GetStaticProps } from "next";
import Image from "next/image";
import Link from 'next/link'
import Head from 'next/head'

import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css';

import { stripe } from "../lib/stripe";
import Stripe from "stripe";

import { Handbag } from 'phosphor-react'
import Header from "./components/Header";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useRouter } from "next/router";
import { useShoppingCart } from "use-shopping-cart";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string
    quantity: number
    currency: 'BRL'
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  })

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <Header />

      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map(product => {
          return (
            <div key={product.id}>
              {isFallback ? (<Skeleton count={3} />) : (
                <Product className='keen-slider__slide'>
                  <Link href={`/product/${product.id}`} prefetch={false}>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                  </Link>
                  
                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>

                    <button onClick={() => addItem(product)}>
                      <Handbag size={32} color="white" weight="bold" />
                    </button>
                  </footer>
                </Product>
              )}
            </div>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      defaultPriceId: price.id,
    }
  })
  
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}