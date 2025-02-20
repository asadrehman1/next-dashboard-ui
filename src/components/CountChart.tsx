"use client";
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';


const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
    
    const data = [
        { name: 'Total', count: boys + girls, fill: 'white' },
        { name: 'Girls', count: girls, fill: '#FAE27C' },
        { name: 'Boys', count: boys, fill: '#C3EBFA' },
    ];

    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src="/moreDark.png" alt='more icon' width={20} height={20}/>
            </div>
            <div className='w-full h-[75%] relative'>
                <ResponsiveContainer>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                        <RadialBar
                            background
                            dataKey="count"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image src="/maleFemale.png" alt='' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
            </div>
            <div className='flex justify-center gap-16'>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-asadSky rounded-full' />
                    <h1 className='font-bold'>{boys}</h1>
                    <h2 className='font-bold text-xs text-gray-300'>Boys ({Math.round((boys/(boys+girls)) * 100)}%)</h2>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-asadYellow rounded-full' />
                    <h1 className='font-bold'>{girls}</h1>
                    <h2 className='font-bold text-xs text-gray-300'>Girls ({Math.round((girls / (boys + girls)) * 100)}%)</h2>
                </div>
            </div>
        </div>
    )
}

export default CountChart