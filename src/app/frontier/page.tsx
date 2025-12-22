"use client";

import React from 'react'
import { AccessTime, Castle, CatchingPokemon, FilterList, FilterListAlt, Info, MoreVert, Park, Tsunami, Volcano } from '@mui/icons-material'
import { Box, Button, Chip, Divider, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Stack, SvgIcon, Typography } from '@mui/material'
import Image from 'next/image'
import CommenceBattle from './CommenceBattle';
import PlayerBattle from './PlayerBattle';
import TrainerDetail from '../league/TrainerDetail';
import MatchHistory from './MatchHistory';

const BattleFrontier = () => {
  const [openChallenge, setOpenChallenge] = React.useState(false);
  const [openMatchHistory, setOpenMatchHistory] = React.useState(false);
  const [battleStart, setBattleStart] = React.useState(false);
  const [area, setArea] = React.useState<string>();

  const handleChangeArea = (event: SelectChangeEvent) => {
    setArea(event.target.value);
  }
  
  const handleOpenChallenge = () => setOpenChallenge(true);
  const handleCloseChallenge = () => setOpenChallenge(false);
  
  const handleOpenMatchHistory = () => setOpenMatchHistory(true);
  const handleCloseMatchHistory = () => setOpenMatchHistory(false);

  const handleStartBattle = () => {
    setBattleStart(true);
    handleCloseChallenge();
  };
  const handleEndBattle = () => {
    setBattleStart(false);
  };

  return (
    <>
      <MatchHistory
        open={openMatchHistory}
        handleClose={handleCloseMatchHistory}
      />
      <CommenceBattle 
        trainerType='challenge'
        open={openChallenge} 
        handleClose={handleCloseChallenge} 
        handleStartBattle={handleStartBattle}
        name='Youngster Joey'
        team={['19', '19']}
        img='https://archives.bulbagarden.net/media/upload/8/8d/ORAS_Youngster.png'
      />
      <PlayerBattle battleStart={battleStart} handleEndBattle={handleEndBattle} />
      <Stack display='flex' gap={2} mb={18}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Castle fontSize='medium' />
          <Typography variant='button' fontSize={14} fontWeight='bold'>Battle Frontier</Typography>
        </Stack>
        <Stack gap={0.5} mt={1}>
          <Typography variant='h5' fontWeight='bold'>Random Battles</Typography>
          <Box width={40} height={3} bgcolor='#333' />
        </Stack>
        <Grid container size={12} spacing={4}>
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <Stack mt={2}>
              <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0} mb={2}>Your Party</Typography>
              <Stack spacing={1.5}>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`} width={32} height={32} alt='party-pokemon' />
                  <Stack flexGrow={1}>
                    <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                    <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                    <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                  </Stack>
                </Paper>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif`} width={32} height={32} alt='party-pokemon' />
                  <Stack flexGrow={1}>
                    <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                    <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                    <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                  </Stack>
                </Paper>
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, height: 70, px: 2 }}>
                  <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif`} width={32} height={32} alt='party-pokemon' />
                  <Stack flexGrow={1}>
                    <Typography variant='body2' textAlign='start' width={80}>Squirtle</Typography>
                    <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                    <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                  </Stack>
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
          <Grid container size={9} direction='column' spacing={2}> 
            <Grid container size={12} justifyContent='space-between' alignItems='flex-end'>
              <Stack direction='row' alignItems='center' gap={0.5}>
                <Info fontSize='small' color='action' />
                <Typography variant='body2'>Random trainers reset in 1:00:00</Typography>
              </Stack>
              <Button variant='contained'>
                <AccessTime fontSize='small' />
                <Typography variant='button' ml={0.5} onClick={handleOpenMatchHistory}>Match History</Typography>
              </Button>
            </Grid>
            <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1, width: '100%', p: 3 }}>
              <Grid container size={12} height='100%'>
                <Grid container size={4} px={2} direction='column' sx={{ borderRight: '1px solid #ddd' }}>
                  <Stack direction='row' height={100} width='100%' gap={2}>
                    <Box width={100} borderRadius={2} bgcolor='#eee' sx={{ backgroundImage: `url(https://archives.bulbagarden.net/media/upload/8/8d/ORAS_Youngster.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                    <Stack flexGrow={1} spacing={0.5}>
                      <Stack direction='row' alignItems='center' gap={0.25}>
                        <Typography variant='body2'>Joey</Typography>
                        <Box height={24} width={24} sx={{ backgroundImage: `url(https://static.pokemon-vortex.com/v6/images/trainer_sprites/6.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                      </Stack>
                      <Stack direction='row' spacing={0.5}>
                        <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                        <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Box display='flex' mt={2} flexGrow={1}>
                    <Grid container size={12} spacing={2} height='fit-content'>
                      <Grid container size={6} justifyContent='center'>
                        <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Difficutly</Typography>
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Reward</Typography>
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Chip variant="filled" label="Easy" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Chip variant="filled" label="$ 100" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                      </Grid>
                    </Grid>
                  </Box>
                  <Button variant='contained' size='large' fullWidth sx={{ display: 'flex', gap: 1 }} onClick={handleOpenChallenge}>
                    <Typography variant='button'>Battle</Typography>
                    <CatchingPokemon fontSize='medium' />
                  </Button>
                </Grid>
                <Grid container size={4} px={2} direction='column' position='relative' sx={{ borderRight: '1px solid #ddd' }}>
                  <Stack direction='column' justifyContent='center' alignItems='center' position='absolute' bgcolor='rgba(255, 255, 255, 0.65)' height='100%' width='100%' left={-2} gap={0.5} mx={0.2}>
                    <CatchingPokemon sx={{ fontSize: 60 }} />
                    <Typography variant='h6'>Victory</Typography>
                  </Stack>
                  <Stack direction='row' height={100} width='100%' gap={2}>
                    <Box width={100} borderRadius={2} bgcolor='#eee' sx={{ backgroundImage: `url(https://archives.bulbagarden.net/media/upload/8/8d/ORAS_Youngster.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                    <Stack flexGrow={1} spacing={0.5}>
                      <Stack direction='row' alignItems='center' gap={0.25}>
                        <Typography variant='body2'>Joey</Typography>
                        <Box height={24} width={24} sx={{ backgroundImage: `url(https://static.pokemon-vortex.com/v6/images/trainer_sprites/6.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                      </Stack>
                      <Stack direction='row' spacing={0.5}>
                        <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                        <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Box display='flex' mt={2} flexGrow={1}>
                    <Grid container size={12} spacing={2} height='fit-content'>
                      <Grid container size={6} justifyContent='center'>
                        <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Difficutly</Typography>
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Reward</Typography>
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Chip variant="filled" label="Easy" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Chip variant="filled" label="$ 100" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                      </Grid>
                    </Grid>
                  </Box>
                  <Button variant='contained' size='large' disabled fullWidth sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant='button'>Battle</Typography>
                    <CatchingPokemon fontSize='medium' />
                  </Button>
                </Grid>
                <Grid container size={4} px={2} direction='column'>
                  <Stack direction='row' height={100} width='100%' gap={2}>
                    <Box width={100} borderRadius={2} bgcolor='#eee' sx={{ backgroundImage: `url(https://archives.bulbagarden.net/media/upload/8/8d/ORAS_Youngster.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                    <Stack flexGrow={1} spacing={0.5}>
                      <Stack direction='row' alignItems='center' gap={0.25}>
                        <Typography variant='body2'>Joey</Typography>
                        <Box height={24} width={24} sx={{ backgroundImage: `url(https://static.pokemon-vortex.com/v6/images/trainer_sprites/6.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                      </Stack>
                      <Stack direction='row' spacing={0.5}>
                        <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                        <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                        {/* <Box height={12} width={12} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
                      </Stack>
                    </Stack>
                  </Stack>
                  <Box display='flex' mt={2} flexGrow={1}>
                    <Grid container size={12} spacing={2} height='fit-content'>
                      <Grid container size={6} justifyContent='center'>
                        <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Difficutly</Typography>
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Typography variant='button' fontSize={14} fontWeight='bold' letterSpacing={0}>Reward</Typography>
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Chip variant="filled" label="Easy" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                      </Grid>
                      <Grid container size={6} justifyContent='center'>
                        <Chip variant="filled" label="$ 100" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                      </Grid>
                    </Grid>
                  </Box>
                  <Button variant='contained' size='large' fullWidth sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant='button'>Battle</Typography>
                    <CatchingPokemon fontSize='medium' />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Stack gap={0.5} mt={2}>
          <Typography variant='h5' fontWeight='bold'>NPC Trainers</Typography>
          <Box width={40} height={3} bgcolor='#333' />
        </Stack>
        {area && (
          <Grid container size={12} height={100} bgcolor='#ddd' borderRadius={2} sx={{ backgroundImage: `url(images/forest.jpg)`, backgroundPositionY: '-150px' }} p={2} mt={2} />
        )}
        <Grid container size={12} alignItems='flex-end' my={1}>
          <Grid size={7}>
            {area && (
              <Stack direction='row' alignItems='center' gap={0.5} mb={1}>
                {area === 'Forest' && <Park fontSize='medium' />}
                {area === 'Volcano' && <Volcano fontSize='medium' />}
                {area === 'Ocean' && <Tsunami fontSize='medium' />}
                <Typography variant='h5' fontWeight='bold'>{area}</Typography>
              </Stack>
            )}
            <Typography variant='body2'>
              Trainers in this area favor balanced teams and straightforward strategies. Battles here are designed to teach type matchups, switching, and basic move synergy.
            </Typography>
          </Grid>
          <Grid size={5}>
            <Stack direction='row' alignItems='center' gap={1} justifyContent='flex-end'>
              <Stack direction='row' alignItems='center' gap={0.25}>
                <FilterListAlt fontSize='small' />
                <Typography variant='body2' fontWeight='bold'>Filter by Area:</Typography>
              </Stack>
              <FormControl sx={{ width: 200 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={area || 'All Trainers'}
                  renderValue={(val) => (
                    <Box display='flex' alignItems='center' gap={1}>
                      {val === 'Forest' && <Park fontSize='small' />}
                      {val === 'Volcano' && <Volcano fontSize='small' />}
                      {val === 'Ocean' && <Tsunami fontSize='small' />}
                      <Typography variant='body2'>{val}</Typography>
                    </Box>
                  )}
                  size='small'
                  onChange={handleChangeArea}
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value={'All Trainers'}>
                    <Typography variant='body2' ml={1}>All Trainers</Typography>
                  </MenuItem>
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
            </Stack>
          </Grid>
        </Grid>
        <Grid container size={12} spacing={2}>
          <Grid size={4}>
            <Paper sx={{ borderRadius: 2, p: 1 }}>
              <TrainerDetail
                name='Ace Trainer Jenevelle'
                team={['45', '73', '22']}
                img='https://archives.bulbagarden.net/media/upload/a/a0/ORAS_Ace_Trainer_F.png'
                difficulty='Easy'
                reward='$ 300'
                size='small'
                handleOpen={handleOpenChallenge}
              />
            </Paper>
          </Grid>
          <Grid size={4}>
            <Paper sx={{ borderRadius: 2, p: 1 }}>
              <TrainerDetail
                name='Hiker Bob'
                team={['32', '32']}
                img='https://archives.bulbagarden.net/media/upload/6/6a/XY_Hiker.png'
                difficulty='Easy'
                reward='$ 300'
                size='small'
                handleOpen={handleOpenChallenge}
              />
            </Paper>
          </Grid>
          <Grid size={4}>
            <Paper sx={{ borderRadius: 2, p: 1 }}>
              <TrainerDetail
                name='Collector Dennis'
                team={['18', '3', '55', '98']}
                img='https://archives.bulbagarden.net/media/upload/4/44/ORAS_Collector.png'
                difficulty='Easy'
                reward='$ 300'
                size='small'
                handleOpen={handleOpenChallenge}
              />
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default BattleFrontier