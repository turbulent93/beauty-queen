import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import { StatisticsService } from "@/services/statistics/statistics.service";
import { Button } from "@/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { Line } from "react-chartjs-2"
import { DateInput } from "@/ui/inputs/DateInput";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { useEmployeeQuery } from "@/hooks/useEmployeeQuery";
import { IStatisticsDto } from "@/services/statistics/statistics.interface";
import { useAuth } from "@/hooks/useAuth";
import { ADMIN_ROLE_NAME } from "@/utils/constants/roleNames";
import clsx from "clsx";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const variants = [
    {
        title: "Выручка",
        func: StatisticsService.getRevenueStatistics
    },
    {
        title: "Клиенты",
        func: StatisticsService.getUsersStatistics
    }
]

const AdminStatistics: NextPage = () => {
    const [currentVariant, setCurrentVariant] = useState(variants[0])
    const {watch, getValues, control} = useForm<IStatisticsDto>()
    const {user} = useAuth()

    const {data} = useQuery(
        ["get statistics", currentVariant.title, watch("startDate"), watch("endDate")], 
        () => currentVariant.func(getValues("startDate"), getValues("endDate")), {
        select: ({data}) => {
            return {
                labels: data.labels,
                datasets: [
                    {
                        data: data.values,
                        label: currentVariant.title,
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                        fill: false,
                    }
                ]
            }
        }
    })
    
    return (
        <Layout title="Статистика" permissions={PagePermissions.statisticsPage}>
            <AdminHeader>
                Статистика
            </AdminHeader>
            <Container>
                <div className="max-w-[600px] mx-auto">
                    <div className="flex min-[360px]:flex-row flex-col gap-3 min-[360px]:items-center">
                        {
                            user?.role.name == ADMIN_ROLE_NAME && (
                                <Controller
                                    control={control}
                                    name="employeeId"
                                    render={({field}) => (
                                        <SearchSelect 
                                            className="min-[360px]:w-[50%]"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onSearch={useEmployeeQuery}
                                            placeholder="Мастер" />
                                    )} />
                            )
                        }
                        <div className={clsx("flex gap-3 h-8 overflow-x-auto scrollbar-hidden", user?.role.name == ADMIN_ROLE_NAME && "min-[360px]:w-[50%]")}>
                            {
                                variants.map(variant => (
                                    <Button 
                                        key={variant.title}
                                        onClick={() => setCurrentVariant(variant)} 
                                        theme={variant == currentVariant ? "gray" : "light-gray"}>
                                        {
                                            variant.title
                                        }
                                    </Button>
                                ))
                            }
                        </div>

                    </div>
                    <div className="mt-4">
                        <Controller
                            control={control}
                            name="startDate"
                            render={({field}) => (
                                <DateInput
                                    value={{date: field.value}}
                                    onChange={value => field.onChange(value?.date)}
                                    label="Дата начала" 
                                    endDate={watch("endDate")} />
                            )}/>
                        <Controller
                            control={control}
                            name="endDate"
                            render={({field}) => (
                                <DateInput
                                    value={{date: field.value}}
                                    onChange={value => field.onChange(value?.date)}
                                    label="Дата окончания" 
                                    startDate={watch("startDate")}/>
                            )}/>
                    </div>
                </div>
                {
                    data && (
                        <div className="w-full overflow-x-auto">
                            <div 
                                style={{
                                    width: 70 * data.labels.length < window?.innerWidth - (window?.innerWidth > 640 ? 80 : 0) - 16 * 2 ? 
                                        window?.innerWidth - (window?.innerWidth > 640 ? 80 : 0) - 16 * 2 : 
                                        70 * data.labels.length, 
                                    height: 400, 
                                    marginRight: "auto", 
                                    marginLeft: "auto"
                                }}
                            >
                                <Line 
                                    data={data} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            title: {
                                                display: true,
                                            }
                                        }
                                    }} />
                            </div>
                        </div>
                    )
                }
            </Container>
        </Layout>
    )
}

export default AdminStatistics