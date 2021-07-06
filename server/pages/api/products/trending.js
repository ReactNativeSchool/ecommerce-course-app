import prisma from '../../../util/prisma';

const selectFields = {
  id: true,
  name: true,
  image: true,
  price: true,
};

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const bestSellers = await prisma.product.findMany({
    where: {
      soldCount: {
        gt: 0,
      },
    },
    orderBy: {
      soldCount: 'desc',
    },
    take: 3,
    select: selectFields,
  });

  const newItems = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
    select: selectFields,
  });

  const data = [
    {
      title: 'Best Sellers',
      items: bestSellers,
    },
    {
      title: 'New Items',
      items: newItems,
    },
  ];

  return res.status(200).json({ data });
};
