import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { prisma } from "@/lib/prisma";
import { getRole } from "@/lib/utils";

const ParentPage = async () => {
    const {userId} = await getRole();

    const students = await prisma.student.findMany({
        where: {
            parentId: userId!
        },
        include: {
            class: true,
        },
    });
    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
                    <BigCalendarContainer type="classId" id={students[0]?.class?.id}/>
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    )
}

export default ParentPage;
