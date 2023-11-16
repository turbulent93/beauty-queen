import { AdminHeader } from "@/components/AdminHeader"
import { Container } from "@/components/Container"
import { Layout } from "@/components/Layout"
import { useErrorToast, useSuccessToast } from "@/hooks/useToast"
import { PromoService } from "@/services/promo/promo.service"
import { Button } from "@/ui/Button"
import { ActionButtons } from "@/ui/table/ActionButtons"
import { RoundedImage } from "@/ui/table/RoundedImage"
import { Table } from "@/ui/table/Table"
import { Td } from "@/ui/table/Td"
import { PagePermissions } from "@/utils/constants/pagePermissions"
import { TOAST_ERROR_MESSAGE, TOAST_SUCCESS_MESSAGE } from "@/utils/constants/toastMessages"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"

const PROMO_IMAGES_URL = process.env.PROMO_IMAGES_URL

const Promos: NextPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [selectedId, setSelectedId] = useState<number>()

    const {data: promos, isLoading, isError} = useQuery(["get promos"], () => PromoService.get(), {
        select: ({data}) => data,
    })

    const {mutate} = useMutation((id: number) => PromoService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get promos"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Спец предложения" permissions={PagePermissions.promoPage}>
            <Container>
                <AdminHeader>
                    <Button onClick={() => router.push("promo/add")}>
                        Добавить новое
                    </Button>
                </AdminHeader>
                <Table 
                    colNames={["", "Название", "Описание", "Скидка", "Дата проведения", "Действие"]}
                    isLoading={isLoading} 
                    isError={isError}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    modalHandler={mutate}
                >
                    {
                        promos?.map(promo => (
                            <tr key={promo.id}>
                                <RoundedImage 
                                    src={`${PROMO_IMAGES_URL}/${promo.image}`}/>
                                <Td className="">
                                    {
                                        promo.title
                                    }
                                </Td>
                                <Td className="whitespace-pre-wrap text-center min-w-[300px]">
                                    {
                                        promo.description
                                    }
                                </Td>
                                <Td>
                                    {
                                        promo.discount + promo.unit.name
                                    }
                                </Td>
                                <Td>
                                    {
                                        promo.periodFrom + " - " + promo.periodTo 
                                    }
                                </Td>
                                <ActionButtons 
                                    updateUrl={`promo/update/${promo.id}`}
                                    deleteHandler={() => setSelectedId(promo.id)}/>
                            </tr>
                        ))
                    }
                </Table>
            </Container>
        </Layout>
    )
}

export default Promos