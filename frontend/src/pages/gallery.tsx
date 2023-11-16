import { Gallery } from "@/components/gallery/Gallery";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";

const GalleryPage: NextPage = () => {
    return (
        <Layout title="Галерея" description="Галерея">
            <div className="mt-3">
                <Gallery />    
            </div>
        </Layout>
    )
}

export default GalleryPage