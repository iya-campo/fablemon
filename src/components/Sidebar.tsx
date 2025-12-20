"use client";

import { useState } from 'react';
import { Drawer, List, ListItem, Divider, IconButton, Typography, Box, Avatar, Stack } from '@mui/material';
import { Menu, CatchingPokemon, Castle, ChromeReaderMode, CrueltyFree, Forest, Storefront, ExitToApp, MoreVert, Settings, Loop, Token, AutoStories } from '@mui/icons-material';
import Image from 'next/image';
import style from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <Box display={{ xs: 'none', sm: 'flex' }}>
      <IconButton color="primary" onClick={toggleCollapse} sx={{ position: 'absolute', left: 20, top: 20 }}>
        <Menu />
      </IconButton>
      <Drawer
        sx={{
          width: collapsed ? 60 : 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? 60 : 240,
            backgroundColor: '#F4F8FF',
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 2 }}>
            <Link href={!collapsed ? '/' : pathname}>
              <Stack direction='row' alignItems='center' spacing={1}>
                  <IconButton onClick={toggleCollapse} sx={{ p: 0 }}>
                      <Image src="/eevee.png" alt="Logo" width={40} height={40} />
                  </IconButton>
                  {!collapsed && <Typography variant='button' fontWeight='bold'>Fablemon</Typography>}
              </Stack>
            </Link>
            <IconButton onClick={toggleCollapse} sx={{ 
                position: 'absolute', 
                right: 16, 
                visibility: collapsed ? 'hidden' : 'visible', 
                transition: collapsed ? 'none' : 'visibility 0s ease-in 0.2s',
                p: 0 }}>
                <Menu />
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
            <Link href='/pokedex'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'pokedex' ? '#ddd' : 'inherit' }}>
                    <ChromeReaderMode sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Pokedex</Typography>}
                </ListItem>
            </Link>
            <Link href='/pokecenter'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'pokecenter' ? '#ddd' : 'inherit' }}>
                    <CatchingPokemon sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Pokemon Center</Typography>}
                </ListItem>
            </Link>
            <Link href='/wilderness'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'wilderness' ? '#ddd' : 'inherit' }}>
                    <Forest sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Wilderness</Typography>}
                </ListItem>
            </Link>
            <Link href='/handbook'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'handbook' ? '#ddd' : 'inherit' }}>
                    <AutoStories sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Handbook</Typography>}
                </ListItem>
            </Link>
            <Link href='/pokemart'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'pokemart' ? '#ddd' : 'inherit' }}>
                    <Storefront sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Poke Mart</Typography>}
                </ListItem>
            </Link>
            <Link href='/daycare'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'daycare' ? '#ddd' : 'inherit' }}>
                    <CrueltyFree sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Day Care</Typography>}
                </ListItem>
            </Link>
            <Link href='/tradecenter'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'tradecenter' ? '#ddd' : 'inherit' }}>
                    <Loop sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Trade Center</Typography>}
                </ListItem>
            </Link>
            <Link href='/gyms'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'gyms' ? '#ddd' : 'inherit' }}>
                    <Token sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Gyms</Typography>}
                </ListItem>
            </Link>
            <Link href='/frontier'>
                <ListItem className={style['list-item']} sx={{ bgcolor: pathname === 'frontier' ? '#ddd' : 'inherit' }}>
                    <Castle sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1' minWidth={150}>Battle Frontier</Typography>}
                </ListItem>
            </Link>
            <Divider />
            <Stack className={style['bottom-section']}>
                <ListItem className={style['list-item']}>
                    <Settings sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1'>Settings</Typography>}
                </ListItem>
                <ListItem className={style['list-item']}>
                    <ExitToApp sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1'>Logout</Typography>}
                </ListItem>
                <Stack className={style['profile-section']} direction='row' bgcolor='#ddd'>
                    <Avatar sx={{ bgcolor: '#555' }} />
                    {!collapsed && <>
                        <Stack>
                            <Typography variant='body2'>John Smith</Typography>
                            <Typography variant='caption'>johnsmith@gmail.com</Typography>
                        </Stack>
                        <IconButton sx={{ p: 0 }}>
                            <MoreVert />
                        </IconButton>
                    </>}
                </Stack>
            </Stack>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
