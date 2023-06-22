import { Gallery } from "@/components/gallery/Gallery";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";

const GalleryPage: NextPage = () => {
    return (
        <Layout title="Галерея" description="Галерея">
            <Gallery />
        </Layout>
    )
}

export default GalleryPage