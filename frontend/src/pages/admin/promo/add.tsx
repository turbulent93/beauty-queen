import { PromoForm } from "@/components/forms/PromoForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IPromoDto } from "@/services/promo/promo.interface";
import { PromoService } from "@/services/promo/promo.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const Promo: NextPage = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation((data: IPromoDto) => PromoService.post(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get promos"])
            router.replace("/admin/promo")
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Добавить промо" permissions={PagePermissions.promoPage}>
            <PromoForm 
                mutate={(data) => mutation.mutate(data)} 
                title="Добавить промо" />
        </Layout>
    )
}

export default Promo