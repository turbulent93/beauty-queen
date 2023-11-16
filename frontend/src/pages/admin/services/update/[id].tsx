import { ServiceForm } from "@/components/forms/ServiceForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IService } from "@/services/service/service.interface";
import { ServiceService } from "@/services/service/service.service";
import { Error } from "@/ui/Error";
import { PagePermissions } from "@/utils/constants/pagePermissions";
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
            router.replace("/admin/services")
            queryClient.invalidateQueries(["get services"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Изменить услугу" permissions={PagePermissions.servicesPage}>
            {
                <ServiceForm 
                    isLoading={isLoading}
                    isError={isError}
                    title="Изменить услугу"
                    mutate={(data) => updateMutation.mutate(data)}
                    defaultValues={data}/>
            }
        </Layout>
    )
}

export default UpdateService