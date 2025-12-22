"use client";

import TypeIndicator from '@/components/common/TypeIndicator';
import { AutoAwesome, Equalizer, Male, SportsMma } from '@mui/icons-material';
import { Box, Chip, Divider, Grid, Modal, Paper, Stack, Typography } from '@mui/material';

const PokemonDetails = ({ open, handleClose }: any) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
        <Stack width={{ xs: '100%', sm: 500, md: 600 }} spacing={2}>
          <Stack direction='row' alignItems='center' spacing={4}>
            <Box width={400} height={300} sx={{ backgroundImage: `url(https://img.pokemondb.net/artwork/avif/squirtle.avif)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} ></Box>
            <Stack direction='row' justifyContent='space-between' alignItems='flex-start' flexGrow={1} pb={1}>
              <Stack flexGrow={1}>
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
                <Divider sx={{ my: 2 }} />
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Height</Typography>
                  <Typography variant='body2' color='textSecondary' fontWeight='bold'>0.5m</Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Width</Typography>
                  <Typography variant='body2' color='textSecondary' fontWeight='bold'>9.45kg</Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Item</Typography>
                  <Typography variant='body2' color='textSecondary' fontWeight='bold'>None</Typography>
                </Stack>
                <Stack mt={1}>
                  <Typography variant='body2'>
                    We first met one another on January 1, 2025 at Route 10. 
                    At the time, this Pokemon was Lv. 10.
                  </Typography>
                  <Stack direction='row' alignItems='center' gap={1} mt={2}>
                    <Typography variant='body2' color='textSecondary' fontWeight='bold' fontSize={10}>EXP</Typography>
                    <Box width='100%' height={5} bgcolor='#ddd' borderRadius={50} />
                  </Stack>
                  <Typography variant='body2' color='textSecondary' fontWeight='bold' fontSize={10} textAlign='right'>0/100</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Grid container size={12} columnSpacing={4} mt={2}>
            <Grid container size={{ xs: 12, sm: 5 }} alignContent='flex-start'>
              <Stack direction='row' gap={0.5}>
                <AutoAwesome fontSize='small' color='action' />
                <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Ability</Typography>
              </Stack>
              <Grid container size={12} spacing={1}>
                <Chip variant="outlined" label="Torrent" component="a" href="#basic-chip" clickable />
                <Chip variant="outlined" label="Defiant" component="a" href="#basic-chip" clickable />
              </Grid>
              <Stack direction='row' gap={0.5} mt={4}>
                <SportsMma fontSize='small' color='action' />
                <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Moves</Typography>
              </Stack>
              <Grid container size={12} spacing={1}>
                <Grid size={6}>
                  <Chip variant="filled" label="Tackle" component="a" href="#basic-chip" clickable  sx={{ borderRadius: 1.5, width: '100%', fontWeight: 'bold' }} />
                </Grid>
                <Grid size={6}>
                  <Chip variant="filled" label="Water Gun" component="a" href="#basic-chip" clickable  sx={{ borderRadius: 1.5, width: '100%', fontWeight: 'bold' }} />
                </Grid>
                <Grid size={6}>
                  <Chip variant="filled" label="-" component="a" href="#basic-chip" clickable  sx={{ borderRadius: 1.5, width: '100%', fontWeight: 'bold' }} />
                </Grid>
                <Grid size={6}>
                  <Chip variant="filled" label="-" component="a" href="#basic-chip" clickable  sx={{ borderRadius: 1.5, width: '100%', fontWeight: 'bold' }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container size={{ xs: 12, sm: 7 }} mt={{ xs: 4, md: 0 }} height='fit-content'>
              <Stack direction='row' gap={0.5}>
                <Equalizer fontSize='small' color='action' />
                <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Stats</Typography>
              </Stack>
              <Grid container size={12} spacing={1} alignItems='center'>
                <Grid size={{ xs: 2, sm: 3, md: 2 }}>
                  <Typography variant='body2' letterSpacing={0} textAlign='end'>Attack</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                </Grid>
                <Grid size={{ xs: 8, sm: 7, md: 8 }}>
                  <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                </Grid>
                <Grid size={{ xs: 2, sm: 3, md: 2 }}>
                  <Typography variant='body2' letterSpacing={0} textAlign='end'>Defense</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                </Grid>
                <Grid size={{ xs: 8, sm: 7, md: 8 }}>
                  <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                </Grid>
                <Grid size={{ xs: 2, sm: 3, md: 2 }}>
                  <Typography variant='body2' letterSpacing={0} textAlign='end'>Sp. Atk</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                </Grid>
                <Grid size={{ xs: 8, sm: 7, md: 8 }}>
                  <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                </Grid>
                <Grid size={{ xs: 2, sm: 3, md: 2 }}>
                  <Typography variant='body2' letterSpacing={0} textAlign='end'>Sp. Def</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                </Grid>
                <Grid size={{ xs: 8, sm: 7, md: 8 }}>
                  <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                </Grid>
                <Grid size={{ xs: 2, sm: 3, md: 2 }}>
                  <Typography variant='body2' letterSpacing={0} textAlign='end'>Speed</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant='body2' letterSpacing={0} textAlign='center'>200</Typography>
                </Grid>
                <Grid size={{ xs: 8, sm: 7, md: 8 }}>
                  <Box width='100%' height={5} bgcolor='green' borderRadius={50} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Modal>
  )
}

export default PokemonDetails
