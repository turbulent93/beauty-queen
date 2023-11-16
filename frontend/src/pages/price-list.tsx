import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { PriceList } from "@/components/lists/PriceList";
import { IService } from "@/services/service/service.interface";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useState } from "react"
import { useDebounce } from "@/hooks/useDebounce";
import { ServiceService } from "@/services/service/service.service";
import { Search } from "@/ui/Search";

const PriceListPage: NextPage = () => {
    const router = useRouter()
    const handler = (service: IService) => {
        router.replace({pathname: "/appointment", query: {serviceId: service.id, duration: service.duration}})
    }

    const [search, setSearch] = useState("")
    const debounce = useDebounce(search)

    const {data: services} = useQuery(["get services", debounce], () => ServiceService.get(search), {
        select: ({data}) => data
    })

    return (
        <Layout title="Прайс" description="Прайс">
            <Container>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    placeholder="Поиск по названию.." 
                    className="my-6 w-[300px]"/>
                <PriceList 
                    enableHide={false} 
                    handler={handler} 
                    services={services} />
            </Container>
        </Layout>
    )
}

export default PriceListPage