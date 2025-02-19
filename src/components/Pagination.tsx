"use client";
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { useRouter } from "next/navigation"

const Pagination = ({
  page,
  count
}:{
  page: number
  count: number
}) => {
  const router = useRouter();
  
  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  }

  return (
    <div className="p-4 flex justify-between text-gray-500 items-center">
        <button disabled={!hasPrev} onClick={() => changePage(page - 1)} className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
            Prev
        </button>
        <div className="flex items-center text-sm gap-2">
          {Array.from({length: Math.ceil(count/ITEMS_PER_PAGE)}, (_,index) => {
            const pageIndex = index + 1;
            return (
              <button onClick={() => changePage(pageIndex)} key={pageIndex} className={`px-2 rounded-sm bg-asadSky ${page === pageIndex ? "bg-asadSky" :  "bg-transparent"}`}>
                {pageIndex}
              </button>
            )
          })}
        </div>
        <button disabled={!hasNext} onClick={() => changePage(page + 1)} className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
            Next
        </button>
    </div>
  )
}

export default Pagination