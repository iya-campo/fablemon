import { CrueltyFree } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

const DayCare = () => {

  {/* TO DO: 
    - Enhance Pokemon stats
    - Change Pokemon moveset
    - Evolve Pokemon
    - Revive Fossils
  */}
  return (
    <Stack gap={2} mb={6}>
      <Stack direction='row' alignItems='center' gap={1}>
        <CrueltyFree fontSize='medium' />
        <Typography variant='button' fontSize={14} fontWeight='bold'>Day Care</Typography>
      </Stack>
    </Stack>
  )
}

export default DayCare
