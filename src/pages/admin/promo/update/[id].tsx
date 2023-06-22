import { PromoForm } from "@/components/forms/PromoForm";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/useToast";
import { IPromoDto } from "@/services/promo/promo.interface";
import { PromoService } from "@/services/promo/promo.service";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const UpdatePromo: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router
    const queryClient = useQueryClient()

    const {data} = useQuery(["get promo", id], () => PromoService.getById(Number(id)), {
        onError: () => useToast("Ошибка получения данных"),
        select: ({data}) => {
            return {
                serviceIds: data.services.map(x => x.id),
                ...data
            }
        }
    })

    const mutation = useMutation((data: IPromoDto) => PromoService.update(Number(id), data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get promos"])
            queryClient.invalidateQueries(["get promo", id])
            useToast("Пропо успешно обновлен", true)
            router.replace("/admin/promo")
        }
    })

    return (
        <Layout title="Обновить промо" role="Админ">
            <Sidebar>
                <PromoForm mutate={(data) => mutation.mutate(data)} title="Обновить промо" defaultValues={data}/>
            </Sidebar>
        </Layout>
    )
}

export default UpdatePromo