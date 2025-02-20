import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Prisma, Teacher } from "@prisma/client";
import Image from "next/image";
import { Class } from "@prisma/client";
import { getRole } from "@/lib/utils";

type ClassList = Class & {supervisor: Teacher};

const renderRow = async (item: ClassList) => {
    const {role} = await getRole();
    return (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-asadPurpleLite">
        <td className="flex items-center gap-4 p-4">
            <h3 className="font-semibold">{item.name}</h3>
        </td>
        <td className="hidden md:table-cell">{item.capacity}</td>
        <td className="hidden md:table-cell">{item.name[0]}</td>
        <td className="hidden md:table-cell">{item.supervisor.name + " " + item.supervisor.surname}</td>
        <td>
            <div className="flex items-center gap-2">
                {role === "admin" &&
                    <>
                        <FormModal table="class" reqType="update" data={item} />
                        <FormModal table="class" reqType="delete" id={item.id} />
                    </>
                }
            </div>
        </td>
    </tr>
)};
const ClassesList = async ({ searchParams }: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const {role} = await getRole();
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1; 

    const columns = [
        {
            header: "Class Name",
            accessor: "name"
        },
        {
            header: "Capacity",
            accessor: "capacity",
            className: "hidden md:table-cell"
        },
        {
            header: "Grade",
            accessor: "grade",
            className: "hidden md:table-cell"
        },
        {
            header: "Supervisor",
            accessor: "supervisor",
            className: "hidden md:table-cell"
        },
        ...(role === "admin" ? [
            {
                header: "Actions",
                accessor: "action",
            },
        ]: [])
    ]

    // URL PARAMS CONDITION
    
      const query: Prisma.ClassWhereInput = {};
    
      if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
          if(value !== undefined){
            switch (key) {
             case "supervisorId": 
                query.supervisorId = value
                break;
              case "search": 
                query.name={contains: value, mode: "insensitive"}
                break;
              default:
                break;
            }
          }
        }
      }
    
      const [classesList,count] = await prisma.$transaction([
        prisma.class.findMany({
          where: query,
          include: {
            supervisor: true
          },
          take: ITEMS_PER_PAGE,
          skip: ITEMS_PER_PAGE * (p - 1),
    
        }),
        prisma.class.count({where: query})
      ]);


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
                            <FormModal table="class" reqType="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={classesList} />
            {/* PAGINATION */}
            <Pagination count={count} page={p}/>
        </div>
    )
}

export default ClassesList;