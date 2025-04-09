import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import dinoPink from '../assets/rosa.png';
import dinoBlue from '../assets/azul.png';
import './revel.css';

const RevealScreen: React.FC = () => {
  const { gender } = useParams<{ gender: 'boy' | 'girl' }>();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className={`dino-reveal-container ${gender}`}>
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
          colors={gender === 'boy' ? ['#4e9af1', '#ADD8E6'] : ['#FF6B9E', '#FFC0CB']}
        />
      )}

      {/* Dinosaurio de fondo (solo decorativo) */}
      <motion.img
        src={gender === 'boy' ? dinoBlue : dinoPink}
        alt="Dinosaurio"
        className="dino-reveal-bg-image"
        initial={{ opacity: 0.1, scale: 1 }}
        animate={{ opacity: 0.15, scale: 1.05 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="dino-reveal-card"
      >
        <motion.h1 
          className="dino-reveal-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {gender === 'boy' ? '¡ES UN NIÑO! 👶' : '¡ES UNA NIÑA! 👧'}
        </motion.h1>

        <motion.div
          className="dino-reveal-icon-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <img 
            src={gender === 'boy' ? dinoBlue : dinoPink} 
            alt={gender === 'boy' ? 'Dinosaurio azul' : 'Dinosaurio rosa'}
            className="dino-reveal-main-image"
          />
          <div className="dino-reveal-gender-badge">
            {gender === 'boy' ? '💙' : '💖'}
          </div>
        </motion.div>

        <motion.p
          className="dino-reveal-message"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {gender === 'boy'
            ? 'Un pequeño explorador viene en camino'
            : 'Una princesa está por llegar'}
        </motion.p>

        <motion.div
          className="dino-reveal-countdown"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Volviendo en {countdown}s...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RevealScreen;