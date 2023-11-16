import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { SpecService } from "@/services/spec/spec.service";
import { Button } from "@/ui/Button";
import { ActionButtons } from "@/ui/table/ActionButtons";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const SpecsPage: NextPage = () => {
    const queryClient = useQueryClient()
    const {push} = useRouter()
    const [selectedId, setSelectedId] = useState<number>()

    const {data, isLoading, isError} = useQuery(["get specs"], () => SpecService.get(), {
        select: ({data}) => data
    })

    const {mutate} = useMutation((id: number) => SpecService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get specs"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Специализации" permissions={PagePermissions.specializationsPage}>
            <Container>
                <AdminHeader>
                    <Button onClick={() => push("specializations/add")}>
                        Добавить специализацию
                    </Button>
                </AdminHeader>
                <Table
                    colNames={["Название", "Действие"]}
                    isLoading={isLoading}
                    isError={isError}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    modalHandler={mutate}
                >
                    {
                        data?.map(spec => (
                            <tr key={spec.id}>
                                <Td>
                                    {spec.name}
                                </Td>
                                <ActionButtons 
                                    updateUrl={`specializations/update/${spec.id}`} 
                                    deleteHandler={() => setSelectedId(spec.id)} />
                            </tr>
                        ))
                    }
                </Table>
            </Container>
        </Layout>
    )
}

export default SpecsPage