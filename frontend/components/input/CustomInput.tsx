import {extendVariants, Input} from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export const CustomizedInput = extendVariants(Input, {
    variants: {
        size: {
            // sm: "rounded-medium px-10 py-1"
            sm: {
                base: "rounded-medium",
            }
        },
    },
    defaultVariants: {
        size: "sm",
    }
});

type InputProps = {
    label?: string,
    name: string
}

export default function CustomInput(props: InputProps) {
    const {register} = useFormContext();

    return <CustomizedInput
        {...props}
        {...register(props.name)}
    />
}
