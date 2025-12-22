"use client";

import { POKEMON_TYPES } from '@/constants/typeConstants'
import { PokemonTypeKey } from '@/types/Pokemon'
import { capitalize, getDualTypeEffectiveness, getEffectiveness } from '@/utils/commonUtils'
import { Adjust, ArrowDownward, AutoStories, ChangeHistory, Clear, Details, NotInterested, RadioButtonChecked, Search, WaterDrop } from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, Input, InputAdornment, InputBase, MenuItem, Paper, Select, SelectChangeEvent, Stack, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import TypeIndicator, { iconMapping } from '@/components/common/TypeIndicator'
import { useState } from 'react';
import Image from 'next/image';

const Handbook = () => {
  {/* TO DO: 
    - Ability List
  */}
  const [dualType, setDualType] = useState<PokemonTypeKey | null>();
  const [moveType, setMoveType] = useState('');
  const [moveCategory, setMoveCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDualType(event.target.value as PokemonTypeKey);
  }
  
  const handleMoveTypeChange = (event: SelectChangeEvent) => {
    setMoveType(event.target.value as string);
  };

  const handleMoveCategoryChange = (event: SelectChangeEvent) => {
    setMoveCategory(event.target.value as string);
  };

  return (
    <Stack gap={2} mb={6}>
      <Stack direction='row' alignItems='center' gap={1}>
        <AutoStories fontSize='medium' />
        <Typography variant='button' fontSize={14} fontWeight='bold'>Handbook</Typography>
      </Stack>
      <Stack gap={0.5} mt={1}>
        <Typography variant='h5' fontWeight='bold'>Type Chart</Typography>
        <Box width={40} height={3} bgcolor='#333'></Box>
      </Stack>
      <Typography variant='body2'>This chart shows how effective each type is against one another.</Typography>
      <Stack direction={{ md: 'column', lg: 'row' }}  justifyContent='space-between' spacing={1} rowGap={{ xs: 1 }}>
        <Stack direction='row' spacing={1}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dualType ? dualType : 'Select secondary type'}
            size='small'
            onChange={handleChange}
            renderValue={(val) => (
              <Typography variant='body2'>{capitalize(val)}</Typography>
            )}
            startAdornment={
              <InputAdornment position="start">
                {dualType && <SvgIcon htmlColor={iconMapping[dualType].color} fontSize='small'>{iconMapping[dualType].icon}</SvgIcon>}
              </InputAdornment>
            }
            sx={{ width: 250 }}
          >
            <MenuItem value={''} disabled>
              <Typography variant='caption'>Select secondary type</Typography>
            </MenuItem>
            <Divider />
            {Object.keys(POKEMON_TYPES).map((type, index) => (
              <MenuItem key={index} value={type}>
                <SvgIcon htmlColor={iconMapping[type].color} fontSize='small'>{iconMapping[type].icon}</SvgIcon>
                <Typography variant='body2' ml={1}>{capitalize(type)}</Typography>
              </MenuItem>
            ))}
          </Select>
          <IconButton onClick={() => setDualType(null)}>
            <NotInterested />
          </IconButton>
        </Stack>
        <Stack direction={{ md: 'column', lg: 'row' }} spacing={{ xs: 0.5, lg: 1.5 }}>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Clear htmlColor='#555' fontSize='small' />
            <Typography variant='body2'>Immune</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Details htmlColor='error' fontSize='small' />
            <Typography variant='body2'>Ineffective</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <ChangeHistory htmlColor='error' fontSize='small' />
            <Typography variant='body2'>Not Very Effective</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Adjust htmlColor='success' fontSize='small' />
            <Typography variant='body2'>Effective</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <RadioButtonChecked htmlColor='success' fontSize='small' />
            <Typography variant='body2'>Super Effective</Typography>
          </Stack>
        </Stack>
      </Stack>
      <TableContainer component={Paper} sx={{ p: 2 }}>
        <Table padding='checkbox'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5} p={1}>
                  <Typography variant='body2' fontWeight='bold' textAlign='center'>Effectiveness Against</Typography>
                  <ArrowDownward sx={{ fontSize: 16 }} />
                </Stack>
              </TableCell>
              {Object.keys(POKEMON_TYPES).map((type) => (
                <TableCell 
                  key={type} 
                  sx={{ 
                    textAlign: 'center',
                    borderLeft: '1px solid #eee',
                    p: 0,
                  }}>{<TypeIndicator variant='icon' name={type as PokemonTypeKey} />}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {Object.keys(POKEMON_TYPES).map((attack) => {
              return (
                <TableRow key={attack} sx={{ '&:last-child td': { borderBottom: 'none' }, '&:hover': { bgcolor: '#f7f7f7ff' } }}>
                  <TableCell sx={{ px: 1, width: dualType ? 200 : 'auto' }}>
                    <Grid container direction={{ xs: 'column', md: 'row' }} size={12} columnSpacing={1} rowSpacing={0.5} py={{ xs: 1, md: 0 }}>
                        {(dualType && dualType !== attack) && (
                          <Grid size='grow'>
                            <TypeIndicator variant='chip' name={dualType as PokemonTypeKey} fullWidth />
                          </Grid>
                        )}
                      <Grid size={dualType && dualType !== attack ? 'grow' : 12}>
                        <TypeIndicator variant='chip' name={attack as PokemonTypeKey} fullWidth />
                      </Grid>
                    </Grid>
                  </TableCell>
                  {Object.keys(POKEMON_TYPES).map((defense) => {
                    const value = dualType ? getDualTypeEffectiveness(defense, [attack, dualType]) : getEffectiveness(attack, defense);
                    return (
                      <TableCell
                        key={defense}
                        sx={{ borderLeft: '1px solid #eee', p: 0 }}
                      >
                        <Box display='flex' justifyContent='center' alignItems='center' py={1}>
                          {value === 0 && <Clear htmlColor='#555' />}
                          {value === 0.25 && <Details htmlColor='error' />}
                          {value === 0.5 && <ChangeHistory htmlColor='error' />}
                          {value === 2 && <Adjust htmlColor='success' />}
                          {value === 4 && <RadioButtonChecked htmlColor='success' />}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack gap={0.5} mt={2}>
        <Typography variant='h5' fontWeight='bold'>Move Repository</Typography>
        <Box width={40} height={3} bgcolor='#333'></Box>
      </Stack>
      <Typography variant='body2'>A full list of every Pokemon move from all generations.</Typography>
      <Stack direction='column' gap={2} pb={4}>
        <Grid container size={12} spacing={1}>
          <Grid size={3.5}>
            <TextField 
              placeholder='Search move'
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
          <Grid size={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={moveType ? moveType : 'Select type'}
              size='small'
              fullWidth
              onChange={handleMoveTypeChange}
              renderValue={(val) => (
                <Typography variant='body2'>{capitalize(val)}</Typography>
              )}
              startAdornment={
                <InputAdornment position="start">
                  {moveType && <SvgIcon htmlColor={iconMapping[moveType].color} fontSize='small'>{iconMapping[moveType].icon}</SvgIcon>}
                </InputAdornment>
              }
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
          <Grid size={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={moveCategory ? moveCategory : 'Select category'}
              size='small'
              fullWidth
              onChange={handleMoveCategoryChange}
              renderValue={(val) => (
                <Typography variant='body2'>{capitalize(val)}</Typography>
              )}
              startAdornment={
                <InputAdornment position="start">
                  {moveCategory === 'physical' && <Image src='https://img.pokemondb.net/images/icons/move-physical.png' height={15} width={30} alt='move-category' />}
                  {moveCategory === 'special' && <Image src='https://img.pokemondb.net/images/icons/move-special.png' height={15} width={30} alt='move-category' />}
                  {moveCategory === 'status' && <Image src='https://img.pokemondb.net/images/icons/move-status.png' height={15} width={30} alt='move-category' />}
                </InputAdornment>
              }
            >
              <MenuItem value={''} disabled>
                <Typography variant='caption'>Select category</Typography>
              </MenuItem>
              <Divider />
              <MenuItem value='physical'>
                <Image src='https://img.pokemondb.net/images/icons/move-physical.png' height={15} width={30} alt='move-category' />
                <Typography variant='body2' ml={1}>Physical</Typography>
              </MenuItem>
              <MenuItem value='special'>
                <Image src='https://img.pokemondb.net/images/icons/move-special.png' height={15} width={30} alt='move-category' />
                <Typography variant='body2' ml={1}>Special</Typography>
              </MenuItem>
              <MenuItem value='status'>
                <Image src='https://img.pokemondb.net/images/icons/move-status.png' height={15} width={30} alt='move-category' />
                <Typography variant='body2' ml={1}>Status</Typography>
              </MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12, md: 'auto' }}>
            <Button variant='custom' size='small' fullWidth>
              View All
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Table padding='checkbox'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Stack direction='row' justifyContent='flex-start' alignItems='center' gap={0.5} p={1}>
                    <Typography variant='body2' fontWeight='bold'>Name</Typography>
                    <ArrowDownward sx={{ fontSize: 16 }} />
                  </Stack>
                </TableCell>
                <TableCell sx={{ minWidth: 0 }}>
                  <Stack direction='row' justifyContent='center' alignItems='center'>
                    <Typography variant='body2' fontWeight='bold' textAlign='center'>Type</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction='row' justifyContent='center' alignItems='center'>
                    <Typography variant='body2' fontWeight='bold' textAlign='center'>Cat.</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5}>
                    <Typography variant='body2' fontWeight='bold'>Power</Typography>
                    <ArrowDownward sx={{ fontSize: 16 }} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5}>
                    <Typography variant='body2' fontWeight='bold'>Acc.</Typography>
                    <ArrowDownward sx={{ fontSize: 16 }} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5}>
                    <Typography variant='body2' fontWeight='bold'>PP</Typography>
                    <ArrowDownward sx={{ fontSize: 16 }} />
                  </Stack>
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <Typography variant='body2' fontWeight='bold'>Effect</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              <TableRow sx={{ '&:last-child td': { borderBottom: 'none' }, '&:hover': { bgcolor: '#f7f7f7ff' } }}>
                <TableCell sx={{ p: 1 }}>
                  <Typography variant='body2'>Absorb</Typography>
                </TableCell>
                <TableCell sx={{ p: 1 }}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <TypeIndicator variant='chip' name='grass' />
                  </Box>
                </TableCell>
                <TableCell sx={{ p: 1 }}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <Image src='https://img.pokemondb.net/images/icons/move-special.png' height={20} width={40} alt='move-category' />
                  </Box>
                </TableCell>
                <TableCell sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant='body2'>20</Typography>
                </TableCell>
                <TableCell sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant='body2'>100</Typography>
                </TableCell>
                <TableCell sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant='body2'>25</Typography>
                </TableCell>
                <TableCell sx={{ p: 1 }}>
                  <Typography variant='body2'>Absorb deals damage and the user will recover 50% of the HP drained.</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  )
}

export default Handbook
