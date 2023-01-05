import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';

import logoImg from '../assets/logo.svg';

import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { SuccessImageContainer, SuccessContainer, HeaderSuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
      </Head>

      <HeaderSuccessContainer>
        <Image src={logoImg} alt="" />
      </HeaderSuccessContainer>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <SuccessImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </SuccessImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa. 
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
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

  const customerName = response.customer_details.name
  const product = response.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}