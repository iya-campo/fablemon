"use client";

import React, { useState } from 'react'
import { Album, ArrowBack, BusinessCenter, CatchingPokemon, Dashboard, Diamond, DirectionsRun, Explore, Forest, Grass, Loop, Medication, MedicationLiquid, MoreVert, Park, SportsMma, Tsunami, Volcano } from '@mui/icons-material'
import { Box, Button, Chip, Divider, FormControl, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Select, SelectChangeEvent, Stack, SvgIcon, Typography } from '@mui/material'
import Image from 'next/image'
import EncounterActions from '@/components/EncounterActions';
import WildBattle from '@/components/common/WildBattle';


const Wilderness = () => {
  const [encounter, setEncounter] = useState('');
  const [itemSelected, setItemSelected] = useState('');
  const [habitat, setHabitat] = React.useState('Forest');
  const [status, setStatus] = React.useState('explored');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleExploration = () => {
    setStatus('exploring');
    setTimeout(() => {
      setStatus('explored');
    }, 1500);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setHabitat(event.target.value as string);
  };

  const renderResults = () => {
    if (status === 'exploring') return(<>
      <Typography variant='caption' fontWeight='bold'>{`Exploring ${habitat}...`}</Typography>
      <Image src={`/sprites/default-player.gif`} width={20} height={20} alt='player' />
    </>)
    if (status === 'explored') return(<>
      <Typography variant='caption' fontWeight='bold'>{`You wandered through the ${habitat}.`}</Typography>
    </>)
  }


  return (
    <Stack display='flex' gap={2} mb={6}>
      <Stack direction='row' alignItems='center' gap={1}>
        <Forest fontSize='medium' />
        <Typography variant='button' fontSize={14} fontWeight='bold'>Wilderness</Typography>
      </Stack>
      <Stack gap={0.5} mt={1}>
        <Typography variant='h5' fontWeight='bold'>Exploration</Typography>
        <Box width={40} height={3} bgcolor='#333'></Box>
      </Stack>
      <Grid container size={12} height={300} display='flex' bgcolor='#ddd' borderRadius={2} sx={{ backgroundImage: `url(images/forest.jpg)`, backgroundPositionY: '-150px' }} p={2}>
        <Grid size={3}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, height: '100%', position: 'relative' }}>
            <Box height={110} width={110} sx={{ backgroundImage: `url(/sprites/female-player.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
            <Button variant='contained' disabled={status === 'exploring'} sx={{ mt: 2, mb: 0.5 }} onClick={handleExploration}>
              <Typography variant='button' mr={1}>Explore</Typography>
              <Explore fontSize='medium' />
            </Button>
              <Stack direction='row' alignItems='center' spacing={0.5} position='absolute' bottom={10}>
                {habitat && renderResults()}
              </Stack>
          </Paper>
        </Grid>
        <Grid container size={9} justifyContent='flex-end'>
          <FormControl sx={{ width: 200 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={habitat || 'Select habitat to explore'}
              renderValue={(val) => (
                <Box display='flex' alignItems='center' gap={1}>
                  {val === 'Forest' && <Park fontSize='small' />}
                  {val === 'Volcano' && <Volcano fontSize='small' />}
                  {val === 'Ocean' && <Tsunami fontSize='small' />}
                  <Typography variant='body2'>{val}</Typography>
                </Box>
              )}
              size='small'
              onChange={handleChange}
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value={''} disabled>
                <Typography variant='caption'>Select habitat to explore</Typography>
              </MenuItem>
              <Divider />
              <MenuItem value={'Forest'}>
                <Park fontSize='small' />
                <Typography variant='body2' ml={1}>Forest</Typography>
              </MenuItem>
              <MenuItem value={'Volcano'}>
                <Volcano fontSize='small' />
                <Typography variant='body2' ml={1}>Volcano</Typography>
              </MenuItem>
              <MenuItem value={'Ocean'}>
                <Tsunami fontSize='small' />
                <Typography variant='body2' ml={1}>Ocean</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container size={12} spacing={4} mt={2}>
        <Grid container direction='column' size={{ xs: 12, md: 5 }} spacing={0} height='fit-content'>
          <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0} mb={0.5}>Your Party</Typography>
          <Typography variant='body2'>Visit the Pokemon Center to fully heal your Pokemon.</Typography>
          <Stack direction='row' spacing={1} mt={4}>
            <Grid container size={6} spacing={1}>
              <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2, width: '100%' }}>
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`} width={32} height={32} alt='party-pokemon' />
                <Stack flexGrow={1}>
                  <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                  <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                  <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                </Stack>
              </Paper>
              <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2, width: '100%' }}>
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif`} width={32} height={32} alt='party-pokemon' />
                <Stack flexGrow={1}>
                  <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                  <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                  <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                </Stack>
              </Paper>
              <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2, width: '100%' }}>
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif`} width={32} height={32} alt='party-pokemon' />
                <Stack flexGrow={1}>
                  <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                  <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                  <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid container size={6} spacing={1}>
              <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2, width: '100%' }}>
                <SvgIcon sx={{ width: '100%', height: '100%', color: '#eee', py: 1 }}>
                  <CatchingPokemon />
                </SvgIcon>
              </Paper>
              <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2, width: '100%' }}>
                <SvgIcon sx={{ width: '100%', height: '100%', color: '#eee', py: 1 }}>
                  <CatchingPokemon />
                </SvgIcon>
              </Paper>
              <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2, width: '100%' }}>
                <SvgIcon sx={{ width: '100%', height: '100%', color: '#eee', py: 1 }}>
                  <CatchingPokemon />
                </SvgIcon>
              </Paper>
            </Grid>
          </Stack>
        </Grid>
        <Grid container size={{ xs: 12, md: 7 }} spacing={0}>
          {/* <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0} mb={2}>Your Bag</Typography> */}
          <Stack direction='row' justifyContent='flex-end' spacing={0.5} mb={1} width='100%'>
            <Button variant='contained' size='small' sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Dashboard fontSize='small' />
              <Typography variant='caption'>All</Typography>
            </Button>
            <Button variant='outlined' size='small' sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CatchingPokemon fontSize='small' />
              <Typography variant='caption' color='primary'>Pkb</Typography>
            </Button>
            <Button variant='outlined' size='small' sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Medication fontSize='small' />
              <Typography variant='caption' color='primary'>Med</Typography>
            </Button>
            <Button variant='outlined' size='small' sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Album fontSize='small' />
              <Typography variant='caption' color='primary'>TMs</Typography>
            </Button>
            <Button variant='outlined' size='small' sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Diamond fontSize='small' />
              <Typography variant='caption' color='primary'>Key</Typography>
            </Button>
            {/* <IconButton sx={{ bgcolor: '#b3b3b3ff', borderRadius: 2 }}>
              <Dashboard fontSize='small' htmlColor='white' />
            </IconButton>
            <IconButton sx={{ bgcolor: '#e74c4cff', borderRadius: 2 }}>
              <CatchingPokemon fontSize='small' htmlColor='white' />
            </IconButton>
            <IconButton sx={{ bgcolor: '#59b173ff', borderRadius: 2 }}>
              <Medication fontSize='small' htmlColor='white' />
            </IconButton>
            <IconButton sx={{ bgcolor: '#6f4e7cff', borderRadius: 2 }}>
              <Album fontSize='small' htmlColor='white' />
            </IconButton>
            <IconButton sx={{ bgcolor: '#55b2ddff', borderRadius: 2 }}>
              <Diamond fontSize='small' htmlColor='white' />
            </IconButton> */}
          </Stack>
          <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, p: 2, width: '100%' }}>
            <Grid container size={6} height={350} sx={{ overflowY: 'auto' }}>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton sx={{ py: 0.25, borderBottom: 1, borderColor: '#ddd' }} onClick={() => setItemSelected('pokeball')}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CatchingPokemon />
                  </ListItemIcon>
                  <ListItemText primary="Pokeball" />
                  <ListItemText primary="x1" sx={{ display: 'flex', justifyContent: 'flex-end' }} />
                </ListItemButton>
                <ListItemButton sx={{ py: 0.25, borderBottom: 1, borderColor: '#ddd' }} onClick={() => setItemSelected('potion')}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <MedicationLiquid />
                  </ListItemIcon>
                  <ListItemText primary="Potion" />
                  <ListItemText primary="x1" sx={{ display: 'flex', justifyContent: 'flex-end' }} />
                </ListItemButton>
              </List>
            </Grid>
            <Grid size={6} textAlign='center'>
              {itemSelected === '' && (
                <Box display='flex' justifyContent='center' alignItems='center' height={230}>
                  <CatchingPokemon sx={{ color: '#eee', fontSize: 150 }} />
                </Box>
              )}
              {itemSelected === 'pokeball' && (
                <>
                  <Image src={`/images/pokeball.png`} width={80} height={80} alt='bag-item' />
                  <Typography variant='body2' component='p'>Used to catch and store Pokémon with a quick press, making every Trainer's journey easier.</Typography>
                  <Button variant='contained' size='small' sx={{ mt: 2 }}>
                    <Typography variant='caption'>Throw Pokeball</Typography>
                  </Button>
                </>
              )}
              {itemSelected === 'potion' && (
                <>
                  <Image src={`/images/super-potion.png`} width={80} height={80} alt='bag-item' />
                  <Typography variant='body2' component='p'>Used to catch and store Pokémon with a quick press, making every Trainer's journey easier.</Typography>
                  <EncounterActions />
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {encounter ? (
        <WildBattle />
      ) : null}
    </Stack>
  )
}

export default Wilderness
