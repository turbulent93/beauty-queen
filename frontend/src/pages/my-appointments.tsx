import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { IAppointment } from "@/services/app/app.interface";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { getDiscountedPrice } from "@/utils/services/getDiscountedPrice";
import { NextPage } from "next";
import { useEffect, useState } from "react"

const GalleryPage: NextPage = () => {
    const [appointments, setAppointments] = useState<IAppointment[]>()

    useEffect(() => {
        const storagedAppointments = localStorage.getItem("bq-appointments")
        const appointments: IAppointment[] = storagedAppointments ? JSON.parse(storagedAppointments) : []

        setAppointments(appointments)
    }, [])

    return (
        <Layout title="Мои записи" description="Мои записи">
            <Container className="mt-8">
                <Table
                    colNames={["Дата", "Время", "Мастер", "Услуга", "Стоимость"]}
                >
                    {
                        appointments?.map(x => (
                            <tr key={x.id}>
                                <Td>
                                    {x.schedule.date}
                                </Td>
                                <Td>
                                    {x.startAt + " - " + x.endAt}
                                </Td>
                                <Td>
                                    {x.employee.name}
                                </Td>
                                <Td>
                                    {x.service.name}
                                </Td>
                                <Td>
                                    {
                                        getDiscountedPrice(x.service.price, x?.promotion?.discount, x?.promotion?.unit?.name)
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

export default GalleryPage