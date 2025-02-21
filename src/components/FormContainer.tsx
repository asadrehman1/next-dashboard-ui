import { prisma } from "@/lib/prisma"
import FormModal from "./FormModal"

const FormContainer = async ({ table, reqType, data, id }: {
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
}) => {

    let relatedData = {};

    if (reqType !== "delete") {
        switch (table) {
            case "subject":
                const subjectTeachers = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true }
                })
                relatedData = { teachers: subjectTeachers }
                break;
            case "class":
                const classGrades = await prisma.grade.findMany({
                    select: { id: true, level: true }
                })
                const classTeachers = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true }
                })
                relatedData = { teachers: classTeachers, grades: classGrades }
                break;
            default:
                break;
        }
    }

    return (
        <FormModal table={table} reqType={reqType} data={data} id={id} relatedData={relatedData} />
    )
}

export default FormContainer