import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { IMeta } from "@/services/meta/meta.interface";
import { MetaService } from "@/services/meta/meta.service";
import { Button } from "@/ui/Button";
import { Error } from "@/ui/Error";
import { Input } from "@/ui/inputs/Input";
import { Loader } from "@/ui/Loader";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

const MetaPage: NextPage = () => {
    const {register, reset, handleSubmit} = useForm<IMeta>()
    const queryClient = useQueryClient()

    const {isLoading, isError} = useQuery(["get meta"], () => MetaService.get(), {
        select: ({data}) => data,
        onSuccess: (data) => {
            reset({...data})
        }
    })

    const {mutate} = useMutation((data: IMeta) => MetaService.update(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get meta"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    const onSubmit: SubmitHandler<IMeta> = data => {
        mutate(data)
    }

    if(isLoading) {
        return <Loader />
    }

    if(isError) {
        return <Error />
    }

    return (
        <Layout title="Мета" permissions={PagePermissions.metaPage}>
            <AdminHeader>
                Мета
            </AdminHeader>
            <Container maxWidth={700}>
                <Input 
                    {...register("title")}
                    placeholder="Title"
                    label="Title"/>
                <Input 
                    {...register("description")}
                    placeholder="Description"
                    label="Description"/>
                <Button 
                    onClick={handleSubmit(onSubmit)} 
                    theme="gray"
                    className="w-full"
                >
                    Сохранить
                </Button>
            </Container>
        </Layout>
    )
}

export default MetaPage