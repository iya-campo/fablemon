"use client";

import React from 'react'
import { AcUnit, ArrowDownward, ArrowRightAlt, Bolt, ChevronLeft, ChevronRight, ChromeReaderMode, Height, RestartAlt, Scale, Search, Twitter, WaterDrop, Whatshot } from '@mui/icons-material'
import { Box, Button, Chip, Divider, Grid, InputAdornment, MenuItem, Paper, Select, SelectChangeEvent, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import Image from 'next/image';

const Pokedex = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  {/* TO DO: 
    - Bookmark UI
    - Capture indicator
    - Search button
  */}
  return (
    <Stack gap={2} mb={6}>
      <Stack direction='row' alignItems='center' gap={1}>
        <ChromeReaderMode fontSize='medium' />
        <Typography variant='button' fontSize={14} fontWeight='bold'>Pokedex</Typography>
      </Stack>
      <Grid container size={12} spacing={4} mt={1}>
        <Grid container size={{ sm: 12, md: 7, lg: 8 }} height='fit-content'>
          <TextField 
            placeholder='Search Pokedex'
            fullWidth
            size='small'
            slotProps={{
              input: {
                startAdornment: <Search color='action' sx={{ mr: 1 }} />,
              },
            }}
            sx={{ height: '100%', backgroundColor: 'white', '& .MuiInputBase-input': { fontSize: '14px', height: '100%' } }} 
          />
          <Grid container size={12} direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' alignItems='center' height='fit-content'>
              <Typography variant='body2'>Sort by:</Typography>
              <Typography variant='body2' mx={0.5}>Ascending</Typography>
              <ArrowDownward fontSize='small' />
            </Stack>  
            <Stack direction='row' alignItems='center'>
              <Typography variant='body2'>from</Typography>
              <TextField placeholder='0' size='small' sx={{ mx: 1, width: 50, backgroundColor: 'white' }} />
              <Typography variant='body2'>to</Typography>
              <TextField placeholder='0' size='small' sx={{ ml: 1, width: 50, backgroundColor: 'white' }} />
            </Stack>
          </Grid> 
          <Grid container size={12} spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 2 }} flexGrow={{ sm: 1 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age ? age : '0'}
                size='small'
                onChange={handleChange}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <WaterDrop fontSize='small' />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: 'white',
                }}
              >
                <MenuItem value={0} disabled>
                  <Typography variant='caption'>Type</Typography>
                </MenuItem>
                <Divider />
                <MenuItem value={'Forest'}>
                  <Typography variant='body2' ml={1}>Forest</Typography>
                </MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }} flexGrow={{ sm: 1 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age ? age : '0'}
                size='small'
                onChange={handleChange}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <Bolt />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: 'white',
                }}
              >
                <MenuItem value={0} disabled>
                  <Typography variant='caption'>Ability</Typography>
                </MenuItem>
                <Divider />
                <MenuItem value={'Forest'}>
                  <Typography variant='body2' ml={1}>Forest</Typography>
                </MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }} flexGrow={{ sm: 1 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age ? age : '0'}
                size='small'
                onChange={handleChange}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <Scale fontSize='small' />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: 'white',
                }}
              >
                <MenuItem value={0} disabled>
                  <Typography variant='caption'>Weight</Typography>
                </MenuItem>
                <Divider />
                <MenuItem value={'Forest'}>
                  <Typography variant='body2' ml={1}>Forest</Typography>
                </MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }} flexGrow={{ sm: 1 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age ? age : '0'}
                size='small'
                onChange={handleChange}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <Height />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: 'white',
                }}
              >
                <MenuItem value={0} disabled>
                  <Typography variant='caption'>Height</Typography>
                </MenuItem>
                <Divider />
                <MenuItem value={'Forest'}>
                  <Typography variant='body2' ml={1}>Forest</Typography>
                </MenuItem>
              </Select>
            </Grid>
            <Grid>
              <Button variant='contained' sx={{ height: '100%' }} fullWidth>
                <RestartAlt />
              </Button>
            </Grid>
          </Grid>
          <Grid container size={12} spacing={2} mt={4}>
            <Grid size={4} height={155}>
              <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <Box display='flex' alignItems='flex-end' height={82} width='100%' mt={-7} sx={{ backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                <Typography variant='button' color='textSecondary' fontWeight='bold'>#001</Typography>
                <Typography variant='h6' fontWeight='bold' my={1}>Bulbasaur</Typography>
                <Stack direction='row' gap={1}>
                  <Typography variant='caption' textAlign='center' bgcolor='green' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Grass</Typography>
                  <Typography variant='caption' textAlign='center' bgcolor='purple' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Poison</Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid size={4} height={155}>
              <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <Box display='flex' alignItems='flex-end' height={82} width='100%' mt={-7} sx={{ backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                <Typography variant='button' color='textSecondary' fontWeight='bold'>#002</Typography>
                <Typography variant='h6' fontWeight='bold' my={1}>Ivysaur</Typography>
                <Stack direction='row' gap={1}>
                  <Typography variant='caption' textAlign='center' bgcolor='green' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Grass</Typography>
                  <Typography variant='caption' textAlign='center' bgcolor='purple' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Poison</Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid size={4} height={155}>
              <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <Box display='flex' alignItems='flex-end' height={82} width='100%' mt={-7} sx={{ backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                <Typography variant='button' color='textSecondary' fontWeight='bold'>#003</Typography>
                <Typography variant='h6' fontWeight='bold' my={1}>Venusaur</Typography>
                <Stack direction='row' gap={1}>
                  <Typography variant='caption' textAlign='center' bgcolor='green' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Grass</Typography>
                  <Typography variant='caption' textAlign='center' bgcolor='purple' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Poison</Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid> 
        </Grid>
        <Grid size={{ sm: 12, md: 5, lg: 4 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', minHeight: 500, p: 3 }}>
            <Box height={200} width='100%' sx={{ backgroundImage: 'url(/images/venusaur.jpg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
            <Typography variant='button' color='textSecondary' fontWeight='bold' mt={2}>#003</Typography>
            <Typography variant='h6' fontWeight='bold'>Venusaur</Typography>
            <Typography variant='button' color='textDisabled' fontWeight='bold' mb={1} textTransform='inherit' letterSpacing={0}>Plant Pokemon</Typography>
            <Stack direction='row' gap={1}>
              <Typography variant='caption' textAlign='center' bgcolor='green' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Grass</Typography>
              <Typography variant='caption' textAlign='center' bgcolor='purple' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold' textTransform='uppercase'>Poison</Typography>
            </Stack>
            <Typography variant='button' fontSize={14} fontWeight='bold' mt={2} mb={1} letterSpacing={0}>Pokedex Entry</Typography>
            <Typography variant='body2' letterSpacing={0} textAlign='center'>It swims as fast as a jet boat. The edges of its wings are sharp and can slice apart drifting ice.</Typography>
            <Typography variant='button' fontSize={14} fontWeight='bold' mt={2} mb={1} letterSpacing={0}>Abilities</Typography>
            <Grid container size={12} spacing={1}>
              <Grid size={6}>
                <Chip variant="outlined" label="Torrent" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
              </Grid>
              <Grid size={6}>
                <Chip variant="outlined" label="Defiant" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
              </Grid>
            </Grid>
            <Grid container size={12} spacing={1} mt={2}>
              <Grid container size={6} justifyContent='center'>
                <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Height</Typography>
              </Grid>
              <Grid container size={6} justifyContent='center'>
                <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Width</Typography>
              </Grid>
              <Grid container size={6} justifyContent='center'>
                <Chip variant="filled" label="1.7m" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
              </Grid>
              <Grid container size={6} justifyContent='center'>
                <Chip variant="filled" label="84.5kg" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
              </Grid>
            </Grid>
            <Grid container size={12} spacing={1} mt={2}>
              <Grid container size={6} justifyContent='center'>
                <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Weakness</Typography>
              </Grid>
              <Grid container size={6} justifyContent='center'>
                <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Base Exp</Typography>
              </Grid>
              <Grid container size={6} justifyContent='center'>
                <Chip variant="filled" label={<Stack direction='row' alignItems='center' spacing={0.25}>
                    <SvgIcon sx={{ bgcolor: '#f03f3fff', borderRadius: 50, p: 0.5 }}>
                      <Whatshot sx={{ color: '#fff' }} />
                    </SvgIcon>
                    <SvgIcon sx={{ bgcolor: '#6dd3e6ff', borderRadius: 50, p: 0.5 }}>
                      <AcUnit sx={{ color: '#fff' }} />
                    </SvgIcon>
                    <SvgIcon sx={{ bgcolor: '#abcbf8ff', borderRadius: 50, p: 0.5 }}>
                      <Twitter sx={{ color: '#fff' }} />
                    </SvgIcon>
                  </Stack>} component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
              </Grid>
              <Grid container size={6} justifyContent='center'>
                <Chip variant="filled" label="239" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
              </Grid>
            </Grid>
            <Typography variant='button' fontSize={14} fontWeight='bold' mt={2} mb={1} letterSpacing={0}>Stats</Typography>
            <Grid container size={12} spacing={1} alignItems='center'>
              <Grid size={3}>
                <Typography variant='body2' letterSpacing={0} textAlign='end'>Attack</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
              </Grid>
              <Grid size={7}>
                <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
              </Grid>
              <Grid size={3}>
                <Typography variant='body2' letterSpacing={0} textAlign='end'>Defense</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
              </Grid>
              <Grid size={7}>
                <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
              </Grid>
              <Grid size={3}>
                <Typography variant='body2' letterSpacing={0} textAlign='end'>Sp. Atk</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
              </Grid>
              <Grid size={7}>
                <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
              </Grid>
              <Grid size={3}>
                <Typography variant='body2' letterSpacing={0} textAlign='end'>Sp. Def</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
              </Grid>
              <Grid size={7}>
                <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
              </Grid>
              <Grid size={3}>
                <Typography variant='body2' letterSpacing={0} textAlign='end'>Speed</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
              </Grid>
              <Grid size={7}>
                <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
              </Grid>
            </Grid>
            <Typography variant='button' fontSize={14} fontWeight='bold' mt={2} mb={1} letterSpacing={0}>Evolution</Typography>
            <Grid container size={12} spacing={0.5} alignItems='center' height={50}>
              <Grid size={3} height='100%' sx={{ backgroundImage: 'url(/images/bulbasaur.avif)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
              <Grid size={1.5}>
                <Stack alignItems='center'>
                  <ArrowRightAlt fontSize='small' />
                  <Typography variant='caption' letterSpacing={0} textAlign='center'>Lv. 16</Typography>
                </Stack>
              </Grid>
              <Grid size={3} height='100%' sx={{ backgroundImage: 'url(/images/ivysaur.avif)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
              <Grid size={1.5}>
                <Stack alignItems='center'>
                  <ArrowRightAlt fontSize='small' />
                  <Typography variant='caption' letterSpacing={0} textAlign='center'>Lv. 36</Typography>
                </Stack>
              </Grid>
              <Grid size={3} height='100%' sx={{ backgroundImage: 'url(/images/venusaur.jpg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
            </Grid>
            <Grid container size={12} height={70} alignItems='center' bgcolor='#ddd' borderRadius={2} py={1} mt={4}>
              <Grid container size={5.5} justifyContent='flex-start' alignItems='center'>
                  <ChevronLeft />
                  <Typography variant='button' color='textSecondary' fontWeight='bold' mr={1}>#001</Typography>
                  <Typography variant='body2' color='textSecondary' fontWeight='bold'>Bulbasaur</Typography>
              </Grid>
              <Grid container flexGrow={1} justifyContent={'center'} height='100%' py={1}>
                <Box width={0.05} bgcolor='#9b9b9bff' />
              </Grid>
              <Grid container size={5.5} justifyContent='flex-end' alignItems='center'>
                  <Typography variant='body2' color='textSecondary' fontWeight='bold'>Ivysaur</Typography>
                  <Typography variant='button' color='textSecondary' fontWeight='bold' ml={1}>#002</Typography>
                  <ChevronRight />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Pokedex
