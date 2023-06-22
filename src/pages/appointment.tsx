import { AppProgress } from "@/components/appointment/AppProgress";
import { ChooseEmployee } from "@/components/appointment/ChooseEmployee";
import { ChooseNumber } from "@/components/appointment/ChoosePhone";
import { ChooseService } from "@/components/appointment/ChooseService";
import { Calendar } from "@/components/calendar/Calendar";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { setEmployeeId, setService } from "@/store/appointment.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/ui/Button";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCheck, AiOutlinePhone, AiOutlineSchedule, AiOutlineUser } from "react-icons/ai";
import { BsScissors } from "react-icons/bs";
import { FaCogs } from "react-icons/fa";

const Appointment: NextPage = () => {
    const [step, setStep] = useState(1)
    const app = useAppSelector(store => store.appointment.appointment)
    const dispatch = useAppDispatch()
    const {query} = useRouter()

    const disabled = (step == 1 && !app.serviceId) ||
        (step == 2 && !app.employeeId) ||
        (step == 3 && !app.startAt && !app.endAt)

    const goBack = () => {
        setStep(step - 1)
    }

    const goNext = () => {
        setStep(step + 1)
    }

    useEffect(() => {
        if(query.employeeId) {
            dispatch(setEmployeeId(Number(query.employeeId)))
        } else if(query.serviceId && query.duration) {
            dispatch(setService({
                id: Number(query.serviceId), 
                duration: Number(query.duration)
            }))
            setStep(2)
        }
    }, [])

    return (
        <Layout title="Запись" description="Appointment">
            <Container>
                <AppProgress
                    serviceSelected={!!app.serviceId}
                    employeeSelected={!!app.employeeId}
                    dateSelected={!!app.startAt}
                    phoneSelected={!!app.phone}/>
                {
                    step == 1 ? (
                        <ChooseService 
                            goNext={goNext} 
                            promoId={Number(query.promoId)} />
                    ) :
                    step == 2 ? (
                        <ChooseEmployee goNext={goNext}/>
                    ) :
                    step == 3 ? (
                        <Calendar />
                    ) :
                    step == 4 && (
                        <ChooseNumber goBack={goBack}/>
                    )
                }
                {
                    step != 4 && (
                        <div className="mx-auto mt-6 w-[340px] flex">
                            {
                                step == 1 ? (
                                    <Button 
                                        className="mr-3 w-full" 
                                        theme="gray"
                                        ><Link href="/">На главную</Link></Button>
                                ) :
                                <Button 
                                    className="mr-3 w-full" 
                                    theme="gray"
                                    onClick={goBack}
                                    >Назад</Button>
                            }
                            <Button 
                                className="w-full" 
                                theme="gray"
                                onClick={() => goNext()}
                                disabled={disabled}
                                >Далее</Button>
                        </div>
                    )
                }
            </Container>
        </Layout>
    )
}

export default Appointment