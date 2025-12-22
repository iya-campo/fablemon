import { CatchingPokemon } from '@mui/icons-material'
import { Box, Button, Modal, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface CommenceBattleProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  handleStartBattle: () => void;
  trainerType?: 'standard' | 'challenge';
  name: string;
  team: string[];
  img?: string;
}

const CommenceBattle = ({ open, handleClose, handleStartBattle, trainerType='standard', name='Trainer', team=[], img }: CommenceBattleProps) => {

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
          <Box width={100} borderRadius={2} sx={{ backgroundImage: `url(${img})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
          <Stack direction='column' alignItems='center' flexGrow={1}>
            <Stack direction='row' alignItems='center' gap={0.25}>
              <Typography variant='h6' fontWeight='bold'>{name}</Typography>
              {/* <Box height={24} width={24} sx={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} /> */}
            </Stack>
            <Typography variant='body2'>has challenged you to a battle!</Typography>
            {trainerType === 'challenge' && (
              <Stack direction='row' my={2}>
                {team.map((pokemon, index) => <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/${pokemon}.png`} width={50} height={50} alt={`brock-pokemon-${index}`} />)}                
              </Stack>
            )}
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
