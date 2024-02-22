/* eslint-disable no-magic-numbers */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useUserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { blue } from '@mui/material/colors';

const pages = [
  { title: 'Główna', path: '/' },
  { title: 'Moje wnioski', path: '/proposals' },
  { title: 'Złóż wniosek', path: '/proposals/create' },
];
const settings = [
  { path: '/account', title: 'Konto' },
  { path: '', title: 'Wyloguj się' },
];

type SettingsItem = (typeof settings)[number];
type NavPageItem = (typeof pages)[number];

const ResponsiveAppBar = () => {
  const { user, signOut } = useUserContext();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOptionsMenuClick = (setting: SettingsItem) => {
    handleCloseUserMenu();
    if (setting.title === 'Wyloguj się') {
      signOut();
    } else {
      navigate(setting.path);
    }
  };

  const handleNavMenuClick = (page: NavPageItem) => {
    handleCloseNavMenu();
    navigate(page.path);
  };

  const firstArrayElementIndex = 0;
  const avatarLetters =
    user?.name && user.surname
      ? user?.name[firstArrayElementIndex].toUpperCase() +
        user?.surname[firstArrayElementIndex].toUpperCase()
      : 'NN';

  const settingsElements = settings.map((setting) => (
    <MenuItem key={setting.title} onClick={() => handleOptionsMenuClick(setting)}>
      <Typography textAlign='center'>{setting.title}</Typography>
    </MenuItem>
  ));

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-controls='menu-appbar'
              aria-haspopup='true'
              aria-label='account of current user'
              color='inherit'
              size='large'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              keepMounted
              anchorEl={anchorElNav}
              id='menu-appbar'
              open={Boolean(anchorElNav)}
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              transformOrigin={{
                horizontal: 'left',
                vertical: 'top',
              }}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => handleNavMenuClick(page)}>
                  <Typography textAlign='center'>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              alignSelf: 'center',
            }}
          >
            <Logo />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => handleNavMenuClick(page)}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar alt={user?.name} sx={{ bgcolor: blue[900] }}>
                  {avatarLetters}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              keepMounted
              anchorEl={anchorElUser}
              id='menu-appbar'
              open={Boolean(anchorElUser)}
              sx={{ mt: '45px' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handleCloseUserMenu}
            >
              {settingsElements}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
