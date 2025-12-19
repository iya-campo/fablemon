import { AutoAwesome, SportsMma } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Paper, Popper, Stack, Typography } from '@mui/material'

const PokemonPopper = ({ popperEl }: any) => {
  return (
    <Popper open={Boolean(popperEl)} anchorEl={popperEl} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
        <Stack width={350}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' borderBottom='1px solid #ddd' pb={1}>
            <Stack>
              <Typography variant='h6' fontWeight='bold'>Squirtle</Typography>
              <Typography variant='button' color='textSecondary' fontWeight='bold'>#007</Typography>
            </Stack>
            <Stack direction='row' gap={1}>
              <Typography variant='caption' textAlign='center' bgcolor='skyblue' color='#fff' px={2} py={1} borderRadius={1} fontSize={12} fontWeight='bold' textTransform='uppercase'>Water</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={4} pt={2}>
            <Box width={150} height={150} sx={{ backgroundImage: `url(https://img.pokemondb.net/artwork/avif/squirtle.avif)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} ></Box>
            <Stack flexGrow={1}>
              <Stack direction='row' gap={0.5}>
                <AutoAwesome fontSize='small' color='action' />
                <Typography variant='button' fontSize={14} fontWeight='bold' mb={1} letterSpacing={0}>Ability</Typography>
              </Stack>
              <Grid container size={12} spacing={1}>
                <Grid size={6}>
                  <Chip variant="outlined" label="Torrent" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                </Grid>
                <Grid size={6}>
                  <Chip variant="outlined" label="Defiant" component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
                </Grid>
              </Grid>
              <Stack direction='row' gap={0.5} mt={2}>
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
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Popper>
  )
}

export default PokemonPopper
