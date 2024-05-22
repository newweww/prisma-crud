'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createUser, getUsers, getUserByEmail, deleteUser, updateUser } from '@/app/lib/crud'

const Page = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])
    const [isEdited, setIsEdited] = useState(false)
    const [editName, setEditName] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const editPopupRef = useRef(null)

    const fetchUsers = async () => {
        const userData = await getUsers()
        const reversedUsers = userData.reverse();
        setUsers(reversedUsers);
        console.log(userData)
    }

    const handleFormData = async (e) => {
        e.preventDefault()
        const newUser = { name, email }
        await createUser(newUser)
        fetchUsers()
    }

    const handleEditPopup = async (email) => {
        setIsEdited(true)
        try {
            const editUser = await getUserByEmail({ email })
            setEditName(editUser.name)
            setEditEmail(editUser.email)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()

        await updateUser({ name: editName, email: editEmail })

        fetchUsers()
        setIsEdited(false)
        setEditEmail('')
        setEditName('')

    }

    const handleClickOutside = (event) => {
        if (editPopupRef.current && !editPopupRef.current.contains(event.target)) {
            setIsEdited(false)
            setEditEmail('')
            setEditName('')
        }
    }

    const handleDelete = async (email) => {
        try {
            await deleteUser({ email })
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (isEdited) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isEdited])

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-2'>
            <div className='max-w-sm w-full bg-white p-6 rounded-lg shadow-md'>
                <h1 className='text-4xl text-gray-800 mb-6 text-center'>Create New User</h1>
                <form onSubmit={handleFormData} className='flex flex-col'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='block w-full p-2 mb-4 border border-gray-300 rounded-md'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className='block w-full p-2 mb-4 border border-gray-300 rounded-md'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='block w-full p-2 mb-4 bg-blue-500 text-white rounded-md'>
                        Create User
                    </button>
                </form>
            </div>
            <div className='grid max-h-56 bg-white p-2 overflow-y-scroll'>
                {
                    users.map(user => (
                        <div key={user.id} className='my-2 p-2 border gap-2 flex border-gray-300 rounded-md'>
                            <p>{user.name}</p>
                            <p> | </p>
                            <p>{user.email}</p>
                            <div className='flex ml-auto gap-2'>
                                <button
                                    className='bg-blue-500 text-white p-1 rounded-md'
                                    onClick={() => handleEditPopup(user.email)}>
                                    Edit
                                </button>
                                <button
                                    className='bg-red-500 text-white p-1 rounded-md'
                                    onClick={() => handleDelete(user.email)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                isEdited && (
                    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
                        <div ref={editPopupRef} className='bg-white p-8 rounded-md max-w-sm w-full'>
                            <h1 className='text-2xl text-gray-800 mb-4'>Edit User</h1>
                            <form className='flex flex-col' onSubmit={handleEdit}>
                                <input
                                    type='text'
                                    value={editName}
                                    placeholder='Name'
                                    className='block w-full p-2 mb-4 border border-gray-300 rounded-md'
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <input
                                    type='email'
                                    value={editEmail}
                                    placeholder='Email'
                                    className='block w-full p-2 mb-4 border border-gray-300 rounded-md'
                                    onChange={(e) => setEditEmail(e.target.value)}
                                />
                                <button
                                    type='submit'
                                    className='block w-full p-2 mb-4 bg-blue-500 text-white rounded-md'>
                                    Update User
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Page
