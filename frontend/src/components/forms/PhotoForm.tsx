import { IOption } from "@/interfaces/option.interface";
import { IGallery, IPhotoDto } from "@/services/gallery/gallery.interface";
import { ServiceService } from "@/services/service/service.service";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { SearchSelect } from "@/ui/inputs/SearchSelect/SearchSelect";
import { UploadInput } from "@/ui/inputs/UploadInput/UploadInput";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { FormButtons } from "./FormButtons";

interface PhotoFormProps {
    mutate: (data: IPhotoDto) => void
    serviceId?: number
}

export const PhotoForm: FC<PhotoFormProps> = ({mutate, serviceId}) => {
    const {
        handleSubmit, 
        control
    } = useForm<IGallery>({defaultValues: {serviceId}})

    const onSubmit: SubmitHandler<IGallery> = data => {
        data.photos.forEach(photo => {
            mutate({
                ...data,
                fileId: photo.id
            })
        })
    }

    const {data, isLoading, isError} = useQuery(["get services"], () => ServiceService.get(), {
        select: ({data}): IOption[] => data?.map(service => ({value: service.id, label: service.name}))
    })

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>
                Добавить фото
            </FormTitle>
            <Controller
                control={control}
                name="serviceId"
                rules={{required: true}}
                render={({field, fieldState}) => (
                    <SearchSelect 
                        label="Услуга"
                        value={field.value}
                        onChange={field.onChange}
                        onSearch={() => ({data, isLoading, isError})}
                        error={!!fieldState.error}/>
                )} />
            <Controller
                control={control}
                name="photos"
                rules={{required: true}}
                render={({field, fieldState}) => (
                    <UploadInput 
                        placeholder="Фото"
                        multiple
                        setValue={field.onChange}
                        error={!!fieldState.error}/>
                )}
                />
            <FormButtons isAdd={true}/>
        </Form>
    )
}