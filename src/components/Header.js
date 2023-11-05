import React from 'react'

function Header() {
  return (
    <div className='h-20 bg-white px-10 w-screen fixed shadow-md flex justify-center'>
        <div className='flex items-center gap-5'><img src='/coffee-cup.jpg' alt='coffee cup image' className='h-20 p-1'/>
        <div className='font-HarryP font-medium md:text-5xl text-3xl pt-2'>Sarmitha's Cafe </div></div>

    </div>
  )
}

export default Header