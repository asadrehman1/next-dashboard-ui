import React from 'react'

const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Announcements</h1>
            <span className='text-xs text-gray-400'>View All</span>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-asadSkyLite rounded-md p-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-medium'>Announcement 1</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-02-18</span>
                </div>
                <p className='text-xs text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab culpa quis nostrum, delectus, fugit doloremque ratione natus quidem quibusdam cum, fuga aperiam obcaecati nulla? Velit sint tenetur repudiandae natus aut!</p>
            </div>
             <div className='bg-asadPurpleLite rounded-md p-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-medium'>Announcement 1</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-02-18</span>
                </div>
                <p className='text-xs text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab culpa quis nostrum, delectus, fugit doloremque ratione natus quidem quibusdam cum, fuga aperiam obcaecati nulla? Velit sint tenetur repudiandae natus aut!</p>
            </div>
             <div className='bg-asadYellowLite rounded-md p-4'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-medium'>Announcement 1</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-02-18</span>
                </div>
                <p className='text-xs text-gray-400 mt-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab culpa quis nostrum, delectus, fugit doloremque ratione natus quidem quibusdam cum, fuga aperiam obcaecati nulla? Velit sint tenetur repudiandae natus aut!</p>
            </div>
        </div>
    </div>
  )
}

export default Announcements