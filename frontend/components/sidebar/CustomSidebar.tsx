'use client';

import { Sidebar } from "flowbite-react";
import { HiUser } from 'react-icons/hi';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { routes } from "./routes";

const customTheme: CustomFlowbiteTheme['sidebar'] = {
  "root": {
    "base": "h-screen border-r-1",
    "collapsed": {
      "on": "w-16",
      "off": "w-64"
    },
    "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800"
  },
  "collapse": {
    "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    "icon": {
      "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "open": {
        "off": "",
        "on": "text-gray-900"
      }
    },
    "label": {
      "base": "ml-3 flex-1 whitespace-nowrap text-left",
      "icon": {
        "base": "h-6 w-6 transition ease-in-out delay-0",
        "open": {
          "on": "rotate-180",
          "off": ""
        }
      }
    },
    "list": "space-y-2 py-2"
  },
  "cta": {
    "base": "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
    "color": {
      "blue": "bg-cyan-50 dark:bg-cyan-900",
      "dark": "bg-red-400",
      "failure": "bg-red-50 dark:bg-red-900",
      "gray": "bg-alternative-50 dark:bg-alternative-900",
      "green": "bg-green-50 dark:bg-green-900",
      "light": "bg-light-50 dark:bg-light-900",
      "red": "bg-red-50 dark:bg-red-900",
      "purple": "bg-purple-50 dark:bg-purple-900",
      "success": "bg-green-50 dark:bg-green-900",
      "yellow": "bg-yellow-50 dark:bg-yellow-900",
      "warning": "bg-yellow-50 dark:bg-yellow-900"
    }
  },
  "item": {
    "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    "active": "bg-gray-100 dark:bg-gray-700",
    "collapsed": {
      "insideCollapse": "group w-full pl-8 transition duration-75",
      "noIcon": "font-bold"
    },
    "content": {
      "base": "px-3 flex-1 whitespace-nowrap"
    },
    "icon": {
      "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      "active": "text-gray-700 dark:text-gray-100"
    },
    "label": "",
    "listItem": ""
  },
  "items": {
    "base": ""
  },
  "itemGroup": {
    "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
  },
  "logo": {
    "base": "mb-5 flex items-center",
    "collapsed": {
      "on": "hidden",
      "off": "self-center whitespace-nowrap text-[18px] dark:text-white"
    },
    "img": "h-10 w-10 mr-4"
  }
}

export default function CustomSidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sidebar
      aria-label="Sidebar"
      theme={customTheme}
      collapsed={collapsed}
      className="relative"
    >
      <div
        className="bg-gray-200 h-6 w-6 rounded-full absolute top-6 -right-10 text-[14px] flex items-center justify-center cursor-pointer z-50"
        onClick={() => setCollapsed(!collapsed)}
      >
        {
          collapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />
        } 
      </div>
      <Sidebar.Logo
        href="#"
        img="/bq.jpeg"
      >
        dashboard
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {
            routes.map(r => (
              <Sidebar.Item href={r.href} icon={r.Icon} key={r.title}>
                {
                  r.title
                }
              </Sidebar.Item>
            ))
          }
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="">
          <Sidebar.Item href="#" icon={HiUser}>
            Профиль
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
