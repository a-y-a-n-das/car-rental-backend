import { prisma } from '../../src/lib/prisma.ts'
import type { IUser } from '../../src/types/types.ts';

export async function createUser(username: string, password: string): Promise<IUser> {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
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
  console.log(user)
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