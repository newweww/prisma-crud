'use client'

import React, { useState, useEffect } from 'react'
import { createUser, getUsers } from '@/app/lib/crud'

const Page = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])

    const handleFormData = async (e) => {
        e.preventDefault()

        const newUser = {
            name,
            email
        }

        createUser(newUser)
    }

    const fetchUsers = async () => {
        const userData = await getUsers()
        setUsers(userData)  
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const userData = await getUsers()
            setUsers(userData)
        }

        fetchUsers()
    }, []) 

    return (
        <div className='max-w-sm min-h-screen mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-gray-800'>Create New User</h1>
            <form onSubmit={handleFormData}>
                <input type='text' placeholder='Name' className='block w-full p-2 my-2 border border-gray-300 rounded-md' onChange={(e) => setName(e.target.value)} />
                <input type='email' placeholder='Email' className='block w-full p-2 my-2 border border-gray-300 rounded-md' onChange={(e) => setEmail(e.target.value)} />
                <button type='submit' className='block w-full p-2 my-2 bg-blue-500 text-white rounded-md'>Create User</button>
            </form>
            {
                users.map(user => (
                    <div key={user.id} className='my-2 p-2 w-full border border-gray-300 rounded-md'>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Page