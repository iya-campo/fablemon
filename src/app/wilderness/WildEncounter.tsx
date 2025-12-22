import { CatchingPokemon, Grass, Male } from '@mui/icons-material'
import { Box, Button, Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface WildEncounterProps {
  open: boolean;
  handleClose: () => void;
  handleStartBattle: () => void;
  name: string;
  img?: string;
}

const WildEncounter = ({ open, handleClose, handleStartBattle, name, img }: WildEncounterProps) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Paper sx={{ width: 350, p: 4 }}>
        <Grid container size={12} direction='column' alignItems='center' flexGrow={1}>
          <Typography variant='body2'>You encounter a wild</Typography>
          <Image
            src={img || ''}
            alt="wild-pokemon"
            height={100}
            width={100}
            style={{ objectFit: "contain", marginTop: 16, marginBottom: 16 }}
          />
          <Stack direction='row' alignItems='center' spacing={1}>
            <CatchingPokemon color='primary' fontSize='small' />
            <Typography variant='h6' fontWeight='bold'>{name}</Typography>
            <Stack direction='row'>
              <Typography variant='body2' color='textSecondary' fontWeight='bold'>Lv. 5</Typography>
              <Male fontSize='small' sx={{ color: 'lightblue' }} />
            </Stack>
          </Stack>
          <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={handleStartBattle}>
            <Typography variant='button'>Battle</Typography>
          </Button>
          <Button variant='text' size='small' sx={{ mt: 0.5 }} onClick={handleClose}>
            <Typography variant='caption' textTransform='capitalize'>Dismiss</Typography>
          </Button>
        </Grid>
      </Paper>
    </Modal>
  )
}

export default WildEncounter
