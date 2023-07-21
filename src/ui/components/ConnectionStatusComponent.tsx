import { ConnectionStatus } from '@/models/ConnectionStatus';
import Typography from '@mui/material/Typography';

interface ConnectionStatusProps {
  connectionStatus: String;
}

export function ConnectionStatusComponent({ connectionStatus }: ConnectionStatusProps) {
  return connectionStatus === ConnectionStatus.Online ? (
    <Typography color="success.main">{ ConnectionStatus.Online }</Typography>
  ) : (
    <Typography color="error">{ ConnectionStatus.Offline }</Typography>
  );
}

