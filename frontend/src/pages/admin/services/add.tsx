import { ServiceForm } from "@/components/forms/ServiceForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IService } from "@/services/service/service.interface";
import { ServiceService } from "@/services/service/service.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const AdminServices: NextPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation((data: IService) => ServiceService.post(data), {
        onSuccess: () => {
            router.replace("/admin/services")
            queryClient.invalidateQueries(["get services"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Услуги" permissions={PagePermissions.servicesPage}>
            <ServiceForm 
                mutate={data => mutation.mutate(data)} 
                title="Добавить услугу" />
        </Layout>
    )
}

export default AdminServices