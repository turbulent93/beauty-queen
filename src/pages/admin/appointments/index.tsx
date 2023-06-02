import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { AdminHeader } from "@/components/AdminHeader";
import { SearchSelect } from "@/ui/SearchSelect";
import { useEmployeeQuery } from "@/hooks/useEmployeeQuery";
import { useState } from "react"
import { Table } from "@/ui/table/Table";
import { Th } from "@/ui/table/Th";
import { useQuery } from "react-query";
import { ScheduleService } from "@/services/schedule/schedule.service";
import { IOption } from "@/interfaces/option.interface";
import { dateOnlyConverter } from "@/utils/dateOnlyConverter";
import { useAppsQuery } from "@/hooks/useAppsQuery";
import { Td } from "@/ui/table/Td";
import { AiOutlineCheck } from "react-icons/ai";
import { Loader } from "@/ui/Loader";
import { Error } from "@/ui/Error";
import { parsePeriod } from "@/utils/calendar/timepicker/parsePeriod";

const getCurrentDate = (date: Date) => {
    date.setHours(0, 0, 0, 0)
    const currentDate = new Date(),
        diff = Math.abs(currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24,
        dateDiff = currentDate.getDate() - date.getDate()

    if(diff < 1 && dateDiff == 0) {
        return "Сегодня"
    } else if(diff < 1 && dateDiff != 0) {
        return "Завтра"
    } else {
        return dateOnlyConverter(date)
    } 
}

const isDone = (date: Date, endAt: string) => {
    const curDate = new Date()
    const parsedTime = parsePeriod(endAt)

    date.setHours(parsedTime.hours)
    date.setMinutes(parsedTime.minutes)

    return curDate > date
}

const AdminAppointments: NextPage = () => {
    const [employeeId, setEmployeeId] = useState<number>()
    const [scheduleId, setScheduleId] = useState<number>()
    
    const {data, isLoading, isError} = useQuery(
        ["get schedules", employeeId],
        () => ScheduleService.get(employeeId), {
            enabled: !!employeeId,
            select: ({data}): IOption[] => data?.map(x => ({value: x.id, label: getCurrentDate(new Date(x.date))}))
        })

    const {data: apps, isLoading: isAppsLoading, isError: isAppsError} = useAppsQuery(employeeId, scheduleId)

    return (
        <Layout title="Записи">
            <Sidebar>
                <AdminHeader className="mb-4">
                    <label className="mx-4 text-gray-600">
                        Сотрудник
                    </label>
                    <SearchSelect 
                        className="w-[240px] mr-4"
                        value={employeeId}
                        onChange={setEmployeeId}
                        onSearch={() => useEmployeeQuery()}/>
                    <label className="mx-4 text-gray-600">
                        День
                    </label>
                    <SearchSelect 
                        className="w-[240px]"
                        value={scheduleId}
                        onChange={setScheduleId}
                        onSearch={() => ({data, isLoading, isError})}/>
                </AdminHeader>
                {
                    isAppsLoading ? <Loader/> :
                    isAppsError ? <Error/> :
                    <Table>
                        <thead>
                            <tr>
                                <Th className="text-center">
                                    День
                                </Th>
                                <Th className="text-center">
                                    Время
                                </Th>
                                <Th className="text-center">
                                    Услуга
                                </Th>
                                <Th className="text-center">
                                    Стоимость
                                </Th>
                                <Th></Th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                apps?.map(app => (
                                    <tr key={app.id}>
                                        <Td className="text-center">
                                            {getCurrentDate(new Date(app.schedule.date))}
                                        </Td>
                                        <Td className="text-center">
                                            {app.startAt + " - " + app.endAt}
                                        </Td>
                                        <Td className="text-center">
                                            {app.service.name}
                                        </Td>
                                        <Td className="text-center">
                                            {app.service.price + " руб"}
                                        </Td>
                                        <Td className="w-3">
                                            {
                                                isDone(new Date(app.schedule.date), app.endAt) && (
                                                    <div className="flex">
                                                        <div className="bg-green-300 rounded-full p-2 ml-4 text-gray-500">
                                                            <AiOutlineCheck size={16}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                }
            </Sidebar>
        </Layout>
    )
}

export default AdminAppointments