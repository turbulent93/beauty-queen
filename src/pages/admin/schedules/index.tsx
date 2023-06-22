import { AdminHeader } from "@/components/AdminHeader";
import { Calendar } from "@/components/calendar/Calendar";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useEmployeeQuery } from "@/hooks/useEmployeeQuery";
import { useAuth } from "@/providers/AuthProvider";
import { SearchSelect } from "@/ui/SearchSelect";
import { NextPage } from "next";
import { useState, useEffect } from "react"


const SchedulePage: NextPage = () => {
    const {user} = useAuth()
    const [employeeId, setEmployeeId] = useState<number>()

    useEffect(() => {
        // console.log("user in schedules", user)
        // console.log(employeeId)
        user?.role == "Сотрудник" && setEmployeeId(user?.userId)
    }, [user])


    return (
        <Layout title="Рабочие дни" role="Сотрудник">
            <Sidebar>
                {
                    user?.role == "Админ" && (
                        <AdminHeader>
                            <label className="mx-4 text-gray-600">
                                Сотрудник
                            </label>
                            <SearchSelect   
                                onSearch={() => useEmployeeQuery()}
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e)} 
                                className="w-[240px]"/>
                        </AdminHeader>
                    )
                }
                <div className="max-w-[800px] mx-auto select-none">
                    <Calendar 
                        employeeId={employeeId}
                        mode={user?.role == "Сотрудник" ? "master" : "admin"}/>
                </div>
        </Sidebar>
        </Layout>
    )
}

export default SchedulePage