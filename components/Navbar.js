import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex justify-between md:h-16 h-8 items-center py-2 px-5 bg-[#052F5F] text-white'>
        <span className='font-bold text-2xl cursor-pointer'>ChopLink</span>
        <ul className='flex gap-5 text-lg'>
            <Link href="/" className='hover:bg-slate-50 hover:text-blue-900 px-1 py-1 cursor-pointer rounded-lg'>Home</Link>
            <Link href="/about" className='hover:bg-slate-50 hover:text-blue-900 px-1 py-1 cursor-pointer rounded-lg'>About</Link>
        </ul>
    </nav>
  )
}

export default Navbar
