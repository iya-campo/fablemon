import { TextField, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Dispatch, SetStateAction } from 'react';

interface CustomerNumberInputProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  fullWidth?: boolean;
}

const CustomNumberInput = ({ value=0, setValue, fullWidth=false }: CustomerNumberInputProps) => {
  const handleIncrease = () => {
    if (value >= 99) return;
    setValue(value + 1)
  };
  const handleDecrease = () => {
    if (value <= 0) return;
    setValue(value - 1)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (value === 0) parseInt(newValue, 10);
    
    setValue(Number(newValue));
  };

  return (
    <Box  display='flex' alignItems='center' width={fullWidth ? '100%' : 85} bgcolor='#eee' borderRadius={1}>
      <IconButton onClick={handleDecrease} color='primary' size='small'>
        <RemoveIcon sx={{ fontSize: 14 }} />
      </IconButton>
      <TextField
        value={value}
        onChange={handleChange}
        type="number"
        size='small'
        sx={{
          width: '100%',
          '& input': {
            height: 10,
            fontSize: 14,
            border: 'none',
            textAlign: 'center',
            
            MozAppearance: 'textfield',
            'appearance': 'textfield',

            '&::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '&::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            px: 0
          },
          '& .MuiOutlinedInput-root': {
            boxShadow: 'none',
          }
        }}
      />
      <IconButton onClick={handleIncrease} color='primary' size='small'>
        <AddIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
};

export default CustomNumberInput;
