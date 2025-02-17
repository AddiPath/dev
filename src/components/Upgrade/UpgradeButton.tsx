import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { UpgradeModal } from './UpgradeModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UpgradeButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function UpgradeButton({ variant = 'primary', className = '' }: UpgradeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=upgrade');
      return;
    }
    setIsModalOpen(true);
  };

  const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-150";
  const variantStyles = variant === 'primary'
    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-sm"
    : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/40";

  return (
    <>
      <button
        onClick={handleUpgradeClick}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        <Crown className="w-5 h-5 mr-2" />
        Upgrade to Pro
      </button>

      <UpgradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}