"use client"
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { GoSearch } from 'react-icons/go'
import { userSearch } from '@/app/actions/user.actions'
import Image from 'next/image'

const Search = () => {

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState({ users: [] })

  const handleSearch = async (search: string) => {
    if (search == '') {
      setSearchResults({ users: [] })
      return
    }

    const res = await userSearch(search)
    setSearchResults(res)
    console.log(res)
  }

  useEffect(() => {

    const id = setTimeout(() => {
      handleSearch(search)
    }, 500)

    return () => {
      clearTimeout(id)
    }

  }, [search])

  return (
    <div className='flex-grow text-white '>
      <div className='w-full flex items-center p-2 gap-2 bg-neutral-800 border-neutral-800 border rounded-md '>
        <input placeholder='Search Users' value={search} onChange={(e) => { setSearch(e.target.value) }} className='w-full p-2 bg-neutral-800 rounded-md' type="text" />
        <Button style={'w-12 bg-neutral-800 border-none'} isLoading={false} handleClick={() => { }}><GoSearch size={20} /></Button>
      </div>

      {/* results */}

      <div className='mt-4 flex flex-col gap-4'>
        {(searchResults?.users?.length > 0) ? (searchResults?.users?.map((user) => {
          return <div key={user.user_id} className='w-full border border-neutral-800 rounded-md p-2 flex gap-4'>
                    <Image width={36} height={36} src={`https://avatars.githubusercontent.com/u/${user?.user_id}?v=4`} alt="profile picture" className='rounded-md h-12 w-12' />
                      <div>
                        <h2 className='font-semibold text-md'>{user?.username}</h2>
                        <p className='text-sm text-neutral-500 '>{user?.email}</p>
                      </div>
                  </div>
                })) : ((search.length > 0 ) && <p className='bg-neutral-800 border border-neutral-800 text-white p-2 rounded-md' > User does not exist </p>)
        }
        
      </div>

    </div>
  )
}

export default Search