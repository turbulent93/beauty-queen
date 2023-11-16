import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { ServiceService } from "@/services/service/service.service";
import { Button } from "@/ui/Button";
import { ActionButtons } from "@/ui/table/ActionButtons";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Services: NextPage = () => {
    const queryclient = useQueryClient()
    const router = useRouter()
    const [selectedId, setSelectedId] = useState<number>()

    const {data: services, isLoading, isError} = useQuery(
        ["get services"], 
        () => ServiceService.get(), {
            select: ({data}) => data
        })
    const {mutate} = useMutation((id: number) => ServiceService.delete(id), {
        onSuccess: () => {
            queryclient.invalidateQueries(["get services"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Услуги" permissions={PagePermissions.servicesPage}>
            <Container>
                <AdminHeader>
                    <Button theme="light-gray" onClick={() => router.push("services/add")}>Добавить услугу</Button>
                </AdminHeader>
                <Table 
                    colNames={["Название", "Цена", "Длительность", "Действие"]}
                    isLoading={isLoading}
                    isError={isError}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    modalHandler={mutate}
                >
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
                                <ActionButtons 
                                    updateUrl={`services/update/${x.id}`} 
                                    deleteHandler={() => setSelectedId(x.id)} />
                            </tr>
                        ))
                    }
                </Table>
            </Container>
        </Layout>
    )
}

export default Services