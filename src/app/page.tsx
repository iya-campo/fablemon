import { Stack, Typography } from "@mui/material";
import { Dashboard } from "@mui/icons-material";

export default function Home() {
  return (
    <div>
      <main>
        <Stack display='flex' gap={2} mb={6}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Dashboard fontSize='medium' />
            <Typography variant='button' fontSize={14} fontWeight='bold'>Dashboard</Typography>
          </Stack>
        </Stack>
      </main>
    </div>
  );
}
