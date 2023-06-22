import { AdminHeader } from "@/components/AdminHeader"
import { Layout } from "@/components/Layout"
import { Sidebar } from "@/components/Sidebar"
import { PromoService } from "@/services/promo/promo.service"
import { Button } from "@/ui/Button"
import { Table } from "@/ui/table/Table"
import { Td } from "@/ui/table/Td"
import { Th } from "@/ui/table/Th"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "react-query"

const PROMO_IMAGES_URL = "http://localhost:7169/files/promo"

const Promos: NextPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const {data: promos} = useQuery(["get promos"], () => PromoService.get(), {
        select: ({data}) => data,
        onSuccess: (data) => console.log(data)
    })

    const deleteMutation = useMutation((id: number) => PromoService.delete(id), {
        onSuccess: () => queryClient.invalidateQueries(["get promos"])
    })

    return (
        <Layout title="Спец предложения" role="Админ">
            <Sidebar>
                <AdminHeader>
                    <Button onClick={() => router.push("promo/add")}>
                        Добавить новое
                    </Button>
                </AdminHeader>
                <Table className="mt-4">
                    <tbody>
                        {
                            promos?.map(promo => (
                                <tr key={promo.id}>
                                    <Td className="w-44">
                                        <img src={`${PROMO_IMAGES_URL}/${promo.image}`} className="object-cover"/>
                                    </Td>
                                    <Td className="text-[24px] font-medium">
                                        {
                                            promo.title
                                        }
                                    </Td>
                                    <Td className="whitespace-pre-wrap">
                                        {
                                            promo.description
                                        }
                                    </Td>
                                    <Td>
                                        {
                                            promo.discount + "%"
                                        }
                                    </Td>
                                    <Td>
                                        {
                                            promo.periodFrom + " - " + promo.periodTo 
                                        }
                                    </Td>
                                    <Td>
                                        <Button className="mb-auto ml-auto mr-2">
                                            <Link href={`promo/update/${promo.id}`}>
                                                Изменить
                                            </Link>
                                        </Button>
                                        <Button 
                                            className="mb-auto"
                                            theme="red"
                                            onClick={() => deleteMutation.mutate(promo.id)}
                                            >Удалить</Button>
                                    </Td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Sidebar>
        </Layout>
    )
}

export default Promos