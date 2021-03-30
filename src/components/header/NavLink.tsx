import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Link } from '@reach/router';
import React from 'react';

interface NavLinkProps {
  to: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navlink: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      textTransform: 'none',
      textAlign: 'center',
      padding: '8px 10px 8px 10px',
      width: 100,
      fontSize: theme.typography.body1.fontSize,
    },
  })
);

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
}: React.PropsWithChildren<NavLinkProps>) => {
  const { navlink } = useStyles();
  return (
    <Link
      to={to}
      className={navlink}
      getProps={({ isCurrent }) => ({
        style: {
          fontWeight: isCurrent ? 'bold' : 'normal',
        },
      })}
    >
      {children}
    </Link>
  );
};

export default NavLink;
