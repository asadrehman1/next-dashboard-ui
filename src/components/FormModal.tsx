"use client";

import { deleteClass, deleteSubject } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const deleteActionMap = {
    subject: deleteSubject,
    class: deleteClass,
    teacher: deleteSubject,
    student: deleteSubject,
    exam: deleteSubject,
    // TODO: OTHER DELETE ACTIONS
    parent: deleteSubject,
    lesson: deleteSubject,
    assignment: deleteSubject,
    result: deleteSubject,
    attendance: deleteSubject,
    event: deleteSubject,
    announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
    loading: () => <h1>Loading...</h1>
})
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
    loading: () => <h1>Loading...</h1>
})
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
    loading: () => <h1>Loading...</h1>
})
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
    loading: () => <h1>Loading...</h1>
})

const forms: { [key: string]: (setOpen: Dispatch<SetStateAction<boolean>>, type: "create" | "update", data?: any, relatedData?: any) => JSX.Element } = {
    teacher: (setOpen, type, data, relatedData) => <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />,
    student: (setOpen, type, data, relatedData) => <StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />,
    subject: (setOpen, type, data, relatedData) => <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />,
    class: (setOpen, type, data, relatedData) => <ClassForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />,
}

const FormModal = ({ table, reqType, data, id, relatedData }: {
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
    id?: number | string
    relatedData?: any
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const Form = () => {
        const router = useRouter();
        const [state, formAction] = useFormState(deleteActionMap[table], { success: false, error: false });

        useEffect(() => {
            if (state.success) {
            toast(`${table.charAt(0).toUpperCase() + table.slice(1)} has been deleted`);
            setOpen(false);
            router.refresh();
            }
        }, [state, router])

        return reqType === "delete" && id ? (
            <form action={formAction} className="p-4 flex flex-col gap-4">
                <input type="text | number" name="id" value={id} hidden />
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this {table} ?</span>
                <div className="flex gap-2 items-center justify-center">
                    <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="bg-gray-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
                        Cancel
                    </button>
                </div>
            </form>
        ) : reqType === "create" || reqType === "update" ? (
            forms[table](setOpen, reqType, data, relatedData)
        ) : "Form not found"
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
                            onClick={() => setOpen(false)}
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