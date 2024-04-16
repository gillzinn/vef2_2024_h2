'use client'

import Link from "next/link";
import styles from "./navLink.module.css";

import { usePathname } from "next/navigation";

interface NavLinkProps {
    item: {
        path: string;
        title: string;
    };
}

const NavLink = ({ item }: NavLinkProps) => {
    const pathName = usePathname();

    return (
        <Link href={item.path} key={item.title} className={`${styles.container} ${pathName === item.path && styles.active}`}>{item.title}</Link>
    );
}

export default NavLink;