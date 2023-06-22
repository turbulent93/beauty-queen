import { PromoForm } from "@/components/forms/PromoForm";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/useToast";
import { IPromoDto } from "@/services/promo/promo.interface";
import { PromoService } from "@/services/promo/promo.service";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const Promo: NextPage = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation((data: IPromoDto) => PromoService.post(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get promos"])
            useToast("Промо добавлено успешно", true)
            router.replace("/admin/promo")
        }
    })

    return (
        <Layout title="Добавить промо" role="Админ">
            <Sidebar>
                <PromoForm mutate={(data) => mutation.mutate(data)} title="Добавить промо"/>
            </Sidebar>
        </Layout>
    )
}

export default Promo