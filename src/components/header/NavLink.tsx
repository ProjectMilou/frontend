import { Link, LinkProps } from "@reach/router";
import React from 'react';

interface NavLinkProps {
    to: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }: React.PropsWithChildren<NavLinkProps>) => (
    <Link
        to={to}
        getProps={({ isCurrent }) => ({
            style: {
                color: isCurrent ? "red" : "blue"
            }
        })}
    >
        {children}
    </Link>
);

export default NavLink;