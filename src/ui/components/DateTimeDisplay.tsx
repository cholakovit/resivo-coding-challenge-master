

interface DateTimeDisplayProps {
  dateTime: string;
}

export function DateTimeDisplay ({ dateTime }: DateTimeDisplayProps) {
  const formattedDateTime = new Date(dateTime).toLocaleString();
  return (
    <div>
      <p>{formattedDateTime}</p>
    </div>
  );
};

