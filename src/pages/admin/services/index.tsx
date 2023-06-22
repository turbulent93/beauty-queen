import { AdminHeader } from "@/components/AdminHeader";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { ServiceService } from "@/services/service/service.service";
import { Button } from "@/ui/Button";
import { Error } from "@/ui/Error";
import { Loader } from "@/ui/Loader";
import { Table } from "@/ui/table/Table";
import { TableContainer } from "@/ui/table/TableContainer";
import { Td } from "@/ui/table/Td";
import { Th } from "@/ui/table/Th";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Services: NextPage = () => {
    const queryclient = useQueryClient()
    const router = useRouter()

    const {data: services, isLoading, isError} = useQuery(
        ["get services"], 
        () => ServiceService.get(), {
            select: ({data}) => data
        })
    const deleteMutation = useMutation((id: number) => ServiceService.delete(id), {
        onSuccess: () => queryclient.invalidateQueries(["get services"])
    })

    useEffect(() => {
        console.log(services)
    }, [services])

    return (
        <Layout title="Услуги" role="Админ">
            <Sidebar>
                <AdminHeader className="mb-6">
                    <Button theme="light-gray" onClick={() => router.push("services/add")}>Добавить услугу</Button>
                </AdminHeader>
                <TableContainer>
                    {
                        isLoading ? <Loader className="mt-4"/> :
                        isError ? <Error /> :
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Название</Th>
                                    <Th>Цена</Th>
                                    <Th>Длительность</Th>
                                    <Th>Действие</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    services?.map(x => (
                                        <tr key={x.id}>
                                            <Td>
                                                {x.name}
                                            </Td>
                                            <Td>
                                                {x.price}
                                            </Td>
                                            <Td>
                                                {x.duration}
                                            </Td>
                                            <Td>
                                                <Button className="mr-2">
                                                    <Link href={`services/update/${x.id}`}>
                                                        Изменить
                                                    </Link>
                                                </Button>
                                                <Button theme="red" onClick={() => deleteMutation.mutate(x.id)}>Удалить</Button>
                                            </Td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    }
                </TableContainer>
            </Sidebar>
        </Layout>
    )
}

export default Services