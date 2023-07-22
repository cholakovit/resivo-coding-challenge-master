import { ConnectionType } from './ConnectionType';
import { ConnectionStatus } from './ConnectionStatus';

export interface Door {
  id: string;
  name: string;
  buildingName: string;
  connectionType: ConnectionType; 
  apartmentName: string;
  connectionStatus: ConnectionStatus;
  lastConnectionStatusUpdate: string;
  apartmentId: string | undefined;
}
