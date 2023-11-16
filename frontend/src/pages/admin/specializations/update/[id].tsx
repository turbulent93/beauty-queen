import { SpecForm } from "@/components/forms/SpecForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { ISpec } from "@/services/spec/spec.interface";
import { SpecService } from "@/services/spec/spec.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

const UpdateSpecializationPage: NextPage = () => {
    const {query: {id}, back} = useRouter()
    const queryClient = useQueryClient()

    const {data, isLoading, isError} = useQuery(["get spec", id], () => SpecService.getById(Number(id)), {
        onSuccess: () => queryClient.invalidateQueries(["get specs"]),
        select: ({data}) => data
    })

    const {mutate} = useMutation((data: ISpec) => SpecService.update(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get specs"])
            queryClient.invalidateQueries(["get spec", id])
            useSuccessToast()
            back()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Изменить специализацию" permissions={PagePermissions.specializationsPage}>
            <SpecForm
                defaultValues={data}
                mutate={(data: ISpec) => mutate(data)}
                title="Изменить специализацию"
                isLoading={isLoading}
                isError={isError} />
        </Layout>
    )
}

export default UpdateSpecializationPage