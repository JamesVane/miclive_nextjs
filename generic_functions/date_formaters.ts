
import { DateTime, Interval, Duration } from "luxon";

export const formatDateString = (timestamp : number) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(timestamp * 1000);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const ordinalIndicator = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    return `${dayOfWeek}, ${month}. ${day}${ordinalIndicator}`;
  };

export const formatTimeHour = (timestamp : number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

export const formatMonthDay = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
  
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
  
    return `${month}. ${day}${suffix}`;
  };

 export function datepicketToUnix(dateString: string): number {
    const date = new Date(dateString);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
  }

 export function computeNewTime(start_time: DateTime, end_time: DateTime, amount: number) {
  
    const interval = Interval.fromDateTimes(start_time, end_time);
    const newIntervalLength = Math.floor(interval.length('seconds') / amount);
    if(newIntervalLength > 3599){return 3599}
    else{return newIntervalLength}
  }

export function computePerformerFromTime(start_time: DateTime, end_time: DateTime, time_per_performer: number): number {
    
    const totalDuration = end_time.diff(start_time);
  
    const totalDurationMillis = totalDuration.as('seconds');
  
    if (time_per_performer === 0) {
      throw new Error("The time per performer cannot be zero");
    }
  
    const countOfPerformers = Math.floor(totalDurationMillis / time_per_performer);
  
    return countOfPerformers;
}
export function formatStringDate(timestamp: string): string {
  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", 
    "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const date = new Date(timestamp);

  const dayOfWeek = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();
 
  // Adding ordinal suffix for day of month
  let daySuffix = "th";
  if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) daySuffix = "st";
  else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) daySuffix = "nd";
  else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) daySuffix = "rd";

  return `${dayOfWeek}, ${month} ${dayOfMonth}${daySuffix}`;
}

export function formatStringToTime(timestamp: string): string {
  const date = new Date(timestamp);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  // Convert hour '0' to '12'
  hours = hours ? hours : 12;

  // Ensure minutes are two digits
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();

  return `${hours}:${minutesStr} ${ampm}`;
}