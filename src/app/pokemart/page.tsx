"use client";

import React, { useState } from 'react'
import CustomNumberInput from '@/components/common/CustomNumberInput'
import { Album, AttachMoney, BookmarkBorder, BusinessCenter, CatchingPokemon, CurrencyRuble, Dashboard, Delete, DeleteOutline, Diamond, Medication, Search, ShoppingCart, Storefront } from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image';

const PokeMart = () => {
  const [value, setValue] = useState(0);

  return (
    <Stack gap={2} mb={6}>
      <Stack direction='row' alignItems='center' gap={1}>
        <Storefront fontSize='medium' />
        <Typography variant='button' fontSize={14} fontWeight='bold'>Poke Mart</Typography>
      </Stack>
      <Grid container size={12} spacing={4}>
        <Grid container size={8} direction='column' height='fit-content' spacing={2.5}>
          <Stack direction='row' flexGrow={1} spacing={2}>
            <TextField 
              placeholder='Search Poke Mart'
              size='medium'
              slotProps={{
                input: {
                  startAdornment: <Search color='action' sx={{ mr: 1 }} />,
                },
              }}
              sx={{ flexGrow: 1, backgroundColor: 'white', '& .MuiInputBase-input': { fontSize: '14px' } }} 
            />
            <Button variant='contained' size='small'>
              <BookmarkBorder />
            </Button>
          </Stack>
          <Stack direction='row' spacing={2} sx={{ '& div': { flexGrow: 1 } }}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2, cursor: 'pointer', bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>
              <Dashboard fontSize='large' sx={{ color: 'white' }} />
              <Stack>
                <Typography variant='body2' fontWeight='bold' color='white'>All</Typography>
                <Typography variant='body2' color='white'>50 Items</Typography>
              </Stack>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f7f7f7ff' } }}>
              <CatchingPokemon fontSize='large' color='primary' />
              <Stack>
                <Typography variant='body2' fontWeight='bold'>Pokeballs</Typography>
                <Typography variant='body2' fontWeight='bold' color='textSecondary'>5 Items</Typography>
              </Stack>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f7f7f7ff' } }}>
              <Medication fontSize='large' color='primary' />
              <Stack>
                <Typography variant='body2' fontWeight='bold'>Medicine</Typography>
                <Typography variant='body2' fontWeight='bold' color='textSecondary'>7 Items</Typography>
              </Stack>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f7f7f7ff' } }}>
              <Album fontSize='large' color='primary' />
              <Stack>
                <Typography variant='body2' fontWeight='bold'>TMs</Typography>
                <Typography variant='body2' fontWeight='bold' color='textSecondary'>20 Items</Typography>
              </Stack>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f7f7f7ff' } }}>
              <Diamond fontSize='large' color='primary' />
              <Stack>
                <Typography variant='body2' fontWeight='bold'>Key Items</Typography>
                <Typography variant='body2' fontWeight='bold' color='textSecondary'>10 Items</Typography>
              </Stack>
            </Paper>
          </Stack>
          <Grid container size={12} spacing={4}>
            <Grid size={4}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box display='flex' justifyContent='center'>
                  <Image src={`/images/pokeball.png`} width={100} height={100} alt='bag-item' />
                </Box>
                <Typography variant='body1' fontWeight='bold' mt={1} mb={0.5}>Pokeball</Typography>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='success' fontSize='small' />
                    <Typography variant='body2'>300</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={0.5}>
                    <BusinessCenter color='action' fontSize='small' />
                    <Typography variant='body2'>1</Typography>
                  </Stack>
                </Stack>
                <Button variant='contained' size='small'>
                  <Typography variant='caption' color='white'>Add to Cart</Typography>
                </Button>
              </Paper>
            </Grid>
            <Grid size={4}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box display='flex' justifyContent='center'>
                  <Image src={`/images/pokeball.png`} width={100} height={100} alt='bag-item' />
                </Box>
                <Typography variant='body1' fontWeight='bold' mt={1} mb={0.5}>Pokeball</Typography>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='success' fontSize='small' />
                    <Typography variant='body2'>300</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={0.5}>
                    <BusinessCenter color='action' fontSize='small' />
                    <Typography variant='body2'>1</Typography>
                  </Stack>
                </Stack>
                <CustomNumberInput value={value} setValue={setValue} fullWidth />
              </Paper>
            </Grid>
            <Grid size={4}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box display='flex' justifyContent='center'>
                  <Image src={`/images/pokeball.png`} width={100} height={100} alt='bag-item' />
                </Box>
                <Typography variant='body1' fontWeight='bold' mt={1} mb={0.5}>Pokeball</Typography>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='success' fontSize='small' />
                    <Typography variant='body2'>300</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={0.5}>
                    <BusinessCenter color='action' fontSize='small' />
                    <Typography variant='body2'>1</Typography>
                  </Stack>
                </Stack>
                <Button variant='contained' size='small'>
                  <Typography variant='caption' color='white'>Add to Cart</Typography>
                </Button>
              </Paper>
            </Grid>
            <Grid size={4}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box display='flex' justifyContent='center'>
                  <Image src={`/images/super-potion.png`} width={100} height={100} alt='bag-item' />
                </Box>
                <Typography variant='body1' fontWeight='bold' mt={1} mb={0.5}>Pokeball</Typography>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='success' fontSize='small' />
                    <Typography variant='body2'>300</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={0.5}>
                    <BusinessCenter color='action' fontSize='small' />
                    <Typography variant='body2'>1</Typography>
                  </Stack>
                </Stack>
                <Button variant='contained' size='small'>
                  <Typography variant='caption' color='white'>Add to Cart</Typography>
                </Button>
              </Paper>
            </Grid>
            <Grid size={4}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box display='flex' justifyContent='center'>
                  <Image src={`/images/super-potion.png`} width={100} height={100} alt='bag-item' />
                </Box>
                <Typography variant='body1' fontWeight='bold' mt={1} mb={0.5}>Pokeball</Typography>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='success' fontSize='small' />
                    <Typography variant='body2'>300</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={0.5}>
                    <BusinessCenter color='action' fontSize='small' />
                    <Typography variant='body2'>1</Typography>
                  </Stack>
                </Stack>
                <Button variant='contained' size='small'>
                  <Typography variant='caption' color='white'>Add to Cart</Typography>
                </Button>
              </Paper>
            </Grid>
            <Grid size={4}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box display='flex' justifyContent='center'>
                  <Image src={`/images/super-potion.png`} width={100} height={100} alt='bag-item' />
                </Box>
                <Typography variant='body1' fontWeight='bold' mt={1} mb={0.5}>Pokeball</Typography>
                <Stack direction='row' justifyContent='space-between' mb={2}>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='success' fontSize='small' />
                    <Typography variant='body2'>300</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={0.5}>
                    <BusinessCenter color='action' fontSize='small' />
                    <Typography variant='body2'>1</Typography>
                  </Stack>
                </Stack>
                <Button variant='contained' size='small'>
                  <Typography variant='caption' color='white'>Add to Cart</Typography>
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid container size={4} height='fit-content'>
          <Paper sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Stack gap={0.5} my={2} py={1} px={2}>
              <Typography variant='h5' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Shopping Cart
                <ShoppingCart />
              </Typography>
              <Divider />
              <Stack spacing={2} mt={2} maxHeight={500} overflow='auto' flexGrow={1}>
                <Grid container size={12} border='1px solid #ddd' borderRadius={2} p={2}>
                  <Image src={`/images/pokeball.png`} width={50} height={50} alt='bag-item' />
                  <Grid size='grow' ml={1}>
                    <Grid container size={12} direction='row' justifyContent='space-between' alignItems='flex-start'>
                      <Stack height='fit-content'>
                        <Typography variant='body1' fontWeight='bold'>Pokeball</Typography>
                        <Stack direction='row' alignItems='center'>
                          <AttachMoney color='success' fontSize='small' />
                          <Typography variant='body2'>300</Typography>
                        </Stack>
                      </Stack>
                      <Button variant='text' sx={{ display: 'flex', alignItems: 'center', gap: 0.25, p: 0 }}>
                        <DeleteOutline color='error' sx={{ fontSize: 16 }} />
                        <Typography variant='body2' color='error' fontSize={10} fontWeight='bold'>Remove</Typography>
                      </Button>
                    </Grid>
                    <Grid container size={12} justifyContent='flex-end'>
                      <CustomNumberInput value={value} setValue={setValue} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container size={12} border='1px solid #ddd' borderRadius={2} p={2}>
                  <Image src={`/images/super-potion.png`} width={50} height={50} alt='bag-item' />
                  <Grid size='grow' ml={1}>
                    <Grid container size={12} direction='row' justifyContent='space-between' alignItems='flex-start'>
                      <Stack height='fit-content'>
                        <Typography variant='body1' fontWeight='bold'>Super Potion</Typography>
                        <Stack direction='row' alignItems='center'>
                          <AttachMoney color='success' fontSize='small' />
                          <Typography variant='body2'>300</Typography>
                        </Stack>
                      </Stack>
                      <Button variant='text' sx={{ display: 'flex', alignItems: 'center', gap: 0.25, p: 0 }}>
                        <DeleteOutline color='error' sx={{ fontSize: 16 }} />
                        <Typography variant='body2' color='error' fontSize={10} fontWeight='bold'>Remove</Typography>
                      </Button>
                    </Grid>
                    <Grid container size={12} justifyContent='flex-end'>
                      <CustomNumberInput value={value} setValue={setValue} />
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={1} bgcolor='#eee' borderRadius={1} my={2} p={2}>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='body2' color='textSecondary'>Sub Total</Typography>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='action' sx={{ fontSize: 16 }} />
                    <Typography variant='body2' color='textSecondary'>300</Typography>
                  </Stack>
                </Stack>  
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='body2' color='textSecondary'>Discount</Typography>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='action' sx={{ fontSize: 16 }} />
                    <Typography variant='body2' color='textSecondary'>10</Typography>
                  </Stack>
                </Stack>  
                <Divider />     
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='body1' fontWeight='bold'>Total Amount</Typography>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoney color='success' fontSize='small' />
                    <Typography variant='body1' fontWeight='bold'>300</Typography>
                  </Stack>
                </Stack>        
              </Stack>
              <Button variant='contained' size='large'>
                Purchase
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default PokeMart
