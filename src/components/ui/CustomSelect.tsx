"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "@/lib/motion";
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: React.ReactNode;
}

export function CustomSelect({ value, onChange, options, placeholder = "Select...", icon }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 backdrop-blur-sm border ${isOpen ? 'border-secondary/50 ring-1 ring-secondary/50' : 'border-white/10'} rounded-xl p-4 flex items-center justify-between text-left transition-all hover:bg-white/10`}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-secondary">{icon}</div>}
          <span className={selectedOption ? "text-white" : "text-white/50"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-foreground/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
              {options.length === 0 ? (
                <div className="p-4 text-center text-sm text-white/50">No options available</div>
              ) : (
                options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${
                      value === option.value 
                        ? 'bg-secondary/10 text-secondary font-medium' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {option.label}
                    {value === option.value && <Check className="w-4 h-4" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
