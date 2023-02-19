import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const DefaultHeader: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const { isAuth, name } = useTypedSelector((store) => store.account);
  const { Logout } = useActions();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <LocalOfferIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <h1 style={{ fontSize: "20px", paddingRight: "24px" }}>Clothes</h1>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link to="/">
                <MenuItem key="catalog" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Каталог</Typography>
                </MenuItem>
              </Link>

              <Link to="create">
                <MenuItem key="catalog" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Створити продукт</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <Button
                key="catalog"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Каталог
              </Button>
            </Link>
            <Link to="create">
              <Button
                key="catalog"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Додати продукт
              </Button>
            </Link>
          </Box>

          {!isAuth ? (
            <Box sx={{ flexGrow: 0 }}>
              <Link to="login">
                <Button color="inherit">Вхід</Button>
              </Link>
              <Link to="register">
                <Button color="inherit">Реєстрація</Button>
              </Link>
            </Box>
          ) : (
            <Stack direction="row" spacing={2}>
              <Link to="/" style={{ height: "0px" }}>
                <p style={{ fontSize: "22px" }}>{name}</p>
              </Link>
              <Avatar sx={{ width: 34, height: 34 }}>{name?.charAt(0)}</Avatar>
              <Button color="inherit" onClick={Logout}>
                Вихід
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DefaultHeader;
