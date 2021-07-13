import prisma from '../../../util/prisma';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const categories = await prisma.category.findMany({
    where: {
      products: { some: {} },
    },
    select: {
      id: true,
      name: true,
      products: {
        select: {
          id: true,
          name: true,
          image: true,
          price: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return res.status(200).json({ categories });
};
