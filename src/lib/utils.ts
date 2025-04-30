
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, format: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {};

  if (format.includes('dd')) options.day = '2-digit';
  if (format.includes('d')) options.day = 'numeric';
  
  if (format.includes('MMM')) options.month = 'short';
  if (format.includes('MM')) options.month = '2-digit';
  if (format.includes('M')) options.month = 'numeric';
  
  if (format.includes('yyyy')) options.year = 'numeric';
  if (format.includes('yy')) options.year = '2-digit';
  
  if (format.includes('HH') || format.includes('hh')) options.hour = '2-digit';
  if (format.includes('H') || format.includes('h')) options.hour = 'numeric';
  
  if (format.includes('mm')) options.minute = '2-digit';
  if (format.includes('m')) options.minute = 'numeric';

  // Adjust for 12/24 hour format
  if (format.toLowerCase().includes('a')) {
    options.hour12 = true;
  } else {
    options.hour12 = false;
  }

  try {
    let formatted = new Intl.DateTimeFormat('en-GB', options).format(date);
    
    // Format special cases
    if (format === 'HH:mm') {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      formatted = `${hours}:${minutes}`;
    }
    
    return formatted;
  } catch (e) {
    console.error('Date formatting error:', e);
    return dateString;
  }
}

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomColor = (): string => {
  const colors = ['#2196f3', '#ff3d41', '#4caf50', '#ffc107', '#9c27b0', '#ff9800', '#795548', '#607d8b'];
  return colors[Math.floor(Math.random() * colors.length)];
};
