import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { FormRow } from "@/components/forms/FormRow";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { ISpecDto } from "@/services/spec/spec.interface";
import { SpecService } from "@/services/spec/spec.service";
import { Button } from "@/ui/Button";
import { Error } from "@/ui/Error";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/Input";
import { Loader } from "@/ui/Loader";
import { Table } from "@/ui/table/Table";
import { Td } from "@/ui/table/Td";
import { Th } from "@/ui/table/Th";
import { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

const SpecsPage: NextPage = () => {
    const queryClient = useQueryClient()

    const {data, isLoading, isError} = useQuery(["get specs"], () => SpecService.get(), {
        select: ({data}) => data
    })

    const addMutation = useMutation((data: ISpecDto) => SpecService.post(data), {
        onSuccess: () => queryClient.invalidateQueries(["get specs"])
    })

    const {handleSubmit, register, reset} = useForm<ISpecDto>()

    const onSubmit: SubmitHandler<ISpecDto> = data => {
        addMutation.mutate(data)
        reset()
    }

    return (
        <Layout title="Специализации" role="Админ">
            <Sidebar>
                <AdminHeader>
                    Специализации
                </AdminHeader>
                <Form onSubmit={handleSubmit(onSubmit)} orientation="horizontal" className="mb-3">
                    <Input 
                        {...register("name")}
                        label="Добавить новую" 
                        placeholder="Специализация" 
                        orientation="horizontal"/>
                    <Button className="ml-4" theme="gray">
                        Добавить
                    </Button>
                </Form>
                {
                    isLoading ? <Loader className="mt-6"/> :
                    isError ? <Error className="mt-6"/> : (
                        <Table container={600}>
                            <thead>
                                <tr>
                                    <Th className="w-1/2">
                                        Название
                                    </Th>
                                    <Th className="w-1/2">
                                        Действие
                                    </Th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map(spec => (
                                        <FormRow spec={spec} key={spec.id}/>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }
            </Sidebar>
        </Layout>
    )
}

export default SpecsPage