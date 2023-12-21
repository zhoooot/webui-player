import React, { useState, useEffect } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface TimeBarProps {
  duration: number; // Duration in milliseconds
  onFinished?: () => void; // Callback function to be called when the countdown is finished
}

const TimeBar: React.FC<TimeBarProps> = ({ duration, onFinished }) => {
  return (
    <div className='overflow-hidden flex flex-row justify-center'>
      <Countdown
        date={Date.now() + duration}
        intervalDelay={1} // Update every millisecond
        precision={3} // Show milliseconds
        renderer={({ seconds, milliseconds, completed, total }) => {
          if (completed && onFinished) {
            onFinished();
          }

          const progress = (total / duration) * 100;

          return (
            <div className="bg-blue-500 h-4 w-5/6 rounded-2xl">
            <div
              className="h-full w-full bg-yellow-500 rounded-2xl"
              style={{ width: `${progress}%` }}
            />
          </div>
          );
        }}
      />
    </div>
  );
};

export default TimeBar;
