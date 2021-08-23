import Stripe from 'stripe';

import prisma from '../../util/prisma';
import { decodeJWT } from '../../util/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET);

const createStripeUser = async ({ id, email }) => {
  const customer = await stripe.customers.create({ email });

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      stripe_customer_id: customer.id,
    },
  });
};

const getUser = async request => {
  try {
    const decoded = await decodeJWT(request?.headers?.authorization);
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. ' });
  }

  let user = await getUser(req);
  if (!user) {
    return res
      .status(401)
      .json({ message: 'You must be signed in to do that.' });
  }

  // does a stripe user id exist
  // create that id if not
  if (!user.stripe_customer_id) {
    user = await createStripeUser(user);
  }

  // create ephemeral key
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {
      customer: user.stripe_customer_id,
    },
    {
      apiVersion: '2020-08-27',
    },
  );

  // console.log(req.body.cart);
  const cart = req?.body?.cart || {};
  const productIds = Object.keys(cart);
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      id: true,
      price: true,
    },
  });

  // calculate total
  let total = 0;
  products.forEach(product => {
    total += product.price * cart[product.id].quantity;
  });

  // payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
    customer: user.stripe_customer_id,
  });

  return res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLIC,
    paymentIntent: paymentIntent.client_secret,
    customer: user.stripe_customer_id,
    ephemeralKey: ephemeralKey.secret,
  });
};
