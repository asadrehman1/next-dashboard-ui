"use client";

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

//TEMPORARY DATA
const events = [
    {
        id: 1,
        title: "Event 1",
        time: "12:00 PM - 2:00 PM",
        descrtiption: "This is our first event"
    },
    {
        id: 2,
        title: "Event 2",
        time: "2:00 PM - 4:00 PM",
        descrtiption: "This is our second event"
    },
    {
        id: 3,
        title: "Event 3",
        time: "4:00 PM - 6:00 PM",
        descrtiption: "This is our third event"
    },
    {
        id: 4,
        title: "Event 4",
        time: "6:00 PM - 8:00 PM",
        descrtiption: "This is our fourth event"
    }
]

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className='bg-white p-4 rounded-md'>
        <Calendar onChange={onChange} value={value} />
        <div className='flex justify-between items-center'>
            <h1 className='text-lg my-4 font-semibold'>Events</h1>
            <Image src="/moreDark.png" alt='more icon' width={20} height={20}/>
        </div>
        <div className='flex flex-col gap-4'>
            {events.map(event => (
                <div 
                    className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-asadSky even:border-t-asadPurple' 
                    key={event.id}>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-semibold text-gray-600'>{event.title}</h1>
                        <span className='text-gray-300 text-xs'>{event.time}</span>
                    </div>
                    <p className='mt-2 text-gray-400 text-sm'>{event.descrtiption}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EventCalender