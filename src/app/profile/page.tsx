import { AccountBalance, CatchingPokemon, EmojiEvents, Person, SportsMma, WifiProtectedSetup } from '@mui/icons-material'
import { Box, Button, Grid, Paper, Stack, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'

const Profile = () => {
  {/* TO DO: 
    - Achievements
    - Favorite Pokemon
  */}

  return (
    <Stack display='flex' gap={2} mb={6}>
			<Stack direction='row' alignItems='center' gap={1}>
				<Person fontSize='medium' />
				<Typography variant='button' fontSize={14} fontWeight='bold'>Profile</Typography>
			</Stack>
			<Grid container size={12} justifyContent='space-between' alignItems='flex-end' mt={2}>
				<Grid container size={6} direction='row' spacing={2}>
					<Image 
						src='https://archives.bulbagarden.net/media/upload/a/a0/Omega_Ruby_Alpha_Sapphire_May.png' 
						height={100} 
						width={100} 
						alt='profile-pic' 
						style={{ objectFit: "cover", objectPosition: "top center", borderRadius: 50, backgroundColor: '#ddd' }}
					/>
					{/* <Box width={100} height={100} bgcolor='#ddd' borderRadius={50} /> */}
					<Stack spacing={1}>
						<Typography variant='h6' fontWeight='bold'>Trainer May</Typography>
						<Stack direction='row' spacing={1}>
							<Button variant='contained'>Edit Profile</Button>
							<Button variant='outlined'>Message</Button>
						</Stack>
					</Stack>
				</Grid>
				<Grid container size={6} justifyContent='flex-end' spacing={1}  height='fit-content'>
					<Tooltip title="Battle Player">
						<Button variant='contained'>
							<SportsMma fontSize='small' />
						</Button>
					</Tooltip>
					<Tooltip title="Trade with Player">
						<Button variant='contained'>
							<WifiProtectedSetup fontSize='small' />
						</Button>
					</Tooltip>
					<Tooltip title="View auction listings">
						<Button variant='contained'>
							<AccountBalance fontSize='small' />
						</Button>
					</Tooltip>
				</Grid>
			</Grid>
			<Grid size={12}>
				<Paper sx={{ display: 'flex', px: 2, py: 3, width: '100%' }}>
					<Grid container direction='column' alignItems='center' borderRight='1px solid #ccc' px={2}>
						<Typography variant='body1' fontWeight='bold'>2</Typography>
						<Typography variant='body2'>Pokemon</Typography>
					</Grid>
					<Grid container direction='column' alignItems='center' borderRight='1px solid #ccc' px={2}>
						<Typography variant='body1' fontWeight='bold'>10</Typography>
						<Typography variant='body2'>Battles Won</Typography>
					</Grid>
					<Grid container direction='column' alignItems='center' borderRight='1px solid #ccc' px={2}>
						<Typography variant='body1' fontWeight='bold'>2%</Typography>
						<Typography variant='body2'>League</Typography>
					</Grid>
					<Grid container direction='column' alignItems='center' px={2}>
						<Typography variant='body1' fontWeight='bold'>5%</Typography>
						<Typography variant='body2'>Pokedex</Typography>
					</Grid>
				</Paper>
			</Grid>
			<Grid container size={12} spacing={4} mt={2}>
				<Grid container size={7} direction='column' spacing={2}>
					<Stack gap={0.5} mb={1}>
						<Typography variant='h5' fontWeight='bold'>Activity Log</Typography>
						<Box width={40} height={3} bgcolor='#333' />
					</Stack>
					<Stack direction='row' alignItems='flex-start' spacing={2}>
						<Stack justifyContent='center' alignItems='center' height={50} width={50} bgcolor='#ddd' borderRadius={50}>
							<EmojiEvents color='action' />
						</Stack>
						<Paper sx={{ display: 'flex', flexGrow: 1, height: '100%', p: 2 }}>
							<Stack spacing={0.5}>
								<Typography variant='caption' fontWeight='bold' color='textSecondary'>11:00 AM</Typography>
								<Typography variant='body1' fontWeight='bold'>
									Player won against Youngster Joey!
								</Typography>
							</Stack>
						</Paper>
					</Stack>
					<Stack direction='row' alignItems='flex-start' spacing={2}>
						<Stack justifyContent='center' alignItems='center' height={50} width={50} bgcolor='#ddd' borderRadius={50}>
							<CatchingPokemon color='action' />
						</Stack>
						<Paper sx={{ display: 'flex', flexGrow: 1, height: '100%', p: 2 }}>
							<Stack spacing={0.5}>
								<Typography variant='caption' fontWeight='bold' color='textSecondary'>11:00 AM</Typography>
								<Typography variant='body1' fontWeight='bold'>
									Player caught a Bulbasaur.
								</Typography>
							</Stack>
						</Paper>
					</Stack>
				</Grid>
				<Grid container size={5} direction='column' spacing={2}>
					<Stack spacing={1}>
						<Typography variant='body1' fontWeight='bold'>Favorite Pokemon</Typography>
						<Paper sx={{ display: 'flex', flexGrow: 1, height: '100%', p: 2 }}>
						</Paper>
					</Stack>
					<Stack spacing={1}>
						<Typography variant='body1' fontWeight='bold'>Achievements</Typography>
						<Paper sx={{ display: 'flex', flexGrow: 1, height: '100%', p: 2 }}>
						</Paper>
					</Stack>
				</Grid>
			</Grid>
    </Stack>
  )
}

export default Profile
