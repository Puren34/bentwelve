'use client';

import styles from '@/app/ui/styles/welcome.module.css';

export default function Welcome() {
  return (
    <div className="text-center py-8">
      <h1 className={`romanesco text-[85px] font-bold text-gray-800 ${styles.fadeIn}`}>
        Welcome to our Store
      </h1>
    </div>
  );
}