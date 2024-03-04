'use client';

import { CustomButton } from "@/components/button/CustomButton";
import Container from "@/components/container/Container";
import CustomTable, { ColumnType } from "@/components/table/CustomTable";
import { ServiceDto, ServicesClient } from "@/generated/client";
import { nameof } from "@/utils/nameof";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

type EmployeeTest = {
    id: number,
    name: string,
    lastName: string,
}

const servicesClient = new ServicesClient(undefined, axios.create({
    baseURL: "http://localhost:7169",
    transformResponse: data => data // this line here
}))

const columns: ColumnType[] = [
    {
        column: "Id",
        name: nameof<ServiceDto>("id")
    },
    {
        column: "Название",
        name: nameof<ServiceDto>("name")
    },
    {
        column: "Цена",
        name: nameof<ServiceDto>("price")
    },
    {
        column: "Длительность",
        name: nameof<ServiceDto>("duration")
    },
]

export default function ServicesPage() {

    return (
        <Container width={900}>
            <CustomButton className="mb-4">
                <Link href="services/add">Добавить услугу</Link>
            </CustomButton>
            <CustomTable
                columns={columns}
                query={servicesClient.get}
            />
        </Container>
    );
}
