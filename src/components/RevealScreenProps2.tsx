import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import './revel.css';
interface RevealScreenProps {
  gender: 'boy' | 'girl';
}
const RevealScreen: React.FC = () => {
    const { gender } = useParams<{ gender: 'boy' | 'girl' }>();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);
  const [showElements, setShowElements] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Temporizador para redirección
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Animación de aparición
    const appearanceTimer = setTimeout(() => {
      setShowElements(true);
    }, 500);

    return () => {
      clearInterval(timer);
      clearTimeout(appearanceTimer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className={`reveal-container-sophisticated ${gender}`}>
      {showConfetti && (
        <Confetti
          recycle={true}
          numberOfPieces={200}
          gravity={0.2}
          colors={gender === 'boy' ? ['#4e9af1', '#ADD8E6'] : ['#FF6B9E', '#FFC0CB']}
        />
      )}

      <div className="reveal-background">
        {gender === 'boy' ? (
          <div className="boy-pattern" />
        ) : (
          <div className="girl-pattern" />
        )}
      </div>

      {showElements && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="reveal-content-sophisticated"
        >
          <h1 className="reveal-title-sophisticated">
            {gender === 'boy' ? '¡FELICIDADES!' : '¡FELICIDADES!'}
          </h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="gender-reveal"
          >
            {gender === 'boy' ? (
              <>
                <div className="blue-ribbon">👶 VARONCITO</div>
                <div className="blue-sparkle">✨</div>
              </>
            ) : (
              <>
                <div className="pink-ribbon">👧 PRINCESITA</div>
                <div className="pink-sparkle">✨</div>
              </>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="reveal-message-sophisticated"
          >
            {gender === 'boy'
              ? 'Un nuevo guerrero llega a la familia'
              : 'Una rosa preciosa florece en su jardín'}
          </motion.p>
        </motion.div>
      )}

      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="countdown-sophisticated"
      >
        La pantalla se cerrará en {countdown} segundos
      </motion.div>
    </div>
  );
};

export default RevealScreen;