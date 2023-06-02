import { FC, useEffect } from "react";
import { useServicesQuery } from "@/hooks/useServicesQuery";
import { useSpecializationsQuery } from "@/hooks/useSpecializationsQuery";
import { IEmployee } from "@/services/employee/employee.interface";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/Input";
import { SearchSelect } from "@/ui/SearchSelect";
import { UploadInput } from "@/ui/UploadInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useUsersQuery } from "@/hooks/useUsersQuery";
// import { useImageMutation } from "@/hooks/useImageMutation";
import { FormTitle } from "@/ui/FormTitle";
import { useRouter } from "next/router";
import { EmployeeService } from "@/services/employee/employee.service";
import { ImageService } from "@/services/image/image.service";
import { useFormData } from "@/hooks/useFormData";
import { useImageMutation } from "@/hooks/useEmployeeImageMutation";
import { useMutation } from "react-query";

interface EmployeeFormProps {
    defaultValues?: IEmployee,
    mutate: (data: IEmployee) => void,
    title: string
}

export const EmployeeForm: FC<EmployeeFormProps> = ({mutate, defaultValues, title}) => {
    const { register, control, handleSubmit, setValue } = useForm<IEmployee>(defaultValues ? {defaultValues} : {})
    const imageMutation = useImageMutation(
        (image) => setValue("image", image as string),
        (image: FileList) => ImageService.uploadEmployeeImage(useFormData({image}))
    )
    const router = useRouter()

    const onSubmit: SubmitHandler<IEmployee> = data => {
        mutate(data)
        router.back()
        console.log(data)
    }

    const removeImage = useMutation((name: string) => ImageService.removeImage(name))

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>
                {title}
            </FormTitle>   
            <Controller 
                control={control} 
                name="userId" 
                render={({field}) => (
                    <SearchSelect
                        label="Пользователь"
                        onChange={field.onChange}
                        value={field.value}
                        onSearch={search => useUsersQuery(search)} />
            )} />
            <Input 
                label="Имя"
                placeholder="Имя"
                {...register("name")}/>
            <Input  
                label="Фамилия"
                placeholder="Фамилия"
                {...register("surname")}/>
            <Controller 
                control={control}
                name="specializationId"
                render={({field}) => (
                    <SearchSelect   
                        label="Специализация"
                        value={field.value}
                        onChange={field.onChange} 
                        onSearch={search => useSpecializationsQuery(search)}/>
                )}/>
            <Controller 
                control={control}
                name="serviceIds"
                render={({field}) => (
                    <SearchSelect 
                        label="Сервис"
                        multiple
                        value={field.value}
                        onChange={field.onChange} 
                        defaultValue={defaultValues?.serviceIds}
                        onSearch={search => useServicesQuery(search)}/>
                )}/>
            <Controller
                control={control}
                name="image"
                render={({field}) => (
                    <UploadInput 
                        placeholder="Image" 
                        value={field.value}
                        upload={(image) => imageMutation.mutate(image)}
                        path={process.env.EMPLOYEES_IMAGES_URL || ""}
                        remove={(name: string) => removeImage.mutate(name)}/>
                )}/>
            <div className="mt-6 flex">
                <Button 
                    className="mr-3 w-full" 
                    theme="gray"
                    >Добавить</Button>
                <Button 
                    className="w-full" 
                    theme="gray"
                    onClick={e => {
                        e?.preventDefault()
                        router.back()
                    }}
                    >Назад</Button>
            </div>
        </Form>
    )
}