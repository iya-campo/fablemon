"use client";

import { Apartment, BakeryDining, Balance, Castle, CatchingPokemon, Check, EmojiEvents, History, PedalBike, Star, Sunny, Token, Tsunami } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Paper, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Image from 'next/image';
import { useState } from 'react';
import CommenceBattle from '../frontier/CommenceBattle';
import PlayerBattle from '../frontier/PlayerBattle';
import TrainerDetail from './TrainerDetail';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <Grid container size={12} spacing={2} pl={3}>
          {children}
        </Grid>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const PokemonLeague = () => {
  const [region, setRegion] = useState(0);
  const [trainers, setTrainers] = useState('gym');
  const [open, setOpen] = useState(false);
  const [battleStart, setBattleStart] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStartBattle = () => {
    setBattleStart(true);
    handleClose();
  };
  const handleEndBattle = () => {
    setBattleStart(false);
  };

  const handleChangeTrainers = (event: React.MouseEvent<HTMLElement>, newTrainers: string) => {
    setTrainers(newTrainers);
  };

  const handleChangeRegion = (event: React.SyntheticEvent, newRegion: number) => {
    setRegion(newRegion);
  };

  return (
    <>
      <CommenceBattle
        trainerType='challenge'
        open={open} 
        handleClose={handleClose} 
        handleStartBattle={handleStartBattle}
        name='Gym Leader Brock'
        team={['74', '74', '95']}
        img='https://archives.bulbagarden.net/media/upload/a/a6/Lets_Go_Pikachu_Eevee_Brock.png'
      />
      <PlayerBattle battleStart={battleStart} handleEndBattle={handleEndBattle} />
      <Stack display='flex' gap={2} mb={18}>
        <Stack direction='row' alignItems='center' gap={1}>
          <EmojiEvents fontSize='medium' />
          <Typography variant='button' fontSize={14} fontWeight='bold'>Pokemon League</Typography>
        </Stack>
        <Stack gap={0.5} mt={1}>
          <Typography variant='h6' fontWeight='bold'>Completion: 2%</Typography>
        </Stack>
        <Grid container size={12}>
          <Paper sx={{ display: 'flex', gap: 2, height: '100%', width: '100%', p: 2, pb: 1 }}>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <Star color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Kanto</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <History color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Johto</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <Tsunami color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Hoenn</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <Balance color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Sinnoh</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <Apartment color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Unova</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <BakeryDining color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Kalos</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <Sunny color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Alola</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <Castle color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Galar</Typography>
            </Stack>
            <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.5}>
              <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1} width='100%' bgcolor='#ddd' borderRadius={1} p={2}>
                <PedalBike color='action' sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant='body2' fontWeight='bold'>Paldea</Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid container size={12} spacing={2} mt={2}>
          <Grid container size={6} direction='column'>
            <Typography variant='h5'>Kanto</Typography>
            <Typography variant='body2'><b>Kanto</b> is a region of beginnings, where quiet hometowns open into bustling cities, winding routes, and mysterious caves. Trainers set out on their first journeys here, forging bonds with Pokémon and turning humble starts into lasting legends.</Typography>
          </Grid>
          <Grid container direction='column' size={6} spacing={0.5} height='fit-content'>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Token fontSize='small' />
              <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Badges</Typography>
            </Stack>
            <Paper sx={{ display: 'flex', gap: 1, width: '100%', p: 2, pb: 1 }}>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/d/dd/Boulder_Badge.png"
                  width={30}
                  height={30}
                  alt="Boulder Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Boulder</Typography>
              </Stack>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75} sx={{ opacity: 0.25 }}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/9/9c/Cascade_Badge.png"
                  width={30}
                  height={30}
                  alt="Cascade Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Cascade</Typography>
              </Stack>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75} sx={{ opacity: 0.25 }}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png"
                  width={30}
                  height={30}
                  alt="Thunder Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Thunder</Typography>
              </Stack>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75} sx={{ opacity: 0.25 }}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/b/b5/Rainbow_Badge.png"
                  width={30}
                  height={30}
                  alt="Rainbow Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Rainbow</Typography>
              </Stack>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75} sx={{ opacity: 0.25 }}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/7/7d/Soul_Badge.png"
                  width={30}
                  height={30}
                  alt="Soul Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Soul</Typography>
              </Stack>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75} sx={{ opacity: 0.25 }}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/6/6b/Marsh_Badge.png"
                  width={30}
                  height={30}
                  alt="Marsh Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Marsh</Typography>
              </Stack>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75} sx={{ opacity: 0.25 }}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/1/12/Volcano_Badge.png"
                  width={30}
                  height={30}
                  alt="Volcano Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Volcano</Typography>
              </Stack>
              <Stack alignItems='center' flexGrow={1} height='100%' borderRadius={1} gap={0.75} sx={{ opacity: 0.25 }}>
                <Image
                  src="https://archives.bulbagarden.net/media/upload/7/78/Earth_Badge.png"
                  width={30}
                  height={30}
                  alt="Earth Badge"
                />
                <Typography variant='caption' fontWeight='bold' fontSize={10} textTransform='uppercase' letterSpacing={0}>Earth</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <ToggleButtonGroup
          size='small'
          color="primary"
          value={trainers}
          exclusive
          onChange={handleChangeTrainers}
          aria-label="Platform"
          sx={{ justifySelf: 'flex-end' }}
        >
          <ToggleButton value="gym">Gym Leaders</ToggleButton>
          <ToggleButton value="elite">Elite Four</ToggleButton>
          <ToggleButton value="champion">Champion</ToggleButton>
        </ToggleButtonGroup>
        <Grid container size={12} mt={2}>
          <Paper sx={{ display: 'flex', height: '100%', width: '100%', p: 2 }}>
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={region}
                onChange={handleChangeRegion}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', width: 150 }}
              >
                <Tab label="Kanto" {...a11yProps(0)} />
                <Tab label="Johto" {...a11yProps(1)} />
                <Tab label="Hoenn" {...a11yProps(2)} />
                <Tab label="Sinnoh" {...a11yProps(3)} />
                <Tab label="Unova" {...a11yProps(4)} />
                <Tab label="Kalos" {...a11yProps(5)} />
                <Tab label="Alola" {...a11yProps(6)} />
                <Tab label="Galar" {...a11yProps(7)} />
                <Tab label="Paldea" {...a11yProps(8)} />
              </Tabs>
              <TabPanel value={region} index={0}>
                <Grid size={6} border='1px solid #ddd' borderRadius={2}>
                  <TrainerDetail
                    name='Gym Leader Brock'
                    team={['1', '1', '1']}
                    img='https://archives.bulbagarden.net/media/upload/a/a6/Lets_Go_Pikachu_Eevee_Brock.png'
                    levelRec='Lvl. 16'
                    reward='$ 100'
                    gymBadge='https://archives.bulbagarden.net/media/upload/d/dd/Boulder_Badge.png'
                    handleOpen={handleOpen}
                  />
                </Grid>
                <Grid size={6} border='1px solid #ddd' borderRadius={2}>
                  <TrainerDetail
                    name='Gym Leader Misty'
                    team={['1', '1']}
                    img='https://archives.bulbagarden.net/media/upload/f/f6/Lets_Go_Pikachu_Eevee_Misty.png'
                    levelRec='Lvl. 18'
                    reward='$ 200'
                    gymBadge='https://archives.bulbagarden.net/media/upload/9/9c/Cascade_Badge.png'
                    handleOpen={handleOpen}
                  />
                </Grid>
                <Grid size={6} border='1px solid #ddd' borderRadius={2}>
                  <TrainerDetail
                    name='Gym Leader Lt. Surge'
                    team={['1', '1', '1']}
                    img='https://archives.bulbagarden.net/media/upload/b/bc/Lets_Go_Pikachu_Eevee_Lt_Surge.png'
                    levelRec='Lvl. 20'
                    reward='$ 300'
                    gymBadge='https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png'
                    handleOpen={handleOpen}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={region} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={region} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={region} index={3}>
                Item Four
              </TabPanel>
              <TabPanel value={region} index={4}>
                Item Five
              </TabPanel>
              <TabPanel value={region} index={5}>
                Item Six
              </TabPanel>
              <TabPanel value={region} index={6}>
                Item Seven
              </TabPanel>
              <TabPanel value={region} index={7}>
                Item Eight
              </TabPanel>
              <TabPanel value={region} index={8}>
                Item Nine
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
      </Stack>
    </>
  )
}

export default PokemonLeague
