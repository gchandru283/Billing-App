import React from 'react'

function Header() {
  return (
    <div className='h-20 bg-white px-10 w-screen fixed shadow-md flex'>
        <div className='flex items-center gap-5'><img src='/coffee-cup.jpg' alt='coffee cup image' className='h-20 p-1'/>
        <div className='md:text-4xl text-2xl pt-2 font-bold font-glacial'> Williams Café</div></div>

    </div>
  )
}

export default Header