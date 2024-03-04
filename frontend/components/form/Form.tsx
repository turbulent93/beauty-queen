'use client';

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CustomButton } from "../button/CustomButton";
import Container from "../container/Container";

type FormProps = {
  onSubmit: (data: any) => void,
  children: React.ReactNode,
}

export default function Form({children, onSubmit}:  FormProps) {
  const methods = useForm();

  return (
    <Container>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-3 mt-3 w-[500px] mx-auto"
        >
          {children}
          <CustomButton type="submit">
            Отправить
          </CustomButton>
        </form>
      </FormProvider>
    </Container>
  );
}
