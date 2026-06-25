"use client";

import React, { useMemo } from 'react';
import { CustomSelect } from './CustomSelect';
import { Clock } from 'lucide-react';

interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomTimePicker({ value, onChange, placeholder = "Select Time" }: CustomTimePickerProps) {
  const timeOptions = useMemo(() => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = String(h).padStart(2, '0');
        const minute = String(m).padStart(2, '0');
        const timeString = `${hour}:${minute}`;
        
        // Format for display (e.g., 02:30 PM)
        const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        const ampm = h < 12 ? 'AM' : 'PM';
        const displayString = `${String(displayHour).padStart(2, '0')}:${minute} ${ampm}`;
        
        options.push({ value: timeString, label: displayString });
      }
    }
    return options;
  }, []);

  return (
    <CustomSelect
      value={value}
      onChange={onChange}
      options={timeOptions}
      placeholder={placeholder}
      icon={<Clock className="w-5 h-5" />}
    />
  );
}
