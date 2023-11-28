import React, { useState, useEffect } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface TimeBarProps {
  duration: number; // Duration in milliseconds
  onFinished?: () => void; // Callback function to be called when the countdown is finished
}

const TimeBar: React.FC<TimeBarProps> = ({ duration, onFinished }) => {
  return (
    <div className='flex flex-col overflow-hidden'>
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
            <div>
              <div className="bg-blue-500 h-2 absolute bottom-5 left-20 w-5/6">
                <div
                  className="h-full bg-yellow-500 absolute"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default TimeBar;
