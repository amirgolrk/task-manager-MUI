import React, { useState,useEffect } from 'react';

interface CurrentTimeProps {}

const CurrentTimeComponent: React.FC<CurrentTimeProps> = () => {
  const [formattedDate, setFormattedDate] = useState('');

  const updateFormattedDate = () => {
    const currentDate = new Date();

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeekIndex = currentDate.getDay();
    const monthIndex = currentDate.getMonth();

    const dayName = dayNames[dayOfWeekIndex];
    const monthName = monthNames[monthIndex];

    const dayOfMonth = currentDate.getDate();

    const formattedDate = `${dayName}, ${dayOfMonth} ${monthName}`;
    setFormattedDate(formattedDate);
  };
  useEffect(()=>{updateFormattedDate();},[])
   // Call the function once to set the initial date

  return (
    <p className='lead'>{formattedDate}</p>
  );
};

export default CurrentTimeComponent;
