import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { useDebounce } from "@/hooks/useDebounce";
import { useImageMutation } from "@/hooks/useEmployeeImageMutation";
import { useFormData } from "@/hooks/useFormData";
import { IOption } from "@/interfaces/option.interface";
import { IGallery, IPhotoDto } from "@/services/gallery/gallery.interface";
import { GalleryService } from "@/services/gallery/gallery.service";
import { ServiceService } from "@/services/service/service.service";
import { ISpec } from "@/services/spec/spec.interface";
import { WorksService } from "@/services/works/works.service";
import { Button } from "@/ui/Button";
import { Error } from "@/ui/Error";
import { Form } from "@/ui/Form";
import { FormTitle } from "@/ui/FormTitle";
import { Input } from "@/ui/Input";
import { SearchSelect } from "@/ui/SearchSelect";
import { UploadInput } from "@/ui/UploadInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

interface PhotoFormProps {
    mutate: (data: IPhotoDto) => void
    serviceId?: number
}

const GALLERY_IMAGES_URL = process.env.GALLERY_IMAGES_URL || ""

export const PhotoForm: FC<PhotoFormProps> = ({mutate, serviceId}) => {
    const router = useRouter()

    const {handleSubmit, control, register, setValue, getValues, reset} = useForm<IGallery>(serviceId ? {defaultValues: {serviceId}} : {})

    const onSubmit: SubmitHandler<IGallery> = data => {
        data.photos.forEach(photo => {
            mutate({
                ...data,
                source: photo
            })
        })
    }

    const uploadMutation = useImageMutation(
        (image) => {
            getValues("photos")?.forEach(photo => {
                removeMutation.mutate(photo)
            })
            setValue("photos", image as string[])
        },
        (images) => GalleryService.uploadPhoto(useFormData({images}))
    )

    const {data, isLoading, isError} = useQuery(["get services"], () => ServiceService.get(), {
        select: ({data}): IOption[] => data?.map(service => ({value: service.id, label: service.name}))
    })

    const removeMutation = useMutation((source: string) => GalleryService.removePhoto(source))

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>
                Добавить фото
            </FormTitle>
            <Input 
                {...register("title")}
                label="Название работы"
                placeholder="Название работы"/>
            <Controller
                control={control}
                name="serviceId"
                render={({field}) => (
                    <SearchSelect 
                        label="Услуга"
                        value={field.value}
                        onChange={field.onChange}
                        onSearch={() => ({data, isLoading, isError})}/>
                )} />
            <Controller
                control={control}
                name="photos"
                render={({field}) => (
                    <UploadInput 
                        placeholder="Фото"
                        multiple
                        upload={(image) => uploadMutation.mutate(image)}
                        value={field.value}
                        path={GALLERY_IMAGES_URL}
                        remove={(value) => {
                            reset({
                                ...getValues(),
                                photos: getValues("photos")?.filter(photo => photo != value)
                            })
                            removeMutation.mutate(value)
                        }}/>
                )}
                />
            <div className="flex">
                <Button theme="gray" className="w-full mr-2">
                    Добавить
                </Button>
                <Button theme="gray" className="w-full" onClick={e => {
                    e?.preventDefault()
                    router.replace("/admin/gallery")
                }}>
                    Назад
                </Button>
            </div>
        </Form>
    )
}