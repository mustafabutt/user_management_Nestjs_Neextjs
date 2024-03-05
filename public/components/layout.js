import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {UserService} from "../services/user.service";
import Breadcrumb from './BreadCrumbs';
import BreadcrumbItem from "./BreadcrumbItem"

export const siteTitle = 'Candlik - Home';

const Layout = ({ children, home }) => {


  return (
    <main>
        {children}
    </main>
  );
};
export default Layout;
