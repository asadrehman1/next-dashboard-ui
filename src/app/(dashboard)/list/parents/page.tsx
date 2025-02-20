import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Prisma, Student } from "@prisma/client";
import Image from "next/image";
import { Parent } from "@prisma/client";
import { getRole } from "@/lib/utils";

type ParentList = Parent & {students: Student[]};

const renderRow = async (item: ParentList) => {
    const {role} = await getRole();
    return (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-asadPurpleLite">
        <td className="flex items-center gap-4 p-4">
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-xs text-gray-500">{item?.email}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.students.map(student=>student.name).join(',')}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden lg:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                {role === "admin" &&
                    <>
                        <FormModal table="parent" reqType="update" data={item} />
                        <FormModal table="parent" reqType="delete" id={item.id} />
                    </>
                }
            </div>
        </td>
    </tr>
)
};

const ParentsList = async ({ searchParams }: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { role } = await getRole();
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1; 
    const columns = [
        {
            header: "Info",
            accessor: "info"
        },
        {
            header: "Student Names",
            accessor: "students",
            className: "hidden md:table-cell"
        },
        {
            header: "Phone",
            accessor: "phone",
            className: "hidden md:table-cell"
        },
        {
            header: "Address",
            accessor: "address",
            className: "hidden lg:table-cell"
        },
        ...(role === "admin" ? [
            {
                header: "Actions",
                accessor: "action",
            },
        ]:[])
    ]

    // URL PARAMS CONDITION
    
      const query: Prisma.ParentWhereInput = {};
    
      if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
          if(value !== undefined){
            switch (key) {
              case "search": 
                query.name={contains: value, mode: "insensitive"}
                break;
            }
          }
        }
      }
    
      const [parentList,count] = await prisma.$transaction([
        prisma.parent.findMany({
          where: query,
          include: {
            students: true
          },
          take: ITEMS_PER_PAGE,
          skip: ITEMS_PER_PAGE * (p - 1),
    
        }),
        prisma.parent.count({where: query})
      ]);

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
                            <FormModal table="parent" reqType="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={parentList} />
            {/* PAGINATION */}
            <Pagination count={count} page={p}/>
        </div>
    )
}

export default ParentsList;