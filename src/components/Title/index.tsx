'use client'
import React from 'react';
import { usePreventLineBreak } from '@/utils/shorten';
import classNames from 'classnames';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  const { ref, isOverflow } = usePreventLineBreak();

  return (
    <h1
      ref={ref}
      className={classNames(
        'text-2xl font-bold overflow-hidden whitespace-nowrap',
        {
          'truncate': isOverflow
        }
      )}
    >
      {text}
    </h1>
  );
};

export default Title;