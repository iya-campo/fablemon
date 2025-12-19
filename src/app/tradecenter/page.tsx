import { Loop } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

const page = () => {
  {/* TO DO: 
    - Trade Pokemon
    - Auction rare items
  */}

  return (
    <Stack display='flex' gap={2} mb={6}>
        <Stack direction='row' alignItems='center' gap={1}>
            <Loop fontSize='medium' />
            <Typography variant='button' fontSize={14} fontWeight='bold'>Trade Center</Typography>
        </Stack>
    </Stack>
  )
}

export default page
