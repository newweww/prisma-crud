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

export const getUserByEmail = async ({ email }) => {
    try {
        const prisma = new PrismaClient()

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async ({ name:name, email:email}) => {
    try {
        const prisma = new PrismaClient()

        const updatedUser = await prisma.user.update({
            where: {
                email
            },
            data: { name: name , email: email},
        })

        console.log(updatedUser)

    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async ({ email }) => {
    try {
        const prisma = new PrismaClient()

        const deletedUser = await prisma.user.delete({
            where: {
                email
            }
        })

        console.log(deletedUser)

    } catch (error) {
        console.log(error)
    }
}