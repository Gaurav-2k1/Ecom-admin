import { format } from "date-fns"
import React from 'react'
import prismadb from '@/lib/prismadb'
import { CategoriesColumn } from './components/columns'
import { CategoryClient } from "./components/client"

const CategoriesPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formatedcategories: CategoriesColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className='flex flex-col '>
            <div className='flex1 space-y-4 p-8 pt-6 '>
                <CategoryClient data={formatedcategories} />

            </div>
        </div>
    )
}

export default CategoriesPage