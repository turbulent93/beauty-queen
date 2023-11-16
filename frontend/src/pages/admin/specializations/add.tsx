import { SpecForm } from "@/components/forms/SpecForm";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { ISpec } from "@/services/spec/spec.interface";
import { SpecService } from "@/services/spec/spec.service";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const AddSpecializationPage: NextPage = () => {
    const queryClient = useQueryClient()
    const {back} = useRouter()

    const {mutate} = useMutation((data: ISpec) => SpecService.post(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get specs"])
            useSuccessToast()
            back()
        },
        onError: () => useErrorToast()
    })

    return (
        <Layout title="Добавить специализацию" permissions={PagePermissions.specializationsPage}>
            <SpecForm 
                mutate={(data: ISpec) => mutate(data)} 
                title="Добавить специализацию" />
        </Layout>
    )
}

export default AddSpecializationPage