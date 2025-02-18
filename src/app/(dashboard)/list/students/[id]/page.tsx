import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"
import FormModal from "@/components/FormModal"
import PerformanceChart from "@/components/PerformanceChart"
import Image from "next/image"
import Link from "next/link"

const StudentDetailsPage = () => {
    return (
        <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                {/* TOP */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* TEACHER INFO CARD */}
                    <div className="bg-asadSky py-6 px-4 rounded-md flex-1 flex gap-4 min-w-0">
                        <div className="w-1/3">
                            <Image
                                src="/avatar.png"
                                alt="User image"
                                width={144}
                                height={144}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col gap-4 justify-between">
                            <div className="flex items-center gap-4 justify-between">
                                <h1 className="text-xl font-semibold">Cameron Moran</h1>
                                <FormModal table="student" reqType="update" data={""} />
                            </div>
                            <p className="text-sm text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                                <div className="flex gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3 items-center">
                                    <Image src="/blood.png" alt="blood icon" width={14} height={14} />
                                    <span>A+</span>
                                </div>
                                <div className="flex gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3 items-center">
                                    <Image src="/date.png" alt="date icon" width={14} height={14} />
                                    <span>February 2025</span>
                                </div>
                                <div className="flex gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3 items-center">
                                    <Image src="/mail.png" alt="mail icon" width={14} height={14} />
                                    <span>user@gmail.com</span>
                                </div>
                                <div className="flex gap-2 w-full md:w-1/3 lg:w-full 2xl:w-1/3 items-center overflow-hidden">
                                    <Image src="/phone.png" alt="phone icon" width={14} height={14} />
                                    <span className="truncate">+923009658098</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SHORTCUTS CARD */}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        <div className="w-full bg-white rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleAttendance.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-400">Attendance</span>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleBranch.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">6th</h1>
                                <span className="text-sm text-gray-400">Grade</span>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleLesson.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">18</h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-md flex gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image
                                src="/singleClass.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">6A</h1>
                                <span className="text-sm text-gray-400">Class</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* BOTTOM */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1>Student&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray 500">
                        <Link href="/" className="p-3 rounded-md bg-asadSkyLite">Student&apos;s Lessons</Link>
                        <Link href="/" className="p-3 rounded-md bg-asadPurpleLite">Student&apos;s Teachers</Link>
                        <Link href="/" className="p-3 rounded-md bg-pink-50">Student&apos;s Exams</Link>
                        <Link href="/" className="p-3 rounded-md bg-asadSkyLite">Student&apos;s Assignments</Link>
                        <Link href="/" className="p-3 rounded-md bg-asadYellowLite">Student&apos;s Results</Link>
                    </div>
                </div>
                <PerformanceChart />
                <Announcements />
            </div>
        </div>
    )
}

export default StudentDetailsPage;