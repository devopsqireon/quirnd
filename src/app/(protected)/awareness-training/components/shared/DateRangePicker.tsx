// /app/awareness-training/components/shared/DateRangePicker.tsx
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onDateRangeChange: (startDate: string, endDate: string) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate = '',
  endDate = '',
  onDateRangeChange,
  className = ""
}) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleApply = () => {
    onDateRangeChange(localStartDate, localEndDate);
  };

  const handleClear = () => {
    setLocalStartDate('');
    setLocalEndDate('');
    onDateRangeChange('', '');
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Calendar className="w-4 h-4 text-gray-400" />
      <Input
        type="date"
        value={localStartDate}
        onChange={(e) => setLocalStartDate(e.target.value)}
        className="w-36"
      />
      <span className="text-gray-400">to</span>
      <Input
        type="date"
        value={localEndDate}
        onChange={(e) => setLocalEndDate(e.target.value)}
        className="w-36"
      />
      <Button size="sm" onClick={handleApply}>
        Apply
      </Button>
      <Button size="sm" variant="outline" onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
};

export default DateRangePicker;