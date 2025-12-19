import { Person } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

const page = () => {
  {/* TO DO: 
    - Profile statistics
    - Gym completion
    - Activity
    - Achievements
  */}

  return (
    <Stack display='flex' gap={2} mb={6}>
        <Stack direction='row' alignItems='center' gap={1}>
            <Person fontSize='medium' />
            <Typography variant='button' fontSize={14} fontWeight='bold'>Profile</Typography>
        </Stack>
    </Stack>
  )
}

export default page
