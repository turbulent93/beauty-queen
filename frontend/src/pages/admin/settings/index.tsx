import { AdminHeader } from "@/components/AdminHeader";
import { TimeSelector } from "@/components/calendar/TimeSelector";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { useSuccessToast, useErrorToast } from "@/hooks/useToast";
import { ISettings } from "@/services/settings/settings.interface";
import { SettingsService } from "@/services/settings/settings.service";
import { Button } from "@/ui/Button";
import { Error } from "@/ui/Error";
import { Input } from "@/ui/inputs/Input";
import { PhoneInput } from "@/ui/inputs/PhoneInput";
import { UploadInput } from "@/ui/inputs/UploadInput/UploadInput";
import { Loader } from "@/ui/Loader";
import { PagePermissions } from "@/utils/constants/pagePermissions";
import { NextPage } from "next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";

const SettingsPage: NextPage = () => {
    const {register, reset, control, handleSubmit, setValue, getValues, watch} = useForm<ISettings>()
    const queryClient = useQueryClient()

    const {isLoading, isError} = useQuery(["get settings"], () => SettingsService.get(), {
        select: ({data}) => data,
        onSuccess: (data) => {
            reset({...data})
        }
    })

    const {mutate} = useMutation((data: ISettings) => SettingsService.update(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get settings"])
            useSuccessToast()
        },
        onError: () => useErrorToast()
    })

    const onSubmit: SubmitHandler<ISettings> = (data) => {
        mutate(data)
    }

    if(isLoading) {
        return <Loader/>
    }

    if(isError) {
        return <Error/>
    }

    return (
        <Layout title="Настройки" permissions={PagePermissions.settingsPage}>
            <AdminHeader>
                Настройки
            </AdminHeader>
            <Container maxWidth={700}>
                <h2 className="text-[22px] my-3 text-gray-600 text-center">
                    Главный экран
                </h2>
                <Controller
                    control={control}
                    name="mainPhotoId"
                    render={({field, formState}) => (
                        <UploadInput 
                            placeholder="Фото"
                            setValue={field.onChange} 
                            error={!!formState.errors} />
                    )} />
                <Input 
                    {...register("mainTitle")}
                    placeholder="Заголовок"
                    label="Заголовок" />
                <Input 
                    {...register("mainTitle")}
                    placeholder="Описание"
                    label="Описание" />
                <Controller
                    control={control}
                    name="favicon"
                    render={({field, formState}) => (
                        <UploadInput 
                            placeholder="Фавикон"
                            setValue={field.onChange}
                            error={!!formState.errors} />
                    )} />
                <h2 className="text-[22px] my-3 text-gray-600 text-center">
                    Контактная информация
                </h2>
                <Controller
                    control={control}
                    name="phone"
                    render={({field}) => (
                        <PhoneInput 
                            phone={field.value}
                            setPhone={field.onChange}
                            placeholder="Телефон"
                            label="Телефон" />
                    )} />
                <Input 
                    {...register("mail")}
                    placeholder="Почта"
                    label="Почта" />
                <Input 
                    {...register("vk")}
                    placeholder="Вк"
                    label="Вк" />
                <Input 
                    {...register("address")}
                    placeholder="Адрес"
                    label="Адрес" />
                <h2 className="text-[22px] my-3 text-gray-600 text-center">
                    Время работы
                </h2>
                <Controller
                    control={control}
                    name="defaultStartWorkTime"
                    render={({field}) => (
                        <TimeSelector 
                            label="Время начала"
                            value={field.value}
                            onChange={field.onChange}
                            defaultStartAt={"8:00"} 
                            defaultEndAt={"23:00"} />
                    )} />
                <Controller
                    control={control}
                    name="defaultEndWorkTime"
                    render={({field}) => (
                        <TimeSelector 
                            label="Время окончания"
                            value={field.value}
                            onChange={field.onChange}
                            defaultStartAt={"8:00"} 
                            defaultEndAt={"23:00"} />
                    )} />
                <Button 
                    onClick={handleSubmit(onSubmit)} 
                    theme="gray"
                    className="w-full mb-3"
                >
                    Сохранить
                </Button>
            </Container>
        </Layout>
    )
}

export default SettingsPage