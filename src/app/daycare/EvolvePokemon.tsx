import { CatchingPokemon, DoubleArrow, Insights, Male } from '@mui/icons-material';
import { Box, Button, Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface EvolvePokemonProps {
  open: boolean;
  handleClose: () => void;
	name: string;
	img1: string;
	img2: string;
}

const handleEvolve = () => {}

const EvolvePokemon = ({ open, handleClose, name, img1, img2 }: EvolvePokemonProps) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
			<Paper sx={{ width: 400, p: 4 }}>
        <Grid container size={12} direction='column' alignItems='center' flexGrow={1}>
					<Stack direction='row' alignItems='center' spacing={1} mb={1}>
						<Typography variant='button' fontSize={14} fontWeight='bold'>Evolution</Typography>
						<Insights color='primary' fontSize='medium' />
					</Stack>
          <Typography variant='body2'><b>{name}</b> is ready to evolve into <b>Wartortle</b>!</Typography>
					<Stack direction='row' alignItems='center' spacing={2} my={2}>
						<Image
							src={img1 || ''}
							alt="wild-pokemon"
							height={70}
							width={70}
							style={{ objectFit: "contain", marginTop: 16, marginBottom: 16 }}
						/>
						<Stack justifyContent='center' alignItems='center'>
							<DoubleArrow color='action' sx={{ fontSize: 50 }} />
							<Typography variant='body2'>Lv. 16</Typography>
						</Stack>
						<Image
							src={img2 || ''}
							alt="wild-pokemon"
							height={70}
							width={70}
							style={{ objectFit: "contain", marginTop: 16, marginBottom: 16 }}
						/>
					</Stack>
          <Button variant='contained' fullWidth onClick={handleEvolve}>
            <Typography variant='button'>Evolve</Typography>
          </Button>
          <Button variant='text' size='small' sx={{ mt: 0.5 }} onClick={handleClose}>
            <Typography variant='caption' textTransform='capitalize'>Dismiss</Typography>
          </Button>
        </Grid>
			</Paper>
    </Modal>
  )
}

export default EvolvePokemon
