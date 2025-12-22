"use client";

import React from 'react'
import { ArrowDownward, CatchingPokemon, InfoOutline, Input, LocalHospital, MoreVert, Reply, RestartAlt, Search } from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, Paper, Select, SelectChangeEvent, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import PokemonDetails from './PokemonDetails';
import PokemonPopper from './PokemonPopper';
import { capitalize } from '@/utils/commonUtils';
import { iconMapping } from '@/components/common/TypeIndicator';
import { POKEMON_TYPES } from '@/constants/typeConstants';

const PokemonCenter = () => {
  const [healStatus, setHealStatus] = React.useState('initial');
  const [type, setType] = React.useState('');
  const [ability, setAbility] = React.useState('');
  const [popperEl, setPopperEl] = React.useState<HTMLElement | null>(null);
  const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = React.useState('');
  const [openDetails, setOpenDetails] = React.useState(false);
  const openMenu = Boolean(menuEl);

  const handleHealing = () => {
    setHealStatus('healing');
    setTimeout(() => {
      setHealStatus('healed');
    }, 2500);
  };
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, type: string) => {
    setMenuEl(event.currentTarget);
    setMenuType(type);
  };
  
  const handleCloseMenu = () => setMenuEl(null);

  const handleOpenDetails = () => {
    setOpenDetails(true);
    handleCloseMenu();
  };
  
  const handleCloseDetails = () => setOpenDetails(false);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleAbilityChange = (event: SelectChangeEvent) => {
    setAbility(event.target.value as string);
  };

  return (
    <>
      <PokemonPopper popperEl={popperEl} />
      <PokemonDetails open={openDetails} handleClose={handleCloseDetails} />
      <Stack display='flex' gap={2} mb={6}>
        <Stack direction='row' alignItems='center' gap={1}>
          <CatchingPokemon fontSize='medium' />
          <Typography variant='button' fontSize={14} fontWeight='bold'>Pokemon Center</Typography>
        </Stack>
        <Grid container size={12} mt={1}>
          <Paper elevation={1} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%', width: '100%', rowGap: 2, p: { xs: 4, md: 2 } }}>
            <Grid size={{ xs: 12, md: 6 }} minHeight={200} bgcolor='#ddd' borderRadius={2} sx={{ backgroundImage: `url(/images/pokemon-center.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
            <Grid container size={{ xs: 12, md: 6 }} direction='column' justifyContent='center' alignItems='center' px={4} spacing={1}>
              <Typography variant='body1' fontWeight='bold'>Welcome to the Pokémon Center!</Typography>
              <Typography variant='body2' textAlign='center'>Bring your Pokémon to the counter to heal, and our staff will take care of the rest. While you wait, feel free to relax and get ready for your next challenge!</Typography>
              <Grid container size={12} my={1} justifyContent='center' alignItems={{ sm: 'center', md: 'flex-end' }}>
                <Grid container size={{ sm: 4, md: 5 }} justifyContent='center'>
                  <Box height={120} width={120} sx={{ backgroundImage: `url(/sprites/nurse-joy.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                </Grid>
              </Grid>
              <Typography variant='body1' fontWeight='bold' mb={0.5} textAlign='center'>Nurse Pokemon to full health?</Typography>
              <Button variant='contained' size='large' disabled={healStatus !== 'initial'} sx={{ display: 'flex', gap: 1 }} onClick={handleHealing}>
                {healStatus === 'initial' && (
                  <>
                    <Typography variant='button'>Heal Pokemon</Typography>
                    <LocalHospital fontSize='medium' />
                  </>
                )}
                {healStatus === 'healing' && (
                  <>
                    <Typography variant='button'>Deploying Chanseys</Typography>
                    <Box display='flex' alignItems='flex-end' height={30} width={30} sx={{ backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/113.gif)`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                  </>
                )}
                {healStatus === 'healed' && (
                  <Typography variant='button'>Party Healed!</Typography>
                )}
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Stack gap={0.5} mt={2}>
          <Typography variant='h5' fontWeight='bold'>PC Storage</Typography>
          <Box width={40} height={3} bgcolor='#333' />
        </Stack>
        <Grid container size={12} spacing={4} mt={1}>
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <Stack mt={2.5}>
              <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0} mb={2}>Your Party</Typography>
              <Stack spacing={1.5}>
                <Menu
                  id="basic-menu"
                  anchorEl={menuEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  elevation={1}
                  slotProps={{
                    list: {
                      'aria-labelledby': 'basic-button',
                    },
                  }}
                >
                  {menuType === 'storage' && 
                    <MenuItem onClick={handleCloseMenu}>
                      <Reply fontSize='small' />
                      <Typography variant='body2' ml={1}>Add to Party</Typography>
                    </MenuItem>
                  }
                  {menuType === 'party' && 
                    <MenuItem onClick={handleCloseMenu}>
                      <Input fontSize='small' />
                      <Typography variant='body2' ml={1}>Store in PC</Typography>
                    </MenuItem>
                  }
                  <MenuItem onClick={handleOpenDetails}>
                    <InfoOutline fontSize='small' />
                    <Typography variant='body2' ml={1}>View Details</Typography>
                  </MenuItem>
                </Menu>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`} width={32} height={32} alt='party-pokemon' />
                  <Stack flexGrow={1}>
                    <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                    <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                    <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                  </Stack>
                  <IconButton size='small'
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={(e) => handleOpenMenu(e, 'party')}>
                    <MoreVert fontSize='small' />
                  </IconButton>
                </Paper>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif`} width={32} height={32} alt='party-pokemon' />
                  <Stack flexGrow={1}>
                    <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                    <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                    <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                  </Stack>
                  <IconButton size='small'
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={(e) => handleOpenMenu(e, 'party')}>
                    <MoreVert fontSize='small' />
                  </IconButton>
                </Paper>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif`} width={32} height={32} alt='party-pokemon' />
                  <Stack flexGrow={1}>
                    <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                    <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                    <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                  </Stack>
                  <IconButton size='small'
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={(e) => handleOpenMenu(e, 'party')}>
                    <MoreVert fontSize='small' />
                  </IconButton>
                </Paper>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <SvgIcon sx={{ width: '100%', height: '100%', color: '#eee', py: 1 }}>
                    <CatchingPokemon />
                  </SvgIcon>
                </Paper>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <SvgIcon sx={{ width: '100%', height: '100%', color: '#eee', py: 1 }}>
                    <CatchingPokemon />
                  </SvgIcon>
                </Paper>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <SvgIcon sx={{ width: '100%', height: '100%', color: '#eee', py: 1 }}>
                    <CatchingPokemon />
                  </SvgIcon>
                </Paper>
              </Stack>
            </Stack>
          </Grid>
          <Grid container size={{ xs: 12, sm: 7, md: 8 }} spacing={2}>
            <Grid container size={12} spacing={1}>
              <Grid size={{ sm: 12, md: 'grow' }}>
                <TextField 
                  placeholder='Search Pokedex'
                  fullWidth
                  size='small'
                  slotProps={{
                    input: {
                      startAdornment: <Search color='action' sx={{ mr: 1 }} />,
                    },
                  }}
                  sx={{ backgroundColor: 'white', '& .MuiInputBase-input': { fontSize: '14px' } }} 
                />
              </Grid>
              <Grid  size={{ xs: 12, sm: 6, md: 3 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type ? type : 'Select type'}
                  fullWidth
                  size='small'
                  onChange={handleTypeChange}
                  renderValue={(val) => (
                    <Typography variant='body2'>{capitalize(val)}</Typography>
                  )}
                  startAdornment={
                    <InputAdornment position="start">
                      {type && <SvgIcon htmlColor={iconMapping[type].color} fontSize='small'>{iconMapping[type].icon}</SvgIcon>}
                    </InputAdornment>
                  }
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value={''} disabled>
                    <Typography variant='caption'>Select type</Typography>
                  </MenuItem>
                  <Divider />
                  {Object.keys(POKEMON_TYPES).map((type, index) => (
                    <MenuItem key={index} value={type}>
                      <SvgIcon htmlColor={iconMapping[type].color} fontSize='small'>{iconMapping[type].icon}</SvgIcon>
                      <Typography variant='body2' ml={1}>{capitalize(type)}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ability ? ability : 'Select ability'}
                  fullWidth
                  size='small'
                  onChange={handleAbilityChange}
                  renderValue={(val) => (
                    <Typography variant='body2'>{capitalize(val)}</Typography>
                  )}
                  startAdornment={
                    <InputAdornment position="start">
                      {/* {type && <SvgIcon htmlColor={iconMapping[type].color} fontSize='small'>{iconMapping[type].icon}</SvgIcon>} */}
                    </InputAdornment>
                  }
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value={''} disabled>
                    <Typography variant='caption'>Select ability</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem key={0} value={'ability'}>
                    <Typography variant='body2' ml={1}>Ability</Typography>
                  </MenuItem>
                </Select>
              </Grid>
              <Grid size={{ xs: 12, md: 'auto' }}>
                <Button variant='contained' fullWidth>
                  <RestartAlt />
                </Button>
              </Grid>
            </Grid>
            <Grid container size={12}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', p: 3 }}>
                <Grid container size={12} spacing={2}>
                  <Stack direction='row' justifyContent='flex-end' width='100%'>
                    <Typography variant='body2'>Sort by:</Typography>
                    <Typography variant='body2' mx={0.5}>Ascending</Typography>
                    <ArrowDownward fontSize='small' />
                  </Stack>  
                  <Box width='100%' minHeight={500} maxHeight={500} sx={{ overflowY: 'auto' }}>
                    <Box display='inline-block' m={1} p={1} borderRadius={2} sx={{ cursor: 'pointer', ':hover': { bgcolor: '#eee' } }} onClick={(e: any) => handleOpenMenu(e, 'storage')}
                      onMouseEnter={(e) => setPopperEl(e.currentTarget)}
                      onMouseLeave={() => setPopperEl(null)}>
                      <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif`} width={32} height={32} alt='party-pokemon' />
                    </Box>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default PokemonCenter
