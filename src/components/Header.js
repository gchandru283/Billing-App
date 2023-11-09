import React from 'react'

function Header() {
  return (
    <div className='h-16 bg-white px-10 w-screen fixed shadow-md flex'>
        <div className='flex items-center gap-5'><img src='/coffee-cup.jpg' alt='coffee cup image' className='h-16 p-0.5'/>
        <div className='md:text-3xl text-2xl pt-1 font-bold font-glacial'> William's Café</div></div>

    </div>
  )
}

export default Header