import { prisma } from '../../src/lib/prisma.js'
import type { IUser } from '../../src/types/types.js';

export async function createUser(username: string, password: string): Promise<IUser> {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  })
  return user;
}

export async function findUser(username: string): Promise<IUser | null> {
  // Create a new user with a post
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })
  return user;
}

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })



// findUser("aysan")
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })