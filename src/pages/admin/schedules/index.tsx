import { AdminHeader } from "@/components/AdminHeader";
import { Calendar } from "@/components/calendar/Calendar";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useEmployeeQuery } from "@/hooks/useEmployeeQuery";
import { SearchSelect } from "@/ui/SearchSelect";
import { NextPage } from "next";
import { useState } from "react"


const SchedulePage: NextPage = () => {
    const [employeeId, setEmployeeId] = useState<number>()

    return (
        <Layout title="Рабочие дни">
            <Sidebar>
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
                <div className="max-w-[800px] mx-auto select-none">
                    <Calendar 
                        employeeId={employeeId}
                        mode="admin"/>
                </div>
        </Sidebar>
        </Layout>
    )
}

export default SchedulePage