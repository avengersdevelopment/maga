import Image from 'next/image';
import React from 'react';
import Marquee, { MarqueeProps } from 'react-fast-marquee';

interface RunningTextProps {
  image?: JSX.Element;
  coinName: string;
  count: number
  marqueProps?: MarqueeProps
}

export default function RunningText({ image,marqueProps, coinName, count }: RunningTextProps) {
  return (
    <div className='absolute z-40 w-full'>
      <Marquee className='bg-transparent py-6' {...marqueProps}>
        {Array.from({ length: count }).map((_, index) => (
          <div className='flex items-center gap-6 pr-4' key={index}>
            {image}
            <h2 className='text-4xl font-bold text-white'>{coinName}</h2>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
