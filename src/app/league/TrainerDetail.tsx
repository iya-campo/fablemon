import { CatchingPokemon, Check } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface TrainerDetailProps {
	name: string;
	team: string[];
	img?: string;
	reward: string;
	difficulty?: 'Easy' | 'Medium' | 'Hard';
	levelRec?: string;
	gymBadge?: string;
	defeated?: boolean;
	size?: 'small' | 'medium';
	handleOpen: () => void;
}

const TrainerDetail = ({ name, team, img, reward, difficulty, levelRec, gymBadge, defeated=false, size='medium', handleOpen }: TrainerDetailProps) => {
  return (
		<Stack spacing={2.5} p={2}>
			<Stack direction='row' height={100} width='100%' gap={2}>
				{img ? (
					<Image 
						src={img || ''}
						width={100} 
						height={100} 
						alt={name} 
						style={{ backgroundColor: '#eee', borderRadius: 8, objectFit: "cover", objectPosition: "top center" }} />
				) : <Box height={100} width={100} borderRadius={2} bgcolor='#ddd' />}
				<Stack justifyContent={size === 'small' ? 'space-between' : 'flex-start'} flexGrow={1} spacing={0.5}>
					<Stack direction='row' justifyContent='space-between' alignItems='center'>
						<Typography variant='body1' fontWeight='bold'>{name}</Typography>
						{gymBadge && (
							<Image
								src={gymBadge || ''}
								width={30}
								height={30}
								alt={`${name}'s Badge`}
							/>
						)}
					</Stack>
					<Stack direction='row' spacing={0.5}>
						{size === 'medium' && team.map((_, index) => (
							<Box 
								key={index}
								height={12} 
								width={12} 
								sx={{ 
									backgroundImage: `url(/sprites/pokeball.png)`, 
									backgroundPosition: 'center', 
									backgroundSize: 'contain', 
									backgroundRepeat: 'no-repeat' 
								}} />
						))}
					</Stack>
					{size === 'small' && (
						<Grid container size={12} justifyContent='space-between' spacing={1}>
							<Grid container size={6} direction='column' alignItems='center' spacing={0.5}>
								<Typography variant='button' fontSize={12} fontWeight='bold' letterSpacing={0}>{difficulty ? 'Difficulty' : 'Recommended'}</Typography>
								<Chip variant="filled" label={difficulty ? difficulty : levelRec} component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
							</Grid>
							<Grid container size={6} direction='column' alignItems='center' spacing={0.5}>
								<Typography variant='button' fontSize={12} fontWeight='bold' letterSpacing={0}>Reward</Typography>
								<Chip variant="filled" label={reward} component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
							</Grid>
						</Grid>
					)}
				</Stack>
			</Stack>
			{size === 'medium' && (
				<Grid container size={12} justifyContent='space-between' spacing={1}>
					<Grid container size={6} direction='column' alignItems='center' spacing={0.5}>
						<Typography variant='button' fontSize={12} fontWeight='bold' letterSpacing={0}>{difficulty ? 'Difficulty' : 'Recommended'}</Typography>
						<Chip variant="filled" label={difficulty ? difficulty : levelRec} component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
					</Grid>
					<Grid container size={6} direction='column' alignItems='center' spacing={0.5}>
						<Typography variant='button' fontSize={12} fontWeight='bold' letterSpacing={0}>Reward</Typography>
						<Chip variant="filled" label={reward} component="a" href="#basic-chip" clickable  sx={{ width: '100%' }} />
					</Grid>
				</Grid>
			)}
			<Button variant='contained' color={!defeated ? 'primary' : 'success'} size='large' fullWidth sx={{ display: 'flex', gap: 1, mt: 1 }} onClick={handleOpen}>
				<Typography variant='button'>{!defeated ? 'Challenge' : 'Defeated'}</Typography>
				{!defeated ? <CatchingPokemon fontSize='medium' /> : <Check fontSize='medium' />}
			</Button>
		</Stack>
  )
}

export default TrainerDetail