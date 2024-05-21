'use server'

import { PrismaClient } from "@prisma/client"

export const createUser = async ({ name: name, email: email }) => {
    try {
        const prisma = new PrismaClient()

        const newUser = {
            name,
            email
        }

        const createdUser = await prisma.user.create({
            data: newUser
        })

        console.log(createdUser)

    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async () => {
    try {
        const prisma = new PrismaClient()

        const users = await prisma.user.findMany({})

        return users
    } catch (error) {
        console.log(error)
    }
}

export const updateuser = async ({}) => {
    try {
        const prisma = new PrismaClient()

        const updatedUser = await prisma.user.update({
            data: {},
            where: {
                email
            }
        })

        console.log(updatedUser)

    } catch (error) {
        console.log(error)
    }
}