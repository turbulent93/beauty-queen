'use client';

import Appointer from "@/components/appointer/Appointer";
import Container from "@/components/container/Container";
import CustomFileInput from "@/components/fileInput/CustomFileInput";
import Form from "@/components/form/Form";
import CustomInput from "@/components/input/CustomInput";
import CustomSelect from "@/components/select/CustomSelect";
import { nameof } from "@/utils/nameof";
import { Input } from "@nextui-org/react";
import dayjs from "dayjs";
import { useState } from "react";

type EmployeeTest = {
  name: string,
  lastName: string,
}

export default function Page() {
	const [value, setValue] = useState<string>(dayjs(new Date()).format("YYYY-MM-DD"));
	const minDate = "2023-02-07";
	const maxDate = "2025-7-09"

	return (
		<Container>
			{/* <Input /> */}
			current date: {value}
			start: {minDate}
			end: {maxDate}
			<Appointer
				value={value}
				setValue={setValue}
				startDate={minDate}
				endDate={maxDate}
			/>
		</Container>
	);
}
