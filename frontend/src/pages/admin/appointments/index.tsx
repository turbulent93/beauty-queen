import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { AdminHeader } from "@/components/AdminHeader";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { useEmployeeQuery } from "@/hooks/useEmployeeQuery";
import { useState, useEffect } from "react"
import { Table } from "@/ui/table/Table";
import { useMutation, useQueryClient } from "react-query";
import { useAppsQuery } from "@/hooks/useAppsQuery";
import { Td } from "@/ui/table/Td";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuth } from "@/hooks/useAuth";
import { ADMIN_ROLE_NAME } from "@/utils/constants/roleNames";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { AppService } from "@/services/app/app.service";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { Button } from "@/ui/Button";
import { DateInput } from "@/ui/inputs/DateInput";
import { ICalendarValue } from "@/components/calendar/Calendar";
import { Container } from "@/components/Container";
import moment from "moment";

const compareDates = (date1: Date, date2: Date) => {
    return date1.getFullYear() == date2.getFullYear() && 
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate()
}

const getCurrentDate = (date: Date) => {
    const currentDate = new Date()

    if(compareDates(currentDate, date)) {
        return "Сегодня"
    }
    currentDate.setDate(currentDate.getDate() + 1)

    if(compareDates(currentDate, date)) {
        return "Завтра"
    } else {
        return moment(date).format("YYYY-MM-DD")
    } 
}

const isDone = (date: Date, endAt: string) => {
    // const curDate = new Date()
    // const parsedTime = parsePeriod(endAt)

    // date.setHours(parsedTime.hours)
    // date.setMinutes(parsedTime.minutes)

    return false
}

const AdminAppointments: NextPage = () => {
    const {employee, user} = useAuth()
    const [employeeId, setEmployeeId] = useState<number>()
    const [selectedId, setSelectedId] = useState<number>()
    const [calendarValue, setCalendarValue] = useState<ICalendarValue>()

    const queryClient = useQueryClient()

    const {data: apps, isLoading: isAppsLoading, isError: isAppsError} = useAppsQuery(employeeId, calendarValue?.scheduleId)

    const {mutate} = useMutation((id: number) => AppService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get apps", employeeId, calendarValue?.scheduleId])
            useSuccessToast()
        },
        onError: () => {
            useErrorToast()
        }
    })

    useEffect(() => {
        if(employee) {
            setEmployeeId(employee.id)
        }
    }, [employee])

    return (
        <Layout title="Записи" permissions={PagePermissions.appointmentsPage}>
            <Container>
                <AdminHeader>
                    {
                        user?.role.name == ADMIN_ROLE_NAME && (
                            <>
                                <label className="text-gray-600">
                                    Сотрудник
                                </label>
                                <SearchSelect 
                                    className="max-w-[240px] w-full"
                                    value={employeeId}
                                    onChange={setEmployeeId}
                                    onSearch={() => useEmployeeQuery()} />
                            </>
                        )
                    }
                    <label className="text-gray-600">
                        Дата
                    </label>
                    <DateInput 
                        value={calendarValue}
                        onChange={setCalendarValue}
                        halving={false}
                        className="w-full max-w-[240px]"/>
                </AdminHeader>
                <Table
                    colNames={["Дата", "Время", "Услуга", "Цена", "Промо", ""]}
                    isLoading={isAppsLoading}
                    isError={isAppsError}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    modalHandler={mutate}
                >
                    {
                        apps?.map(app => (
                            <tr key={app.id}>
                                <Td className="text-center">
                                    {getCurrentDate(new Date(app.date))}
                                </Td>
                                <Td className="text-center">
                                    {app.startAt + " - " + app.endAt}
                                </Td>
                                <Td className="text-center">
                                    {app.service}
                                </Td>
                                <Td className="text-center">
                                    {
                                        `${app.discountedPrice}${
                                            app.discount != null ? ("(-" + app.discount + ")") : ""
                                        }`
                                    }
                                </Td>
                                <Td className="text-center">
                                    {app.promo || "-"}
                                </Td>
                                <Td className="w-3">
                                    {
                                        isDone(new Date(app.date), app.endAt) ? (
                                            <div className="flex">
                                                <div className="bg-green-300 rounded-full p-2 ml-4 text-white">
                                                    <AiOutlineCheck size={16}/>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button theme="red" onClick={() => setSelectedId(app.id)}>
                                                Удалить
                                            </Button>
                                        )
                                    }
                                </Td>
                            </tr>
                        ))
                    }
                </Table>
            </Container>
        </Layout>
    )
}

export default AdminAppointments