import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { Announcement, Class, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getRole } from "@/lib/utils";

type AnnouncementList = Announcement & { class: Class }

const renderRow = async (item: AnnouncementList) => {
    const { role } = await getRole();
    return (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-asadPurpleLite">
            <td className="flex items-center gap-4 p-4">
                <h3 className="font-semibold">{item.title}</h3>
            </td>
            <td>{item.class?.name || "-"}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.date)}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" &&
                        <>
                            <FormModal table="announcement" reqType="update" data={item} />
                            <FormModal table="announcement" reqType="delete" id={item.id} />
                        </>
                    }
                </div>
            </td>
        </tr>
    );
}

const AnnouncementsList = async ({ searchParams }: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { role, userId } = await getRole();
    const columns = [
        {
            header: "Title",
            accessor: "title"
        },
        {
            header: "Class",
            accessor: "class"
        },
        {
            header: "Date",
            accessor: "date",
            className: "hidden md:table-cell"
        },
        ...(role === "admin" ? [{
            header: "Actions",
            accessor: "action",
        }] : []),
    ]

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION

    const query: Prisma.AnnouncementWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.title = { contains: value, mode: "insensitive" }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    // ROLE CONDITIONS
    const roleConditions = {
        teacher: { lessons: { some: { teacherId: userId! } } },
        student: { students: { some: { id: userId! } } },
        parent: { students: { some: { parentId: userId! } } },
    };

    query.OR = [
        { classId: null },
        { class: roleConditions[role as keyof typeof roleConditions] || {} }
    ]
    
    const [announcementsList, count] = await prisma.$transaction([
        prisma.announcement.findMany({
            where: query,
            include: {
                class: true
            },
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (p - 1),

        }),
        prisma.announcement.count({ where: query })
    ]);


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
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
                            <FormModal table="announcement" reqType="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={announcementsList} />
            {/* PAGINATION */}
            <Pagination count={count} page={p} />
        </div>
    )
}

export default AnnouncementsList;