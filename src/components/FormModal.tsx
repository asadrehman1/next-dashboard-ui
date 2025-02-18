"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
    loading: () => <h1>Loading...</h1>
})
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
    loading: () => <h1>Loading...</h1>
})

const forms:{[key:string]: (type: "create" | "update", data?:any) => JSX.Element} = {
    teacher: (type, data) => <TeacherForm type={type} data={data}/>,
    student: (type, data) => <StudentForm type={type} data={data}/>,
}

const FormModal = ({ table, reqType, data, id }: {
    table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement"
    reqType: "create" | "update" | "delete"
    data?: any
    id?: number
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const Form = () => {
        return reqType === "delete" && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this {table} ?</span>
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
            </form>
        ): reqType === "create" || reqType === "update" ? (
            forms[table](reqType,data)
        ): "Form not found"
    }

    const size = reqType === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = reqType === "create" ? "bg-asadYellow" : reqType === "update" ? "bg-asadSky" : "bg-asadPurple";

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
            >
                <Image src={`/${reqType}.png`} alt="" width={16} height={16} />
            </button>
            {open &&
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-4 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form />
                        <div 
                            onClick={()=> setOpen(false)}
                            className="absolute top-4 right-4 cursor-pointer">
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FormModal