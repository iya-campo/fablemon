import { Storefront } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import React from 'react'

const PokeMart = () => {
  {/* TO DO: 
    - Buy/Sell Poke Mart
    - Browse Bag
  */}

  return (
    <Stack gap={2} mb={6}>
      <Stack direction='row' alignItems='center' gap={1}>
        <Storefront fontSize='medium' />
        <Typography variant='button' fontSize={14} fontWeight='bold'>Poke Mart</Typography>
      </Stack>
    </Stack>
  )
}

export default PokeMart
