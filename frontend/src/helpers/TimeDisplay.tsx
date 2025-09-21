
//import React from 'react';

interface TimeDisplayProps {
  unixTime : number
}


const TimeDisplay: React.FC<TimeDisplayProps> = ({ unixTime }) => {
  const THREE_DAYS_IN_SECONDS = 3 * 24 * 60 * 60 * 1000;

  const getCurrentTime = () => {
    const currentTime = new Date().getTime();
    return currentTime;
  };

  const formatDate = (timestamp : number) => {
    const date = new Date(timestamp);
    const options : Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatSolarDate = (timestamp : number) => {
    const date = new Date(timestamp);
    const options : Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getTimeDifference = (timestamp : number) => {
    const currentTime = getCurrentTime();
    const localTime = new Date().getTimezoneOffset() * 60 * 1000; // Local timezone offset in milliseconds
    const difference = currentTime + localTime - timestamp;

    if (difference <= THREE_DAYS_IN_SECONDS) {
      // Less than 3 days ago, show relative time
      const secondsAgo = Math.floor(difference / 1000);
      if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
      } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} minutes ago`;
      } else {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo} hours ago`;
      }
    } else {
      // More than 3 days ago, show the day of week and solar date
      return `${formatDate(timestamp)} (${formatSolarDate(timestamp)})`;
    }
  };

  const timeString = getTimeDifference(unixTime);

  //return <div>{timeString}</div>;

  return <p className="lead taskdate">{timeString}</p>
};

export default TimeDisplay;
