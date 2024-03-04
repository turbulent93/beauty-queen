import { PaginationRequest, ServiceDto, ServicesClient } from "@/generated/client";
import { TableColumn, TableHeader, TableRow, Table, TableBody, TableCell, Spinner, getKeyValue, Pagination } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

export type ColumnType = {
    column: string,
    name: string
}

type PaginationResponse = {
    totalPages: number;
    totalCount: number;
    list: any[];
};

type CustomTableProps = {
    columns: ColumnType[],
    query: (request: PaginationRequest) => Promise<PaginationResponse>
    // data: Record<string, any>[]
}

const services = new ServicesClient(undefined, axios.create({
    baseURL: "http://localhost:7169",
    transformResponse: data => data
}))

export default function CustomTable({columns, query}: CustomTableProps) {
    const [page, setPage] = useState<number>(1)
    const {data, isLoading} = useQuery(
        ["get services", page],
        () => services.get({page: page, size: 10}),
        {
            select: (res) => res
        }
    )

    return (
        <Table
            aria-label="table"
            bottomContent={
                data && data.totalPages > 0 ? (
                    <div className="">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={data?.totalPages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                    ) : null
            }
        >
            <TableHeader>
                {columns.map((column) =>
                    <TableColumn key={column.name}>{column.column}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={data?.list ?? []}
                loadingContent={<Spinner />}
                loadingState={isLoading ? "loading" : "idle"}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
  