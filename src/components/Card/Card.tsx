import React from 'react';
import styles from './Card.module.scss';
import { PaintingsWithDetails } from '@/types';

export interface ArtCardProps {
  painting: PaintingsWithDetails;
}

export const Card: React.FC<ArtCardProps> = ({ painting }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={painting.imageUrl} alt={painting.imageUrl} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.line} />
        <div className={styles.info}>
          <div className={styles.defaultInfo}>
            <p className={styles.title}>{painting.name}</p>
            <p className={styles.created}>{painting.created}</p>
          </div>
          <div className={styles.hoverInfo}>
            <p className={styles.title}>{painting.authorName}</p>
            <p className={styles.created}>{painting.locationName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
