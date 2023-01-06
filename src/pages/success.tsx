import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';

import logoImg from '../assets/logo.svg';
import { SuccessImageContainer, SuccessContainer, HeaderSuccessContainer, ImagesContainer } from "../styles/pages/success";

import { stripe } from "../lib/stripe";

interface SuccessProps {
  customerName: string
  products: {
    id: string
    images: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
      </Head>

      <HeaderSuccessContainer>
        <Image src={logoImg} alt="" />
      </HeaderSuccessContainer>

      <SuccessContainer>
        <ImagesContainer>
          {products.map(product => {
            return (
              <SuccessImageContainer key={product.id}>
                <Image 
                  src={product.images[0]}
                  width={120}
                  height={120}
                  alt=""
                />
              </SuccessImageContainer>
            )
          })}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camisetas já 
          está a caminho da sua casa. 
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  
  const session_id = String(query.session_id);
  
  const response = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const arrayProducts = response.line_items.data

  const products = arrayProducts.map(product => {
    return product.price.product
  })

  const customerName = response.customer_details.name

  return {
    props: {
      customerName,
      products,
    }
  }
}