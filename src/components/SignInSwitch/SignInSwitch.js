import { Box, FormControlLabel, Switch } from '@mui/material';

export default function SignInSwitch() {
  return (
    <Box>
      <FormControlLabel label="Remember me" control={<Switch />} />
    </Box>
  );
}
