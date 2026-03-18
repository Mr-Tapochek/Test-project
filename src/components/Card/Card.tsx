import React from 'react';
import styles from './Card.module.scss';
import { Painting } from '@/types';

export interface ArtCardProps {
  painting: Painting;
}

export const Card: React.FC<ArtCardProps> = ({ painting }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={painting.imgUrl} alt="img" className={styles.image} />
      </div>
      <div className={styles.content}>
        <p className={styles.imgName}>{painting.name}</p>
        <p className={styles.date}>{painting.created}</p>
      </div>
    </div>
  );
};
