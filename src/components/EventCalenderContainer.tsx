import Image from "next/image"
import EventCalender from "./EventCalender"
import EventList from "./EventList"

const EventCalenderContainer = async ({ searchParams }: { searchParams: { [keys: string]: string | undefined } }) => {
    const { date } = searchParams;
    return (
        <div className='bg-white p-4 rounded-md'>
            <EventCalender />
            <div className='flex justify-between items-center'>
                <h1 className='text-lg my-4 font-semibold'>Events</h1>
                <Image src="/moreDark.png" alt='more icon' width={20} height={20} />
            </div>
            <div className='flex flex-col gap-4'>
                <EventList dateParam={date} />
            </div>
        </div>
    )
}

export default EventCalenderContainer