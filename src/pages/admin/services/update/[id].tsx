import { catchError } from "@/api/api.handler";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/useToast";
import { IService } from "@/services/service/service.interface";
import { ServiceService } from "@/services/service/service.service";
import { Error } from "@/ui/Error";
import { Loader } from "@/ui/Loader";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const UpdateService: NextPage = () => {
    const router = useRouter()
    const {query: {id}} = router
    const queryClient = useQueryClient()

    if(!id) {
        return <Error/>
    }

    const {data, isLoading, isError} = useQuery(["get service", id], () => ServiceService.getById(Number(id)), {
        select: ({data}) => data
    })
    const updateMutation = useMutation((data: IService) => ServiceService.update(data), {
        onSuccess: () => {
            useToast("Услуга обновлена", true)
            router.replace("/admin/services")
            queryClient.invalidateQueries(["get services"])
        },
        onError: (error: AxiosError) => useToast(catchError(error))
    })

    return (
        <Layout title="Изменить услугу">
            <Sidebar>
                {
                    isLoading ? <Loader/> :
                    isError ? <Error/> :
                    <ServiceForm 
                        title="Изменить услугу"
                        mutate={(data) => updateMutation.mutate(data)}
                        defaultValues={data}/>
                }
            </Sidebar>
        </Layout>
    )
}

export default UpdateService