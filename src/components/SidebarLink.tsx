"use client";

import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, ListItem, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import style from './Sidebar.module.css';

type SidebarLink = {
  name: string;
  url: string;
}

interface SidebarLinkProps {
  collapsed: boolean;
  name: string;
  url: string;
  icon: ReactElement;
  nested?: boolean;
  sublinks?: SidebarLink[]
}

const SidebarLink = ({ collapsed, name, url, icon, nested=false, sublinks=[] }: SidebarLinkProps) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<boolean>(pathname === url);

  useEffect(() => { if (collapsed) setExpanded(false) }, [collapsed])

  return (
    <>
    {nested ? (
      <Accordion 
        expanded={expanded} 
        defaultExpanded={expanded} 
        onChange={() => setExpanded(!expanded)}
        sx={{ bgcolor: 'transparent', boxShadow: 0, '&.Mui-expanded': { m: 0 }, width: collapsed ? 60 : 240 }}>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          slotProps={{
            root: { sx: { px: 0, minHeight: 30, '&.Mui-expanded': { minHeight: 30 } } },
            content: { sx: { m: 0, '&.Mui-expanded': { m: 0 } } },
          }}
          >
          <ListItem className={style['list-item']} sx={{ width: 'fit-content', px: 1, borderRadius: 2 }}>
            <SvgIcon sx={{ mr: collapsed ? '0' : '10px' }}>
              {icon}
            </SvgIcon>
            {!collapsed && <Typography variant='body1' minWidth={150}>{name}</Typography>}
            {!collapsed && (
              <ExpandMore
                sx={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms',
                }}
              />
            )}
          </ListItem>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {sublinks.map((sublink: SidebarLink) => (
            <Link href={sublink.url}>
              <ListItem className={style['list-item']} sx={{ bgcolor: pathname === sublink.url ? '#ddd' : 'inherit', pl: 6 }}>
                {!collapsed && <Typography variant='body1' minWidth={150}>{sublink.name}</Typography>}
              </ListItem>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    ) : (
      <Link href={url}>
        <ListItem className={style['list-item']} sx={{ bgcolor: pathname === url ? '#ddd' : 'inherit', mb: 1, px: 1, borderRadius: 2 }}>
          <SvgIcon sx={{ mr: collapsed ? '0' : '10px' }}>
            {icon}
          </SvgIcon>
          {!collapsed && <Typography variant='body1' minWidth={150}>{name}</Typography>}
        </ListItem>
      </Link>
    )}
    </>
  )
}

export default SidebarLink