import { PromoForm } from "@/components/forms/PromoForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IPromoDto } from "@/services/promo/promo.interface";
import { PromoService } from "@/services/promo/promo.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const UpdatePromo: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router
    const queryClient = useQueryClient()

    const {data} = useQuery(["get promo", id], () => PromoService.getById(Number(id)), {
        select: ({data}) => {
            return {
                ...data,
                unitId: data.unit.id,
                serviceIds: data.services.map(service => service.id)
            } as IPromoDto
        }
    })

    const mutation = useMutation((data: IPromoDto) => PromoService.update(Number(id), data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get promos"])
            queryClient.invalidateQueries(["get promo", id])
            router.replace("/admin/promo")
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Обновить промо" permissions={PagePermissions.promoPage}>
            <PromoForm 
                mutate={(data) => mutation.mutate(data)} 
                title="Обновить промо" 
                defaultValues={data} />
        </Layout>
    )
}

export default UpdatePromo