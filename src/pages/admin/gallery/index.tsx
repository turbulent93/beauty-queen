import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { Sidebar } from "@/components/Sidebar";
import { AdminHeader } from "@/components/AdminHeader";
import { Container } from "@/components/Container";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ServiceService } from "@/services/service/service.service";
import { useEffect, useState } from "react"
import clsx from "clsx";
import { Loader } from "@/ui/Loader";
import { GalleryService } from "@/services/gallery/gallery.service";
import { Button } from "@/ui/Button";
import { IService } from "@/services/service/service.interface";
import Link from "next/link";
import { IPhoto } from "@/services/gallery/gallery.interface";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ServiceSelect } from "@/components/gallery/ServiceSelect";
import { PhotosList } from "@/components/gallery/PhotosList";
import { Search } from "@/ui/Search";
import { useDebounce } from "@/hooks/useDebounce";
import { Gallery } from "@/components/gallery/Gallery";

// const GALLERY_IMAGES_URL = "https://localhost:7169/files/gallery"

const AdminGallery: NextPage = () => {    
    return (
        <Layout title="Галерея" role="Сотрудник">
            <Sidebar>
                <AdminHeader>Галерея</AdminHeader>
                <Gallery mode="admin"/>
            </Sidebar>
        </Layout>
    )
}

export default AdminGallery