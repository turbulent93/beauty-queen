'use client';

import Container from "@/components/container/Container";
import CustomFileInput from "@/components/fileInput/CustomFileInput";
import Form from "@/components/form/Form";
import CustomInput from "@/components/input/CustomInput";
import CustomSelect from "@/components/select/CustomSelect";
import { nameof } from "@/utils/nameof";

type EmployeeTest = {
  name: string,
  lastName: string,
  specializationId: number,
  serviceIds: number[],
  imageId: number,
}

export default function EmployeesPage() {

  const animals = [
    {
      value: 1,
      label: 'label 1'
    },
    {
      value: 2,
      label: 'label 2'
    },
    {
      value: 3,
      label: 'label 3'
    },
  ]

  return (
    <Container>
      <Form onSubmit={(data) => console.log(data)}>
          <CustomInput
            label="Имя"
            name={nameof<EmployeeTest>("name")}
          />
          <CustomInput
            label="Фамилия"
            name={nameof<EmployeeTest>("lastName")}
          />
          <CustomSelect
            items={animals}
            label="Специализация"
            name={nameof<EmployeeTest>("specializationId")}
          />
          <CustomSelect
            items={animals}
            label="Сервисы"
            name={nameof<EmployeeTest>("serviceIds")}
            selectionMode="multiple"
          />
          {/* <CustomFileInput
            name={nameof<EmployeeTest>("imageId")}
          /> */}
      </Form>
    </Container>
  );
}
