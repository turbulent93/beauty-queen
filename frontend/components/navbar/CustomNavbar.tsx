'use client';

import { Navbar } from "flowbite-react";
import { CustomButton } from "../button/CustomButton";
import Link from "next/link";

export default function CustomNavbar() {
  return (
    <Navbar className="">
        <Navbar.Brand as={Link} href="#">
            <img src="/bq.jpeg" className="mr-3 h-12 rounded-md" alt="" />
            <span className="self-center whitespace-nowrap text-xl dark:text-white">
                Королева красоты
            </span>
        </Navbar.Brand>
        <CustomButton>
            Button
        </CustomButton>
    </Navbar>
  );
}
