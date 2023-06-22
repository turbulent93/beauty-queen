import { useImageMutation } from "@/hooks/useEmployeeImageMutation";
import { useFormData } from "@/hooks/useFormData";
import { useServicesQuery } from "@/hooks/useServicesQuery";
import { ImageService } from "@/services/image/image.service";
import { IPromoDto } from "@/services/promo/promo.interface";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/Input";
import { PercentInput } from "@/ui/PercentInput";
import { SearchSelect } from "@/ui/SearchSelect";
import { Textarea } from "@/ui/Textarea";
import { UploadInput } from "@/ui/UploadInput";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface PromoFormProps {
    defaultValues?: IPromoDto
    mutate: (data: IPromoDto) => void
    title: string
}

const PROMO_IMAGES_PATH = "http://localhost:7169/files/promo"

export const PromoForm: FC<PromoFormProps> = ({defaultValues, title, mutate}) => {
    const {register, handleSubmit, control, setValue, watch} = useForm<IPromoDto>({defaultValues})

    const imageMutation = useImageMutation(
        (value) => setValue("image", value as string),
        (image: FileList) => ImageService.uploadPromoImage(useFormData({image})))

    const removeImageMutation = useMutation((name: string) => ImageService.removePromoImage(name))

    const onSubmit: SubmitHandler<IPromoDto> = data => {
        mutate(data)
        console.log(data)
    }

    useEffect(() => {

    }, [watch("periodFrom")])

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>
                {title}
            </FormTitle>
            <Input 
                {...register("title")} 
                placeholder="Название" 
                label="Название"/>
            <Textarea 
                {...register("description")} 
                placeholder="Описание" 
                label="Описание"/>
            <Controller 
                control={control}
                name="discount"
                render={({field}) => (
                    <PercentInput 
                    percent={field.value} 
                    setPercent={field.onChange} 
                    label="Скидка"
                    placeholder="Скидка, %"/>
                )}/>
            <Controller
                control={control}
                name="serviceIds"
                render={({field}) => (
                    <SearchSelect 
                        onSearch={(search?: string) => useServicesQuery(search)}
                        value={field.value}
                        onChange={field.onChange}
                        label="Услуги"
                        placeholder="Услуги" 
                        multiple={true} />
                )}/>
            <div className="flex gap-2">
                <Input 
                    {...register("periodFrom")} 
                    placeholder="Дата начала" 
                    label="Дата начала" 
                    type="date"/>
                <Input 
                    {...register("periodTo")} 
                    placeholder="Дата окончания" 
                    label="Дата окончания" 
                    type="date"/>
            </div>
            <Controller 
                control={control}
                name="image"
                render={({field}) => (
                    <UploadInput 
                        path={PROMO_IMAGES_PATH} 
                        placeholder="Фото" 
                        upload={(files) => imageMutation.mutate(files)} 
                        remove={(name: string) => removeImageMutation.mutate(name)}
                        value={field.value} />
                )} />
            <Button theme="gray">
                Добавить
            </Button>
        </Form>
    )
}