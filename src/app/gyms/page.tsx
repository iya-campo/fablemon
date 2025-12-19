import { Token } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

const page = () => {
  {/* TO DO: 
    - Display badges
    - Display gym leaders by region
  */}

  return (
    <Stack display='flex' gap={2} mb={6}>
        <Stack direction='row' alignItems='center' gap={1}>
            <Token fontSize='medium' />
            <Typography variant='button' fontSize={14} fontWeight='bold'>Gyms</Typography>
        </Stack>
    </Stack>
  )
}

export default page
