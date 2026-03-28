import React from 'react';
import styles from './Card.module.scss';
import { PaintingsWithDetails } from '@/types';

export interface ArtCardProps {
  painting: PaintingsWithDetails;
}

export const Card: React.FC<ArtCardProps> = ({ painting }) => {
 console.log('Карточка:', painting);
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={painting.imageUrl} alt={painting.imageUrl} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.line} />
        <div className={styles.info}>
          <p className={styles.title}>{painting.name}</p>
          <p className={styles.created}>{painting.created}</p>
        </div>
      </div>
    </div>
  );
};
