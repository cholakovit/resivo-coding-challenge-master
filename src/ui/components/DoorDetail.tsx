import Typography from '@mui/material/Typography';
import { Door } from '@/models/Door';
import { DetailPageContainer } from '@/ui/layout/DetailPageContainer';
import { DetailPageItem } from '@/ui/layout/DetailPageItem';

import { DateTimeDisplay } from './DateTimeDisplay';
import { ConnectionStatusComponent } from './ConnectionStatusComponent';

interface DoorDetailProps {
  door: Door;
}

export function DoorDetail({ door }: DoorDetailProps) {
  return (
    <DetailPageContainer>
      <DetailPageItem label="ID">
        <Typography>{door.id}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Building">
        <Typography>{door.buildingName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection type">
        <Typography>{door.connectionType}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection status">
        <ConnectionStatusComponent connectionStatus={door.connectionStatus} />
      </DetailPageItem>
      <DetailPageItem label="Date and Time">
        <DateTimeDisplay dateTime={door.lastConnectionStatusUpdate} />
      </DetailPageItem>
      {door.apartmentName && (
        <DetailPageItem label="Apartment Name">
          <Typography>{door.apartmentName}</Typography>
        </DetailPageItem>
      )}
    </DetailPageContainer>
  );
}


