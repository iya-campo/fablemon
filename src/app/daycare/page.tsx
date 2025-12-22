"use client";

import TypeIndicator, { iconMapping } from '@/components/common/TypeIndicator';
import FeedPokeblock from '@/components/FeedPokeblock';
import { capitalize } from '@/utils/commonUtils';
import { AccessTime, Check, Close, CrueltyFree, Equalizer, FavoriteBorderOutlined, Insights, Male, VolunteerActivism, WaterDrop, Whatshot } from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, Stack, SvgIcon, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import Image from 'next/image';
import { useState } from 'react'
import EvolvePokemon from './EvolvePokemon';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ flexGrow: 1 }}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DayCare = () => {
  const [openEvolution, setOpenEvolution] = useState(false);
  const [slot1, setSlot1] = useState('')
  const [slot2, setSlot2] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedMoves, setSelectedMoves] = useState('')
  const [tabValue, setTabValue] = useState(0);

  const handleChangePokemon = (event: SelectChangeEvent) => setSelectedPokemon(event.target.value);
  const handleChangeItem = (event: SelectChangeEvent) => setSelectedItem(event.target.value);
  const handleChangeSlot1 = (event: SelectChangeEvent) => setSlot1(event.target.value);
  const handleChangeSlot2 = (event: SelectChangeEvent) => setSlot2(event.target.value);

  const handleOpenEvolution = () => setOpenEvolution(true);
  const handleCloseEvolution = () => setOpenEvolution(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };


  {/* TO DO: 
    - Day Care section
  */}
  return (
    <>
      <EvolvePokemon
        name='Squirtle'
        img1='https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/7.gif'
        img2='https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/8.gif'
        open={openEvolution}
        handleClose={handleCloseEvolution}
      />
      <Stack gap={2} mb={6}>
        <Stack direction='row' alignItems='center' gap={1}>
          <CrueltyFree fontSize='medium' />
          <Typography variant='button' fontSize={14} fontWeight='bold'>Day Care</Typography>
        </Stack>
        <Grid container size={12} mt={1}>
          <Paper elevation={1} sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, flexWrap: 'revert', height: '100%', width: '100%', gap: 2, p: 4 }}>
            <Grid container size={{ sm: 12, md: 7, lg: 8 }} direction='column' spacing={1}>
              <Typography variant='body1' fontWeight='bold'>Welcome to the Pokémon Nursery!</Typography>
              <Typography variant='body2'>Bring your Pokémon to the counter to heal, and our staff will take care of the rest. While you wait, feel free to relax and get ready for your next challenge!</Typography>
              <Grid container spacing={2} my={2}>
                {slot1 ? (
                  <Grid container size={{ xs: 12, lg: 6 }} direction='column' justifyContent='space-between' borderRadius={2} border='1px solid #ddd' p={2} height={200}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <Typography variant='caption' fontWeight='bold'>Level raised from 5 → 6</Typography>
                      <Tooltip title='Withdraw Pokemon'>
                        <IconButton sx={{ p: 0 }} onClick={() => setSlot1('')}>
                          <Close fontSize='small' color='action' />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                      <Image src='https://archives.bulbagarden.net/media/upload/2/27/0004Charmander.png' height={80} width={80} alt='your-pokemon-1' style={{ objectFit: 'cover' , objectPosition: 'top center' }} />
                      <Stack spacing={1}>
                        <Stack direction='row' alignItems='center' spacing={0.5}>
                          <Typography variant='body1' fontWeight='bold'>Charmander</Typography>
                          <Male fontSize='small' sx={{ color: 'lightblue' }} />
                        </Stack>
                        <TypeIndicator variant='chip' name='fire' />
                        <Stack direction='row' alignItems='center' spacing={0.5}>
                          <AccessTime color='action' sx={{ fontSize: 16 }} />
                          <Typography variant='caption' color='textSecondary' fontWeight='bold' mt={0.5}>1hr 4m</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Typography variant='body2' color='textSecondary' fontWeight='bold' fontSize={10}>EXP</Typography>
                      <Box display='flex' flexGrow={1} height={5} bgcolor='#ddd' borderRadius={50} />
                    </Stack>
                  </Grid>
                ) : 
                  <Grid container justifyContent='center' alignItems='center' flexGrow={1} borderRadius={2} border='1px solid #ddd' p={2} height={200} position='relative'>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant='standard'
                      value={slot1 ? slot1 : 'Select Pokemon'}
                      size='small'
                      onChange={handleChangeSlot1}
                      renderValue={(val) => (
                        <Typography variant='body2'>{capitalize(val)}</Typography>
                      )}
                      startAdornment={
                        <InputAdornment position="start">
                          {slot1 && <SvgIcon fontSize='small'>{}</SvgIcon>}
                        </InputAdornment>
                      }
                      sx={{ width: 200 }}
                    >
                      <MenuItem value={''} disabled>
                        <Typography variant='caption'>Select Pokemon</Typography>
                      </MenuItem>
                      <Divider />
                      {['Bulbasaur', 'Charmander', 'Squirtle'].map((pokemon, index) => (
                        <MenuItem key={index} value={pokemon}>
                          <Typography variant='body2' ml={1}>{capitalize(pokemon)}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant='body2' fontWeight='bold' sx={{ position: 'absolute', top: 16 }}>Slot #1</Typography>
                  </Grid>
                }
                {slot2 ? (
                  <Grid container size={{ xs: 12, lg: 6 }} direction='column' justifyContent='space-between' borderRadius={2} border='1px solid #ddd' p={2} height={200}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <Typography variant='caption' fontWeight='bold'>Level raised from 5 → 6</Typography>
                      <Tooltip title='Withdraw Pokemon'>
                        <IconButton sx={{ p: 0 }} onClick={() => setSlot1('')}>
                          <Close fontSize='small' color='action' />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                      <Image src='https://archives.bulbagarden.net/media/upload/2/27/0004Charmander.png' height={80} width={80} alt='your-pokemon-1' style={{ objectFit: 'cover' , objectPosition: 'top center' }} />
                      <Stack spacing={1}>
                        <Stack direction='row' alignItems='center' spacing={0.5}>
                          <Typography variant='body1' fontWeight='bold'>Charmander</Typography>
                          <Male fontSize='small' sx={{ color: 'lightblue' }} />
                        </Stack>
                        <TypeIndicator variant='chip' name='fire' />
                        <Stack direction='row' alignItems='center' spacing={0.5}>
                          <AccessTime color='action' sx={{ fontSize: 16 }} />
                          <Typography variant='caption' color='textSecondary' fontWeight='bold' mt={0.5}>1hr 4m</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Typography variant='body2' color='textSecondary' fontWeight='bold' fontSize={10}>EXP</Typography>
                      <Box display='flex' flexGrow={1} height={5} bgcolor='#ddd' borderRadius={50} />
                    </Stack>
                  </Grid>
                ) : 
                  <Grid container justifyContent='center' alignItems='center' flexGrow={1} borderRadius={2} border='1px solid #ddd' p={2} height={200} position='relative'>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant='standard'
                      value={slot2 ? slot2 : 'Select Pokemon'}
                      size='small'
                      onChange={handleChangeSlot2}
                      renderValue={(val) => (
                        <Typography variant='body2'>{capitalize(val)}</Typography>
                      )}
                      startAdornment={
                        <InputAdornment position="start">
                          {slot2 && <SvgIcon fontSize='small'>{}</SvgIcon>}
                        </InputAdornment>
                      }
                      sx={{ width: 200 }}
                    >
                      <MenuItem value={''} disabled>
                        <Typography variant='caption'>Select Pokemon</Typography>
                      </MenuItem>
                      <Divider />
                      {['Bulbasaur', 'Charmander', 'Squirtle'].map((pokemon, index) => (
                        <MenuItem key={index} value={pokemon}>
                          <Typography variant='body2' ml={1}>{capitalize(pokemon)}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant='body2' fontWeight='bold' sx={{ position: 'absolute', top: 16 }}>Slot #2</Typography>
                  </Grid>
                }
              </Grid>
              <Button variant='contained' size='medium'>
                Confirm Pokemon
              </Button>
            </Grid>
            <Grid size={{ sm: 12, md: 5, lg: 4 }} bgcolor='#ddd' borderRadius={2} minHeight={200} sx={{ backgroundImage: `url(/images/pokemon-nursery.webp)`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
          </Paper>
        </Grid>
        <Stack gap={0.5} mb={1} mt={2}>
          <Typography variant='h5' fontWeight='bold'>Playground</Typography>
          <Box width={40} height={3} bgcolor='#333' />
        </Stack>
        <Grid container size={12} spacing={2}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedPokemon ? selectedPokemon : 'Select Pokemon'}
            size='small'
            onChange={handleChangePokemon}
            renderValue={(val) => (
              <Typography variant='body2'>{capitalize(val)}</Typography>
            )}
            startAdornment={
              <InputAdornment position="start">
                {selectedPokemon && <SvgIcon fontSize='small'>{}</SvgIcon>}
              </InputAdornment>
            }
            sx={{ width: 250 }}
          >
            <MenuItem value={''} disabled>
              <Typography variant='caption'>Select Pokemon</Typography>
            </MenuItem>
            <Divider />
            {['Bulbasaur', 'Charmander', 'Squirtle'].map((pokemon, index) => (
              <MenuItem key={index} value={pokemon}>
                <Typography variant='body2' ml={1}>{capitalize(pokemon)}</Typography>
              </MenuItem>
            ))}
          </Select>
          <Grid container size={12}>
            <Paper sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%', width: '100%', p: 2, gap: 2 }}>
              <Grid container flexDirection='column' size={{ xs: 12, md: 6 }} minHeight={200} bgcolor='#f0f2f7ff' borderRadius={2} p={2}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleChangeTab} 
                    aria-label="basic tabs example">
                    <Tab label="Current Moves" {...a11yProps(0)} sx={{ flexGrow: 1 }} />
                    <Tab label="Learn Moves" {...a11yProps(1)} sx={{ flexGrow: 1 }} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                  <Grid container size={12} spacing={2} mt={4}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Button variant='text' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5, bgcolor: 'white', boxShadow: '0px 1px 2px #b7b9bdff', position: 'relative' }}>
                        <Typography variant='body1' mr={1} textTransform='initial' fontWeight='bold'>Water Gun</Typography>
                        <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
                          <TypeIndicator name='water' variant='chip' />
                          <Typography variant='caption' textAlign='center' color='textPrimary'>PP 10/10</Typography>
                        </Stack>
                        <Tooltip title="Forget move">
                          <Close color='action' fontSize='small' sx={{ position: 'absolute', top: 4, right: 4, p: 0 }} />
                        </Tooltip>
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Button variant='text' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5, bgcolor: 'white', boxShadow: '0px 1px 2px #b7b9bdff' }}>
                        <Typography variant='body1' mr={1} textTransform='initial' fontWeight='bold'>-</Typography>
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Button variant='text' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5, bgcolor: 'white', boxShadow: '0px 1px 2px #b7b9bdff' }}>
                        <Typography variant='body1' mr={1} textTransform='initial' fontWeight='bold'>-</Typography>
                      </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Button variant='text' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5, bgcolor: 'white', boxShadow: '0px 1px 2px #b7b9bdff' }}>
                        <Typography variant='body1' mr={1} textTransform='initial' fontWeight='bold'>-</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                  <Stack direction='row' gap={1} mt={2} mb={1}>
                    <Button variant='contained' disableElevation size='small'>Available</Button>
                    <Button variant='outlined' size='small'>TM</Button>
                  </Stack>
                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    sx={{ minHeight: 250 }}
                  >
                    <ListItemButton sx={{ py: 0.25, borderBottom: 1, borderColor: '#ddd' }} onClick={() => setSelectedMoves('pokeball')}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <WaterDrop htmlColor={iconMapping['water'].color} />
                      </ListItemIcon>
                      <ListItemText primary="Hydro Pump" />
                      <Stack direction='row' alignItems='center' spacing={0.5}>
                        <Check fontSize='small' color='action' />
                        <Typography variant='body2' color='textSecondary'>Learned</Typography>
                      </Stack>
                    </ListItemButton>
                    <ListItemButton sx={{ py: 0.25, borderBottom: 1, borderColor: '#ddd' }} onClick={() => setSelectedMoves('potion')}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Whatshot htmlColor={iconMapping['fire'].color} />
                      </ListItemIcon>
                      <ListItemText primary="Flamethrower" />
                      <Stack direction='row' alignItems='center' spacing={0.5}>
                        <Check fontSize='small' color='action' />
                        <Typography variant='body2' color='textSecondary'>Learned</Typography>
                      </Stack>
                    </ListItemButton>
                  </List>
                </CustomTabPanel>
                <Divider sx={{ my: 4 }} />
                <Grid size={12}>
                  <Typography variant='body2'>
                    The user attacks the target with an echoing voice. If this move is used consecutively by an Pokemon, its power is boosted.
                  </Typography>
                </Grid>
                <Grid container size={12} spacing={1} my={2}>
                  <Grid container size={4} spacing={0} direction='column' alignItems='center'>
                    <Typography variant='body2'>Category</Typography>
                    <Typography variant='body1' fontWeight='bold'>-</Typography>
                  </Grid>
                  <Grid container size={4} spacing={0} direction='column' alignItems='center' borderLeft='1px solid #ccc' borderRight='1px solid #ccc'>
                    <Typography variant='body2'>Power</Typography>
                    <Typography variant='body1' fontWeight='bold'>10</Typography>
                  </Grid>
                  <Grid container size={4} spacing={0} direction='column' alignItems='center'>
                    <Typography variant='body2'>Accuracy</Typography>
                    <Typography variant='body1' fontWeight='bold'>100</Typography>
                  </Grid>
                </Grid>
                <Button variant='contained' size='large' fullWidth sx={{ py: 1.5, mt: 1.5 }}>
                  <Typography variant='body2' color='white' fontWeight='bold'>Save Changes</Typography>
                </Button>
              </Grid>
              <Grid container size={{ xs: 12, md: 6}} direction='column' px={2} py={2}>
                <Grid container size={12} spacing={2}>
                  <Grid size={4}>
                    <Box bgcolor='#ddd' height='100%' borderRadius={2} sx={{ backgroundImage: `url(https://img.pokemondb.net/artwork/avif/squirtle.avif)`, backgroundPosition: 'top center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></Box>
                  </Grid>
                  <Grid container size={8} direction='column' spacing={0}>
                    <Typography variant='button' color='textSecondary' fontWeight='bold'>#007</Typography>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' mb={1} flexWrap='wrap'>
                      <Stack direction='row' alignItems='center' gap={1}>
                        <Typography variant='h6' fontWeight='bold'>Squirtle</Typography>
                        <Typography variant='body2' color='textSecondary' fontWeight='bold'>Lv. 5</Typography>
                        <Male fontSize='small' sx={{ color: 'lightblue' }} />
                      </Stack>
                      <Box height={20} width={20} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                    </Stack>
                    <TypeIndicator variant='chip' name='water' />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid container size={12} justifyContent='space-around' alignItems='center' rowGap={2}>
                  <Grid container size={{ xs: 12, sm: 'grow' }} direction='column' spacing={0.5}>
                    <Typography variant='body2' fontWeight='bold'>Held Item</Typography>
                    <Select
                      variant='standard'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedItem ? selectedItem : 'None'}
                      size='small'
                      onChange={handleChangeItem}
                      renderValue={(val) => (
                        <Typography variant='body2'>{capitalize(val)}</Typography>
                      )}
                      startAdornment={
                        <InputAdornment position="start">
                          {selectedItem !== 'None' && <SvgIcon fontSize='small'>{}</SvgIcon>}
                        </InputAdornment>
                      }
                      sx={{ width: { xs: '100%', sm: 180 } }}
                    >
                      {['None', 'Oran Berry'].map((item, index) => (
                        <MenuItem key={index} value={item}>
                          <Typography variant='body2' ml={1}>{capitalize(item)}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid container size={{ xs: 12, sm: 'auto' }} direction='column' spacing={0.5}>
                    <Typography variant='body2' fontWeight='bold'>Affection</Typography>
                    <Stack direction='row' spacing={0.5}>
                      {[0, 1, 2, 3, 4].map((heart) => <FavoriteBorderOutlined  key={heart} />)}
                    </Stack>
                  </Grid>
                </Grid>
                <Stack direction='row' gap={0.5} mt={4}>
                  <Equalizer fontSize='small' color='action' />
                  <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Stats</Typography>
                </Stack>
                <Grid container size={12} spacing={1} alignItems='center'>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='end'>HP</Typography>
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                  </Grid>
                  <Grid size={8}>
                    <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='end'>Attack</Typography>
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                  </Grid>
                  <Grid size={8}>
                    <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='end'>Defense</Typography>
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                  </Grid>
                  <Grid size={8}>
                    <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='end'>Sp. Atk</Typography>
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                  </Grid>
                  <Grid size={8}>
                    <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='end'>Sp. Def</Typography>
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                  </Grid>
                  <Grid size={8}>
                    <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='end'>Speed</Typography>
                  </Grid>
                  <Grid size={2}>
                    <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                  </Grid>
                  <Grid size={8}>
                    <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                  </Grid>
                </Grid>
                <Stack justifyContent='center' alignItems='center' gap={0.5} border='1px solid #ddd' borderRadius={2} p={2} mt={2} sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f3f3f3ff' } }} onClick={handleOpenEvolution}>
                  <Insights color='action' sx={{ fontSize: 45 }} />
                  <Typography variant='body1'>Squirtle is ready to evolve!</Typography>
                </Stack>
                <Stack direction='row' spacing={1} height={40} mt={4}>
                  <Button variant='contained' disabled size='small' sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 170, position: 'relative' }}>
                    <Typography variant='caption'>Pet Pokemon</Typography>
                    <VolunteerActivism fontSize='small' />
                    <Typography 
                      variant='caption' 
                      color='error' 
                      textTransform='initial'
                      sx={{ position: 'absolute', bottom: -20 }}>
                        Pet again in 45:00:00
                    </Typography>
                  </Button>
                  <FeedPokeblock />
                </Stack>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default DayCare
