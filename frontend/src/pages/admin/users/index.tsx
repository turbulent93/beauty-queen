import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { UserService } from "@/services/user/user.service";
import { Button } from "@/ui/Button";
import { ActionButtons } from "@/ui/table/ActionButtons";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const index: NextPage = () => {
    const queryClient = useQueryClient()
    const [selectedId, setSelectedId] = useState<number>()

    const {data, isLoading, isError} = useQuery(["get users"], () => UserService.get(), {
        select: ({data}) => data
    })
    const {mutate} = useMutation((id: number) => UserService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get users"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Статистика" permissions={PagePermissions.statisticsPage}>
            <Container>
                <AdminHeader>
                    <Button>
                        <Link href="users/add">
                            Добавить пользователя
                        </Link>
                    </Button>
                </AdminHeader>
                <Table 
                    colNames={["Логин", "Роль", "Действие"]}
                    isLoading={isLoading} 
                    isError={isError}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    modalHandler={mutate}
                >
                    {
                        data?.map(user => (
                            <tr key={user.id}>
                                <Td>
                                    {user.login}
                                </Td>
                                <Td>
                                    {user.role.name}
                                </Td>
                                <ActionButtons
                                    updateUrl={`users/update/${user.id}`}
                                    deleteHandler={() => setSelectedId(user.id)} 
                                    removeButtonDisabed={user.id == 1} />
                            </tr>
                        ))
                    }
                </Table>
            </Container>
        </Layout>
    )
}

export default index