import { render } from '@testing-library/react';
import { DateTimeDisplay } from './DateTimeDisplay';
import '@testing-library/jest-dom';

describe('DateTimeDisplay', () => {
  it('should display the formatted date and time', () => {
    // Replace the sampleDateTime with the date and time you want to test
    const sampleDateTime = '2023-02-12T14:30:20.124';
    const { getByText } = render(<DateTimeDisplay dateTime={sampleDateTime} />);

    // Format the sampleDateTime using the same logic as the component
    const formattedDateTime = new Date(sampleDateTime).toLocaleString();

    // Check if the formatted date and time is displayed correctly in the component
    expect(getByText(formattedDateTime)).toBeInTheDocument();
  });
});





