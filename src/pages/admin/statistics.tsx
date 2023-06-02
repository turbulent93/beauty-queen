import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { NextPage } from "next";

const AdminStatistics: NextPage = () => {
    return (
        <Layout title="Статистика">
            <Sidebar>
                Statistics
            </Sidebar>
        </Layout>
    )
}

export default AdminStatistics