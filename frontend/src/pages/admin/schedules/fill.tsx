import { AdminHeader } from "@/components/AdminHeader";
import { FillSchedule } from "@/components/calendar/FillSchedule";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useEmployeeQuery } from "@/hooks/useEmployeeQuery";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { ADMIN_ROLE_NAME } from "@/utils/constants/roleNames";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"

const FillSchedulePage: NextPage = () => {
    const {employee, user} = useAuth()
    const [employeeId, setEmployeeId] = useState<number>()
    const {query: {id}} = useRouter()

    useEffect(() => {
        if(employee) {
            setEmployeeId(employee.id)
        }
    }, [employee])

    useEffect(() => {
        if(id)
            setEmployeeId(Number(id))
    }, [])

    return (
        <Layout title="Заполнить расписание" permissions={PagePermissions.fillSchedulePage}>
            <AdminHeader>
            {
                    user?.role.name != ADMIN_ROLE_NAME ?
                    "Заполнить расписание" :
                    (
                        <>
                            <label className="text-gray-600">
                                Сотрудник
                            </label>
                            <SearchSelect   
                                onSearch={() => useEmployeeQuery()}
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e)} 
                                className="max-w-[240px] w-full" />
                        </>
                    )
                }
            </AdminHeader>
            <FillSchedule 
                employeeId={employeeId} />
        </Layout>
    )
}

export default FillSchedulePage