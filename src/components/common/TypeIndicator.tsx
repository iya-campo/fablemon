import React from 'react'
import { Stack, SvgIcon, Typography } from '@mui/material';
import { AcUnit, BugReport, Cake, Coronavirus, DarkMode, Face3, FlashOn, Grass, Hive, Landscape, Rocket, Settings, SportsMma, Storm, TripOrigin, Twitter, WaterDrop, Whatshot } from '@mui/icons-material';
import { PokemonTypeKey } from '@/types/Pokemon';
import { capitalize } from '@/utils/commonUtils';

interface TypeIndicatorProps {
  variant?: "icon" | "chip" | "tag";
  name: PokemonTypeKey;
  fullWidth?: boolean;
}

type IconMappingValue = {
  icon: React.ReactNode;
  color: string;
};

export const iconMapping: Record<string, IconMappingValue> = {
  normal: { icon: <TripOrigin />, color: '#c2c2c2ff' },
  water: { icon: <WaterDrop />, color: '#55b2ddff' },
  fire: { icon: <Whatshot />, color: '#e74c4cff' },
  grass: { icon: <Grass />, color: '#59b173ff' },
  electric: { icon: <FlashOn />, color: '#eed753ff' },
  ice: { icon: <AcUnit />, color: '#9addf1ff' },
  fighting: { icon: <SportsMma />, color: '#eb6631ff' },
  poison: { icon: <Coronavirus />, color: '#925cb6ff' },
  ground: { icon: <Landscape />, color: '#d38934ff' },
  flying: { icon: <Twitter />, color: '#a6c0e2ff' },
  psychic: { icon: <Storm />, color: '#dd7bb4ff' },
  bug: { icon: <BugReport />, color: '#a2c22fff' },
  rock: { icon: <Hive />, color: '#c4a772ff' }, 
  ghost: { icon: <Face3 />, color: '#6f4e7cff' }, //
  dragon: { icon: <Rocket />, color: '#5f76b6ff' }, //
  dark: { icon: <DarkMode />, color: '#454461ff' },
  steel: { icon: <Settings />, color: '#696969ff' },
  fairy: { icon: <Cake />, color: '#f0b7b7ff' },
}

const TypeIndicator = ({ variant='tag', name, fullWidth=false }: TypeIndicatorProps) => {

  return (
    <>
      {(variant === 'tag' || variant === 'chip') && (
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5} width={fullWidth ? 'auto' : 85} borderRadius={1} bgcolor={iconMapping[name.toLowerCase()].color} p={0.5}>
          {variant === 'chip' && (
            <SvgIcon htmlColor='white' sx={{ fontSize: 16, display: { sm: 'block', md: 'none', lg: 'block' } }}>
              {iconMapping[name.toLowerCase()].icon}
            </SvgIcon>
          )}
          <Typography  
            display='inline'
            color='white' 
            variant='caption' 
            textAlign='center' 
            textTransform='uppercase'
            fontWeight='bold' 
            fontSize={10} 
          >
            {capitalize(name)}
          </Typography>
        </Stack>
      )}
      {variant === 'icon' && (
        <SvgIcon htmlColor='white' sx={{ bgcolor: iconMapping[name.toLowerCase()].color, borderRadius: 50, p: 0.5 }}>
          {iconMapping[name.toLowerCase()].icon}
        </SvgIcon>
      )}
    </>
  )
}

export default TypeIndicator
