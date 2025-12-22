"use client";

import { useState } from 'react';
import { Drawer, List, ListItem, Divider, IconButton, Typography, Box, Avatar, Stack } from '@mui/material';
import { Menu, CatchingPokemon, Castle, ChromeReaderMode, CrueltyFree, Forest, Storefront, ExitToApp, MoreVert, Settings, Loop, AutoStories, EmojiEvents } from '@mui/icons-material';
import Image from 'next/image';
import style from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarLink from './SidebarLink';

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
          <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', px: 1 }}>
            <SidebarLink
              collapsed={collapsed}
							name='Pokedex'
							url='/pokedex'
							icon={<ChromeReaderMode />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Pokemon Center'
							url='/pokecenter'
							icon={<CatchingPokemon />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Wilderness'
							url='/wilderness'
							icon={<Forest />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Handbook'
							url='/handbook'
							icon={<AutoStories />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Poke Mart'
							url='/pokemart'
							icon={<Storefront />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Day Care'
							url='/daycare'
							icon={<CrueltyFree />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Trade Center'
							url='/tradecenter'
							icon={<Loop />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Pokemon League'
							url='/league'
							icon={<EmojiEvents />}
            />
            <SidebarLink
              collapsed={collapsed}
							name='Battle Frontier'
							url='/frontier'
							icon={<Castle />}
            />
            <Divider />
            {/* <SidebarLink
              collapsed={collapsed}
							name='Handbook'
							url='/handbook'
							icon={<AutoStories />}
							nested
							sublinks={[{
								name: 'Type Chart',
								url: '/type-chart'
							}]}
            /> */}
            {/* <SidebarLink
              collapsed={collapsed}
							name='Tools'
							url='/tools'
							icon={<Build />}
            /> */}
            <Stack className={style['bottom-section']}>
                <SidebarLink
                  collapsed={collapsed}
                  name='Settings'
                  url='/settings'
                  icon={<Settings />}
                />
                <ListItem className={style['list-item']}>
                    <ExitToApp sx={{ mr: collapsed ? '0' : '10px' }} />
                    {!collapsed && <Typography variant='body1'>Logout</Typography>}
                </ListItem>
                <Stack className={style['profile-section']} direction='row' bgcolor='#ddd'>
                  <Link href='/profile'>
                    <Avatar sx={{ bgcolor: '#555' }} />
                  </Link>
                  {!collapsed && <>
                    <Stack width={240} ml={2}>
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
