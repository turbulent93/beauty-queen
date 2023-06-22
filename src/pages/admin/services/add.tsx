import { catchError } from "@/api/api.handler";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/useToast";
import { IService } from "@/services/service/service.interface";
import { ServiceService } from "@/services/service/service.service";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const AdminServices: NextPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation((data: IService) => ServiceService.post(data), {
        onSuccess: () => {
            useToast("Сервис добвален успешно", true)
            router.replace("/admin/services")
            queryClient.invalidateQueries(["get services"])
        },
        onError: (error: AxiosError) => useToast(catchError(error))
    })

    return (
        <Layout title="Услуги" role="Админ">
            <Sidebar>
                <ServiceForm 
                    mutate={data => mutation.mutate(data)} 
                    title="Добавить услугу" />
            </Sidebar>
        </Layout>
    )
}

export default AdminServices