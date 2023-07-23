import { render } from '@testing-library/react';
import { ConnectionStatusComponent } from './ConnectionStatusComponent';
import { ConnectionStatus } from '@/models/ConnectionStatus';
import '@testing-library/jest-dom';
import 'jest-styled-components'; // Import jest-styled-components for hex color support

describe('ConnectionStatusComponent', () => {
  it('should display "Online" text with success color for Online status', () => {
    const { getByText } = render(<ConnectionStatusComponent connectionStatus={ConnectionStatus.Online} />);

    const onlineText = getByText(ConnectionStatus.Online);

    // Check if the "Online" text is displayed with success color
    expect(onlineText).toBeInTheDocument();

    // Get the actual color value from the computed style of the element
    const onlineColor = window.getComputedStyle(onlineText).color;
    expect(onlineText).toHaveStyle('color: #2e7d32'); // Success color in hexadecimal format
  });

  it('should display "Offline" text with error color for Offline status', () => {
    const { getByText } = render(<ConnectionStatusComponent connectionStatus={ConnectionStatus.Offline} />);

    const offlineText = getByText(ConnectionStatus.Offline);

    // Check if the "Offline" text is displayed with error color
    expect(offlineText).toBeInTheDocument();

    // Get the actual color value from the computed style of the element
    const offlineColor = window.getComputedStyle(offlineText).color;
    expect(offlineText).toHaveStyle('color: #d32f2f'); // Success color in hexadecimal format
  });
});