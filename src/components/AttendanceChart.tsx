"use client";
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Mon',
        present: 60,
        absent: 40,
    },
    {
        name: 'Tue',
        present: 70,
        absent: 60,
    },
    {
        name: 'Wed',
        present: 90,
        absent: 75,
    },
    {
        name: 'Thu',
        present: 86,
        absent: 63,
    },
    {
        name: 'Fri',
        present: 65,
        absent: 55,
    },
];

const AttendanceChart = () => {
    return (
        <div className='bg-white rounded-xl p-4 h-full'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <Image src="/moreDark.png" alt='more icon' width={20} height={20} />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    barSize={20}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                    <XAxis tickLine={false} dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: "#d1d5db" }} />
                    <Tooltip contentStyle={{
                        borderRadius: "10px",
                        borderColor: "lightgray"
                    }} />
                    <Legend
                        align='left'
                        verticalAlign='top'
                        wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
                    />
                    <Bar radius={[10, 10, 0, 0]} legendType='circle' dataKey="absent" fill="#FAE27C" />
                    <Bar radius={[10, 10, 0, 0]} legendType='circle' dataKey="present" fill="#C3EBFA" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AttendanceChart