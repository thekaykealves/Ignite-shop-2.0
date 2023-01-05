import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

interface Product {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string
    quantity: number
    currency: 'BRL'
    defaultPriceId: string
  }[],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { products } = req.body as Product

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed." })
  }

  if (req.method === 'POST') {
    const formattedProducts = products.map(product => {
      const teste = product.defaultPriceId

      return teste
  })
    
    const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancel_url = `${process.env.NEXT_URL}/`
    
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      cancel_url: cancel_url,
      success_url: success_url,
      line_items: products.map(product => {
        return {
          price: product.defaultPriceId,
          quantity: 1,
        }
      }),
    })

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    })
  }
}