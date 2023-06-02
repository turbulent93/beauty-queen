import { ISpec, ISpecDto } from "@/services/spec/spec.interface";
import { SpecService } from "@/services/spec/spec.service";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Td } from "@/ui/table/Td";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

interface FormRowProps {
    spec: ISpec 
}

export const FormRow: FC<FormRowProps> = ({spec}) => {
    const [isEdited, setIsEdited] = useState(false)

    const {register, handleSubmit} = useForm<ISpec>({defaultValues: spec})

    const queryClient = useQueryClient()

    const removeMutation = useMutation((id: number) => SpecService.delete(id), {
        onSuccess: () => queryClient.invalidateQueries(["get specs"])
    })

    const updateMutation = useMutation((data: ISpec) => SpecService.update(data), {
        onSuccess: () => queryClient.invalidateQueries(["get specs"])
    })

    const handler: SubmitHandler<ISpec> = data => {
        if(isEdited) {
            updateMutation.mutate(data)
        }
        setIsEdited(!isEdited)
    }

    return (
        <tr key={spec.id}>
            <Td>
                {
                    isEdited ? (
                        <form>
                            <Input 
                                placeholder="Название специализации"
                                orientation="horizontal"
                                {...register("name")}/>
                        </form>
                    ):
                    spec.name
                }
            </Td>
            <Td>
                <Button className="mr-2" onClick={handleSubmit(handler)}>
                    {
                        isEdited ? "Сохранить" : "Изменить"
                    }
                </Button>
                <Button theme="red" onClick={() => removeMutation.mutate(spec.id)}>
                    Удалить
                </Button>
            </Td>
        </tr>
    )
}