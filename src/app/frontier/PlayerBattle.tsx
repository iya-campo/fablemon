"use client";

import React, { useEffect, useState } from 'react'
import { Box, Button, Chip, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import { ArrowBack, BusinessCenter, CatchingPokemon, FrontHand, MedicationLiquid, MoreVert, SportsMma } from '@mui/icons-material';
import EncounterActions from '@/components/EncounterActions';

const PlayerBattle = ({ battleStart, handleEndBattle }: any) => {
  const [activeAction, setActiveAction] = useState('idle');
  const [itemSelected, setItemSelected] = useState('');

  const handleChangeActiveAction = (newAction: string) => {
    setActiveAction(newAction);
    setItemSelected('')
  }

  useEffect(() => setActiveAction('idle'), [handleEndBattle]);

  return (
    <Modal
        open={battleStart}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
        <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
            <Stack direction='row' alignItems='center' gap={1} justifyContent='center'>
                <CatchingPokemon fontSize='medium' />
                <Typography variant='button' fontSize={14} fontWeight='bold' sx={{ display: 'flex', alignItems: 'center' }}>
                    Player
                    <Box mx={1} px={0.75} bgcolor='#ddd' borderRadius={1} fontSize={10} color='#555'>VS</Box>
                    Youngster Joey
                </Typography>
            </Stack>
            <Grid container flexGrow={1} spacing={2} height={350} position='relative'>
                <Grid size={4}>
                    {/* <Paper sx={{ borderRadius: 2, p: 2, height: '100%' }}> */}
                    <Box borderRadius={2} p={2} height='100%' border='1px solid #ddd'>
                        <Grid container spacing={2}>
                            <Grid container size={12} my={2} direction='column' alignItems='center' spacing={1}>
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`} width={32} height={32} alt='wild-pokemon' />
                            <Typography variant='body2' textAlign='center'>What will Bulbasaur do?</Typography>
                            </Grid>
                            <Grid size={6}>
                            <Button variant='contained' size='large' fullWidth onClick={() => handleChangeActiveAction('fight')}>
                                <Typography variant='button' mr={1}>Fight!</Typography>
                                <SportsMma fontSize='medium' />
                            </Button>
                            </Grid>
                            <Grid size={6}>
                            <Button variant='contained' size='large' fullWidth onClick={() => handleChangeActiveAction('pokemon')}>
                                <Typography variant='button' mr={1}>Pokemon</Typography>
                                <CatchingPokemon fontSize='medium' />
                            </Button>
                            </Grid>
                            <Grid size={6}>
                            <Button variant='contained' size='large' fullWidth onClick={() => handleChangeActiveAction('bag')}>
                                <Typography variant='button' mr={1}>Bag</Typography>
                                <BusinessCenter fontSize='medium' />
                            </Button>
                            </Grid>
                            <Grid size={6}>
                            <Button variant='contained' size='large' fullWidth onClick={() => handleChangeActiveAction('run')}>
                                <Typography variant='button' mr={1}>Forfeit</Typography>
                                <FrontHand fontSize='medium' />
                            </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* </Paper> */}
                </Grid>
                {activeAction === 'fight' && (
                    <Grid size={4} bgcolor='#fff' borderRadius={2} p={2} height='100%' position='absolute' border='1px solid #ddd'>
                    <Grid container spacing={2}>
                        <Grid size={12} my={1}>
                        <Button variant='text' size='small' sx={{ display: 'flex', gap: 0.5 }} onClick={() => handleChangeActiveAction('idle')}>
                            <ArrowBack color='action' sx={{ fontSize: 14 }} />
                            <Typography variant='caption' fontSize={12} fontWeight='bold' color='textSecondary'>Back</Typography>
                        </Button>
                        <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5}>
                            <Typography variant='h5' fontSize={20} fontWeight='bold'>Fight!</Typography>
                            <SportsMma fontSize='medium' />
                        </Stack>
                        <Typography variant='body2' textAlign='center' mt={1}>Please select a move.</Typography>
                        </Grid>
                        <Grid size={6}>
                        <Button variant='contained' color='inherit' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5 }}>
                            <Typography variant='body1' mr={1} textTransform='initial' fontWeight='bold'>Tackle</Typography>
                            <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
                            <Typography variant='caption' textAlign='center' bgcolor='#555' color='#fff' px={1} py={0.5} borderRadius={1} fontSize={10} fontWeight='bold'>Water</Typography>
                            <Typography variant='caption' textAlign='center'>PP 10/10</Typography>
                            </Stack>
                        </Button>
                        </Grid>
                        <Grid size={6}>
                        <Button variant='contained' color='inherit' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5 }}>
                            -
                        </Button>
                        </Grid>
                        <Grid size={6}>
                        <Button variant='contained' color='inherit' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5 }}>
                            -
                        </Button>
                        </Grid>
                        <Grid size={6}>
                        <Button variant='contained' color='inherit' size='large' fullWidth sx={{ display: 'flex', flexDirection: 'column', height: 70, p: 1, gap: 0.5 }}>
                            -
                        </Button>
                        </Grid>
                    </Grid>
                    </Grid>
                )}
                {activeAction === 'bag' && (
                    <Grid size={4} bgcolor='#fff' borderRadius={2} p={2} height='100%' position='absolute' border='1px solid #ddd'>
                    <Grid container spacing={1}>
                        <Grid size={12} my={1}>
                        <Button variant='text' size='small' sx={{ display: 'flex', gap: 0.5 }} onClick={() => handleChangeActiveAction('idle')}>
                            <ArrowBack color='action' sx={{ fontSize: 14 }} />
                            <Typography variant='caption' fontSize={12} fontWeight='bold' color='textSecondary'>Back</Typography>
                        </Button>
                        <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5}>
                            <Typography variant='h5' fontSize={20} fontWeight='bold'>Bag</Typography>
                            <BusinessCenter fontSize='medium' />
                        </Stack>
                        </Grid>
                        <Grid container size={6} height={230} sx={{ overflowY: 'auto' }}>
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
                    </Grid>
                    </Grid>
                )}
                {activeAction === 'pokemon' && (
                    <Grid size={4} bgcolor='#fff' borderRadius={2} p={2} height='100%' position='absolute' border='1px solid #ddd'>
                    <Grid container spacing={1}>
                        <Grid size={12} my={1}>
                        <Button variant='text' size='small' sx={{ display: 'flex', gap: 0.5 }} onClick={() => handleChangeActiveAction('idle')}>
                            <ArrowBack color='action' sx={{ fontSize: 14 }} />
                            <Typography variant='caption' fontSize={12} fontWeight='bold' color='textSecondary'>Back</Typography>
                        </Button>
                        <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5}>
                            <Typography variant='h5' fontSize={20} fontWeight='bold'>Pokemon</Typography>
                            <CatchingPokemon fontSize='medium' />
                        </Stack>
                        <Typography variant='body2' textAlign='center' mt={1}>Select a Pokemon to switch out.</Typography>
                        </Grid>
                        <Grid container size={6} spacing={1}>
                        <Box sx={{ display: 'flex', gap: 1, bgcolor: '#ddd', px: 1, py: 1, width: '100%', height: 'fit-content' }} borderRadius={2}>
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`} width={32} height={32} alt='party-pokemon' />
                            <Stack flexGrow={1}>
                            <Typography variant='body2' textAlign='start' width={80}>Bulbasaur</Typography>
                            <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                            <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                            </Stack>
                            <IconButton size='small'>
                            <MoreVert fontSize='small' />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, bgcolor: '#ddd', px: 1, py: 1, width: '100%', height: 'fit-content' }} borderRadius={2}>
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif`} width={32} height={32} alt='party-pokemon' />
                            <Stack flexGrow={1}>
                            <Typography variant='body2' textAlign='start' width={80}>Charmander</Typography>
                            <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                            <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                            </Stack>
                            <IconButton size='small'>
                            <MoreVert fontSize='small' />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, bgcolor: '#ddd', px: 1, py: 1, width: '100%', height: 'fit-content' }} borderRadius={2}>
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif`} width={32} height={32} alt='party-pokemon' />
                            <Stack flexGrow={1}>
                            <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                            <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                            <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                            </Stack>
                            <IconButton size='small'>
                            <MoreVert fontSize='small' />
                            </IconButton>
                        </Box>
                        </Grid>
                        <Grid container size={6} spacing={1}>
                        </Grid>
                    </Grid>
                    </Grid>
                )}
                {activeAction === 'run' && (
                    <Grid size={4} bgcolor='#fff' borderRadius={2} p={2} height='100%' position='absolute' border='1px solid #ddd'>
                    <Grid container spacing={1}>
                        <Grid size={12} my={1}>
                        <Button variant='text' size='small' sx={{ display: 'flex', gap: 0.5 }} onClick={() => handleChangeActiveAction('idle')}>
                            <ArrowBack color='action' sx={{ fontSize: 14 }} />
                            <Typography variant='caption' fontSize={12} fontWeight='bold' color='textSecondary'>Back</Typography>
                        </Button>
                        <Stack direction='row' justifyContent='center' alignItems='center' gap={0.5}>
                            <Typography variant='h5' fontSize={20} fontWeight='bold'>Forfeit</Typography>
                            <FrontHand fontSize='medium' />
                        </Stack>
                        <Typography variant='body2' textAlign='center' mt={1}>{`Are you sure you want to forfeit?`}</Typography>
                        <Stack direction='row' justifyContent='center' spacing={1} mt={2}>
                            <Button variant='contained' onClick={handleEndBattle}>
                            Yes  
                            </Button>
                            <Button variant='contained' onClick={() => handleChangeActiveAction('idle')}>
                            No
                            </Button>
                        </Stack>
                        </Grid>
                    </Grid>
                    </Grid>
                )}
                <Grid size={8}>
                    <Box display='flex' borderRadius={2} p={2} height='100%' border='1px solid #ddd'>
                        <Stack flexGrow={1} justifyContent='space-between' bgcolor='#eee' borderRadius={2} p={1}>
                            <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1}>
                            <Box bgcolor='#ffff' width={150} borderRadius={2} py={1} px={1}>
                                <Stack flexGrow={1} spacing={0.5}>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Typography variant='body2' textAlign='start'>Bulbasaur</Typography>
                                    <Typography variant='body2' textAlign='start'>Lvl. 5</Typography>
                                </Stack>
                                    <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
                                    <Chip variant='filled' label={
                                    <Typography variant='caption' fontSize={10}>PAR</Typography>
                                    } size='small' sx={{ height: 20, borderRadius: 1, 'span': { py: 0, px: 0.25 } }} />
                                    <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                                </Stack>
                                </Stack>
                            </Box>
                            {/* <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/1.png`} width={150} height={150} alt='wild-pokemon' style={{ margin: -10 }} /> */}
                            </Stack>
                            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                            {/* <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/1.png`} width={150} height={150} alt='player-pokemon' style={{ margin: -10 }} /> */}
                                <Box bgcolor='#ffff' width={150} borderRadius={2} py={1} px={1}>
                                    <Stack flexGrow={1} spacing={0.5}>
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography variant='body2' textAlign='start'>Bulbasaur</Typography>
                                        <Typography variant='body2' textAlign='start'>Lvl. 5</Typography>
                                    </Stack>
                                        <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
                                        <Chip variant='filled' label={
                                        <Typography variant='caption' fontSize={10}>PAR</Typography>
                                        } size='small' sx={{ height: 20, borderRadius: 1, 'span': { py: 0, px: 0.25 } }} />
                                        <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                                    </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Stack>
                        <Box bgcolor='#fff' height='100%' width={200} alignSelf='flex-end' p={2}>
                            <Typography variant='caption'>Bulbasaur took 999 damage!</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    </Modal>
  )
}

export default PlayerBattle
