import { Box, Button, Modal, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface MatchHistoryProps {
  open: boolean;
  handleClose: () => void;
}

const MatchHistory = ({ open, handleClose }: MatchHistoryProps) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Paper sx={{ width: 400, p: 4 }}>
        <Stack direction='row' justifyContent='center'>
            Match History
        </Stack>
      </Paper>
    </Modal>
  )
}

export default MatchHistory
