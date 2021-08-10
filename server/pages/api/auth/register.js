import prisma from '../../../util/prisma';
import { hashPassword, generateJWT } from '../../../util/auth';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    const user = req?.body || {};
    user.password = await hashPassword(user.password);

    const createdUser = await prisma.user.create({ data: user });
    const token = await generateJWT(createdUser.id);

    return res.status(200).json({
      userId: createdUser.id,
      token,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(200).json({ message: 'Account already exists.' });
    }

    // Log the error
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};
