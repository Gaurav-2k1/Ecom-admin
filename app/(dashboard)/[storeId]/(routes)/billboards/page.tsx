import { format } from "date-fns"
import React from 'react'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'
import { BillboardClient } from "./components/client"

const BillboardsPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const billboard = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formatedBillboards: BillboardColumn[] = billboard.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className='flex flex-col '>
            <div className='flex1 space-y-4 p-8 pt-6 '>
                <BillboardClient data={formatedBillboards} />

            </div>
        </div>
    )
}

export default BillboardsPage