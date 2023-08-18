import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

import T__ from './components/t__/T__'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [usersResults, setUsersResults] = useState('')

  const createUser = async () => {
    try {
      const createdUser = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }).then((res) => {
        res.json()
        console.log(res)
      })
      console.log('created document')

      setName('')
      setEmail('')
    } catch (error) {
      console.log(error)
    }
  }

  const displayUsers = async () => {
    try {
      console.log('fetching documents')
      const fetchedUsers = await fetch('/api/users').then((data) => res.json())
      console.log('fetched documents')
      setUsersResults(fetchedUsers)
      console.log(usersResults)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <main>
        <div>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </label>
            <button onClick={createUser}>Submit data</button>
          </div>

          <div>
            <button onClick={displayUsers}> Display user Data</button>
            <div>
              {usersResults.fetchedUsers &&
                usersResults.fetchedUsers.length > 0 && (
                  <ul>
                    {usersResults.fetchedUsers.map((user) => (
                      <li key={user._id}>
                        <p>{user.name}</p>
                        <p>({user.email})</p>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
