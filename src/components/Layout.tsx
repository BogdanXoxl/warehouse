import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { signOut } from "next-auth/react";
import { Links } from "../settings";
import NextLink from "next/link";
import { AppBar, Button, Drawer, IconButton, Link, MenuItem, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title, children }) => {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const getDrawerChoices = () => {
    return Links.map(({ title: _title, to }) => {
      return (
        <NextLink href={to} passHref key={_title}>
          <Link color="inherit" style={{ textDecoration: "none" }}>
            <MenuItem>{_title}</MenuItem>
          </Link>
        </NextLink>
      );
    });
  };

  const getMenuButtons = () => {
    return Links.map(({ title: _title, to }) => {
      return (
        <NextLink key={_title} href={to} passHref>
          <Button color="inherit">{_title}</Button>
        </NextLink>
      );
    });
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>{getMenuButtons()}</Box>
        <Button color="inherit" onClick={() => signOut()}>
          Выйти
        </Button>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>{getDrawerChoices()}</div>
        </Drawer>
      </Toolbar>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <AppBar position="relative">{mobileView ? displayMobile() : displayDesktop()}</AppBar>
      </header>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
