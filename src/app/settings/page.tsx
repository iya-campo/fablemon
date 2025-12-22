import { Settings } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

const page = () => {
  {/* TO DO: 
    - General Settings
  */}

  return (
    <Stack display='flex' gap={2} mb={6}>
        <Stack direction='row' alignItems='center' gap={1}>
            <Settings fontSize='medium' />
            <Typography variant='button' fontSize={14} fontWeight='bold'>Settings</Typography>
        </Stack>
    </Stack>
  )
}

export default page
