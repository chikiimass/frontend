'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface CardProps {
  data: any;
}

const CardBlock: React.FC<CardProps> = ({ data }) => {
  const router = useRouter();

  const navigateToVideo = () => {
    router.push(`/video/${data.id}`);
  };

  return (
    <div className="card cursor-pointer" onClick={navigateToVideo}>
      <img src={data.poster?.url || data.thumbnail?.url} alt={data.title || data.name} className="w-full h-auto" />
      <h2 className="text-lg font-bold mt-2">{data.title || data.name}</h2>
    </div>
  );
};

export default CardBlock;
