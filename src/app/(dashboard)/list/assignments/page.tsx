import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type AssignmentList = Assignment & {
    lesson: {
        subject: Subject,
        class: Class,
        teacher: Teacher
    }
}
const columns = [
    {
        header: "Subject Name",
        accessor: "subject"
    },
    {
        header: "Class",
        accessor: "class"
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header: "Due Date",
        accessor: "dueDate",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "action",
    },
]
const renderRow = (item: AssignmentList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-asadPurpleLite">
        <td className="flex items-center gap-4 p-4">
            <h3 className="font-semibold">{item.lesson.subject.name}</h3>
        </td>
        <td>{item.lesson.class.name}</td>
        <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname }</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>
        <td>
            <div className="flex items-center gap-2">
                {role === "admin" &&
                    <>
                        <FormModal table="assignment" reqType="update" data={item} />
                        <FormModal table="assignment" reqType="delete" id={item.id} />
                    </>
                }
            </div>
        </td>
    </tr>
);

const AssignmentsList = async ({ searchParams }: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION

    const query: Prisma.AssignmentWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "classId":
                        query.lesson = { classId: parseInt(value) }
                        break;
                    case "teacherId":
                        query.lesson = { teacherId: value }
                        break;
                    case "search":
                        query.lesson = {
                            subject: {
                                name: {contains: value, mode: "insensitive"}
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [assignmentsList, count] = await prisma.$transaction([
        prisma.assignment.findMany({
            where: query,
            include: {
               lesson: {
                select: {
                    subject: {select: { name: true}},
                    teacher: {select: { name: true, surname: true}},
                    class: {select: { name: true}},
                }
               }
            },
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (p - 1),

        }),
        prisma.assignment.count({ where: query })
    ]);

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-asadYellow">
                            <Image src="/filter.png" alt="filter icon" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-asadYellow">
                            <Image src="/sort.png" alt="filter icon" width={14} height={14} />
                        </button>
                        {role === "admin" && (
                           <FormModal table="assignment" reqType="create"/>
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={assignmentsList} />
            {/* PAGINATION */}
            <Pagination count={count} page={p}/>
        </div>
    )
}

export default AssignmentsList;