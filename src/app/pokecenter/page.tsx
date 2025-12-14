import React from 'react'
import { CatchingPokemon, LocalHospital } from '@mui/icons-material'
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'

const PokemonCenter = () => {
  return (
    <Stack display='flex' gap={2} mb={6}>
      <Stack direction='row' alignItems='center' gap={1}>
        <CatchingPokemon fontSize='medium' />
        <Typography variant='button' fontSize={14} fontWeight='bold'>Pokemon Center</Typography>
      </Stack>
      <Stack gap={0.5} mt={1}>
        <Typography variant='h5' fontWeight='bold'>Nurse Joy</Typography>
        <Box width={40} height={3} bgcolor='#333' />
      </Stack>
      <Grid container size={12} height={300}>
          <Paper elevation={1} sx={{ display: 'flex', height: '100%', width: '100%', p: 2 }}>
            <Grid size={6} height='100%' borderRadius={2} sx={{ backgroundImage: `url(/images/pokemon-center.jpg)`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
            <Grid container size={6} direction='column' justifyContent='center' alignItems='center'>
              <Grid container size={12}>
                <Grid container size={5} justifyContent='flex-end'>
                  <Stack direction='row' alignItems='center'>
                    <Box height={120} width={120} sx={{ backgroundImage: `url(/sprites/nurse-joy.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                    {/* <Image src={`https://img.pokemondb.net/sprites/black-white/normal/chansey.png`} width={80} height={80} alt='chansey' /> */}
                  </Stack>
                </Grid>
                <Grid container size={2} />
                <Grid container size={5} justifyContent='flex-start' alignItems='center'>
                  <Box height={110} width={110} sx={{ backgroundImage: `url(/sprites/female-player.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                  <Grid container size={12} spacing={1} width='fit-content'>
                    <Grid container direction='column' size={6} spacing={0.5}>
                      <Box height={20} width={20} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                      <Box height={20} width={20} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                      <Box height={20} width={20} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                    </Grid>
                    <Grid container direction='column' size={6} spacing={0.5}>
                      <Box height={20} width={20} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                      <Box height={20} width={20} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                      <Box height={20} width={20} sx={{ backgroundImage: `url(/sprites/pokeball.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Typography variant='body1' my={2}>Nurse your Pokemon to full health?</Typography>
              <Button variant='contained' size='large' sx={{ display: 'flex', gap: 1 }}>
                <LocalHospital fontSize='medium' />
                <Typography variant='button'>Heal Pokemon</Typography>
              </Button>
            </Grid>
          </Paper>
      </Grid>
    </Stack>
  )
}

export default PokemonCenter
