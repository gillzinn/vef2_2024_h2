'use client'

import { useState, useContext } from "react";
import NavLink from "./navLink/navLink";
import styles from "./links.module.css";
import { Context } from '../../../utils/User';

const links = [
    { title: 'Home', path: '/' },
    { title: 'Events', path: '/events' },
];

export default function Links() {
    const [open, setOpen] = useState(false);

    const UserState = () => {
        return useContext(Context);
    };

    const {
        authenticated,
        admin,
        logoutUser,
    } = UserState();
    
    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                        <NavLink item={link} key={link.title}/>
                ))}
                {authenticated ? (
                    <>
                        {admin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
                        <NavLink item={{ title: 'Þínir Events', path: '/userevents' }} />
                        <div >
                            <button onClick={() => logoutUser()} className={styles.logout}>Logout</button>
                        </div>
                    </>
                ) : (
                    <NavLink item={{ title: 'Login', path: '/login' }} />
                )}
            </div>
            <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button>
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title}/>
                    ))}
                    {authenticated ? (
                        <>
                            {admin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
                            <NavLink item={{ title: 'Þínir Events', path: '/userevents' }} />
                            <div >
                                <button onClick={() => logoutUser()} className={styles.logoutSmall}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <NavLink item={{ title: 'Login', path: '/login' }} />
                    )}
                </div>
            )}
        </div>
    );
}