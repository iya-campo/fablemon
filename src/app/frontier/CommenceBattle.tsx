import { CatchingPokemon } from '@mui/icons-material'
import { Box, Button, Modal, Paper, Stack, Typography } from '@mui/material'

const CommenceBattle = ({ open, handleClose, handleStartBattle }: any) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Paper sx={{ width: 400, p: 4 }}>
        <Stack direction='row' spacing={4}>
          <Box width={100} bgcolor='#ddd' borderRadius={2} sx={{ backgroundImage: `url(https://i.dstatic.com/images/trainers/youngster2.webp)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
          <Stack direction='column' alignItems='center' flexGrow={1}>
            <Stack direction='row' alignItems='center' gap={0.25}>
              <Typography variant='h6' fontWeight='bold'>Youngster Joey</Typography>
              <Box height={24} width={24} sx={{ backgroundImage: `url(https://static.pokemon-vortex.com/v6/images/trainer_sprites/6.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
            </Stack>
            <Typography variant='body2'>has challenged you to a battle!</Typography>
            <Button variant='contained' size='large' fullWidth sx={{ display: 'flex', gap: 1, mt: 4 }} onClick={handleStartBattle}>
              <Typography variant='button'>Battle</Typography>
              <CatchingPokemon fontSize='medium' />
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  )
}

export default CommenceBattle
