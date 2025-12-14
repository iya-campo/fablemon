import React from 'react'
import { ArrowDropDown, LocalHospital, Whatshot } from '@mui/icons-material'
import { Box, Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack, Typography } from '@mui/material'
import Image from 'next/image';

const options = ['Bulbasaur', 'Charmander', 'Squirtle'];

const EncounterActions = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // const handleAction = () => {
  //   console.info(`You clicked ${options[selectedIndex]}`);
  // };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
        <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="Button group with a nested menu"
            size='small'
            fullWidth
            sx={{ mt: 2 }}
        >
            <Button variant='contained'>
              <LocalHospital fontSize='small' />
              <Typography variant='caption' ml={1}>{options[selectedIndex]}</Typography>
            </Button>
            <Button
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
              sx={{ width: 25 }}
            >
              <ArrowDropDown fontSize='small' />
            </Button>
        </ButtonGroup>
        <Popper
            sx={{ zIndex: 1 }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            placement='top'
            disablePortal
        >
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{
                transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
            >
                <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                          sx={{ gap: 2 }}
                        >
                          <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`} width={32} height={32} alt='party-pokemon' />
                          <Stack>
                            <Typography variant='body2' width={100} textAlign='start'>{option}</Typography>
                            <Box width='100%' height={2} bgcolor='green' borderRadius={50} />
                            <Typography variant='caption' fontSize={10} textAlign='end'>50/50</Typography>
                          </Stack>
                        </MenuItem>
                    ))}
                    </MenuList>
                </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
    </>
  )
}

export default EncounterActions
