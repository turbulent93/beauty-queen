import { AdminHeader } from "@/components/AdminHeader";
import { Calendar, ICalendarValue } from "@/components/calendar/Calendar";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useEmployeeQuery } from "@/hooks/useEmployeeQuery";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { ADMIN_ROLE_NAME } from "@/utils/constants/roleNames";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"

const SchedulePage: NextPage = () => {
    const {user} = useAuth()
    const [employeeId, setEmployeeId] = useState<number>()
    const [date, setDate] = useState<ICalendarValue>()
    const {query: {id}} = useRouter()

    useEffect(() => {
        if(id) {
            setEmployeeId(Number(id))
        }
    }, [])

    return (
        <Layout title="Рабочие дни" permissions={PagePermissions.schedulesPage}>
            <Container maxWidth={800}>
                <AdminHeader>
                    {
                        user?.role.name != ADMIN_ROLE_NAME ?
                        "Расписание" :
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
                <Calendar 
                    employeeId={employeeId} 
                    changeMode="change"
                    onChange={setDate}
                    value={date}/>
            </Container>
        </Layout>
    )
}

export default SchedulePage