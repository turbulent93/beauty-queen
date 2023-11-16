import { AppProgress } from "@/components/appointment/appProgress/AppProgress";
import { ChooseEmployee } from "@/components/appointment/ChooseEmployee";
import { ChooseNumber } from "@/components/appointment/ChoosePhone";
import { ChooseService } from "@/components/appointment/ChooseService";
import { Calendar, ICalendarValue } from "@/components/calendar/Calendar";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react"
import { IAppointmentDto } from "@/services/app/app.interface";
import { AppNav } from "@/components/appointment/AppNav";
import { useRouter } from "next/router";

export type IAppointmentFormConext = IAppointmentDto & {
    duration?: number
    step: number
    date?: string
}

const Appointment: NextPage = () => {
    const methods = useForm<IAppointmentFormConext>({
        defaultValues: {
            step: 1
        }
    })

    const {query: {promoId, serviceId, employeeId}} = useRouter()
    const step = methods.watch("step")

    const calendarHandler = (value?: ICalendarValue) => {
        methods.reset({
            ...methods.getValues(),
            scheduleId: value?.scheduleId,
            startAt: value?.startAt,
            endAt: value?.endAt,
            date: value?.date
        })
    }

    useEffect(() => {
        if(promoId) 
            methods.setValue("promoId", Number(promoId))
        if(serviceId)
            methods.setValue("serviceId", Number(serviceId))
        if(employeeId)
            methods.setValue("employeeId", Number(employeeId))
    }, [])

    return (
        <Layout title="Запись" description="Appointment">
            <Container>
                <FormProvider {...methods}>
                    <AppProgress />
                    {
                        step == 1 ? (
                            <ChooseService />
                        ) :
                        step == 2 ? (
                            <ChooseEmployee />
                        ) :
                        step == 3 ? (
                            <Calendar 
                                employeeId={methods.watch("employeeId")} 
                                onChange={calendarHandler}
                                value={{
                                    scheduleId: methods.watch("scheduleId"),
                                    startAt: methods.watch("startAt"),
                                    endAt: methods.watch("endAt"),
                                    date: methods.watch("date")
                                }}
                                duration={methods.watch("duration")}
                                changeMode="app"/>
                        ) :
                        step == 4 && (
                            <ChooseNumber />
                        )
                    }
                    <AppNav />
                </FormProvider>
            </Container>
        </Layout>
    )
}

export default Appointment