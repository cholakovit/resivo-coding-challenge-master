import { render } from '@testing-library/react';
import { Door } from '@/models/Door';
import { DoorDetail } from './DoorDetail';
import '@testing-library/jest-dom';
import 'jest-styled-components'; 

describe('DoorDetail', () => {
  const sampleDoor: Omit<Door, 'apartmentName'> = {
    id: '63f637c9f3c48a124616044b',
    name: 'Building Main Entrance',
    buildingName: 'Bahnhofstrasse 10A',
    connectionType: 'wired',
    connectionStatus: 'offline',
    lastConnectionStatusUpdate: '2023-02-12T14:30:20.124',
  };

  it('should render door details without apartmentName', () => {
    const { getByText, queryByText } = render(<DoorDetail door={sampleDoor} />);
    
    // Check if each detail item is present
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Building')).toBeInTheDocument();
    expect(getByText('Connection type')).toBeInTheDocument();
    expect(getByText('Connection status')).toBeInTheDocument();
    expect(getByText('Date and Time')).toBeInTheDocument();

    // Check if the apartmentName detail item is absent (as it is optional)
    const apartmentNameLabel = queryByText('Apartment Name');
    expect(apartmentNameLabel).toBeNull();

    // Check if apartmentName content is absent (as it is optional)
    const apartmentNameContent = queryByText('Apartment 2.1');
    expect(apartmentNameContent).toBeNull();
  });

  it('should render door details with apartmentName', () => {
    const doorWithApartmentName: Door = {
      ...sampleDoor,
      apartmentName: 'Apartment 2.1',
    };

    const { getByText } = render(<DoorDetail door={doorWithApartmentName} />);
    
    // Check if each detail item is present
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Building')).toBeInTheDocument();
    expect(getByText('Connection type')).toBeInTheDocument();
    expect(getByText('Connection status')).toBeInTheDocument();
    expect(getByText('Date and Time')).toBeInTheDocument();

    // Check if the apartmentName detail item is present
    expect(getByText('Apartment Name')).toBeInTheDocument();

    // Check if apartmentName content is present
    expect(getByText(`${doorWithApartmentName.apartmentName}`)).toBeInTheDocument();
  });
});

// describe('DoorDetail', () => {
//   it('should render correctly', () => {
//     const { container } = render(<DoorDetail door={door} />);
//     expect(container.firstChild).toMatchSnapshot();
//   });
// });


