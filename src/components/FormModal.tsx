"use client";

import Image from "next/image";

const FormModal = ({table, reqType, data, id}:{
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
  const size = reqType === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = reqType === "create" ? "bg-asadYellow" : reqType === "update" ? "bg-asadSky" : "bg-asadPurple";
  return (
    <>
        <button className={`${size} ${bgColor} flex items-center justify-center rounded-full`}>
            <Image src={`/${reqType}.png`} alt="" width={16} height={16}/>
        </button>
    </>
  )
}

export default FormModal