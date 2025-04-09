import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import './LoginScreen.css';
import dinoPink from '../assets/rosa.png';
import dinoBlue from '../assets/azul.png';
import { useNavigate } from 'react-router-dom';

interface LoginScreenProps {
  onReveal?: (gender: 'girl' | 'boy') => void;
}

// const LoginScreen: React.FC<LoginScreenProps> = ({ onReveal }) => {
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonIcon, setButtonIcon] = useState('🦖');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulamos una pequeña espera dramática
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (password.toLowerCase() === 'dinoamor') { // Contraseña especial
      setShowConfetti(true);
      setButtonIcon('🎀👶');
      
      // Revelación después de 2 segundos
      setTimeout(() => {
        // Aquí va tu lógica real para determinar el género
        // Esto es solo un ejemplo:
        const gender = Math.random() > 0.5 ? 'girl' : 'boy';
        // const gender = 'boy';
        
        // Navegación a la pantalla de revelación con el género como parámetro
        navigate(`/reveal/${gender}`, {
          state: {
            // Puedes pasar datos adicionales si lo necesitas
            revealDate: new Date().toLocaleString(),
            parents: "Papa y Mamá Dino"
          }
        });
      }, 2000);
    } else {
      setError(true);
      setButtonIcon('❌');
      setTimeout(() => setButtonIcon('🦖'), 1000);
    }
    setIsLoading(false);
  };


  return (
    <div className="login-container">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      {/* Lados con dinosaurios */}
      <div className="side left-side">
        <div className="dino-container">
          <img src={dinoPink} alt="Dinosaurio Rosa" className="dino-image" />
        </div>
      </div>
      
      <div className="side right-side">
        <div className="dino-container">
          <img src={dinoBlue} alt="Dinosaurio Azul" className="dino-image" />
        </div>
      </div>

      {/* Contenido central */}
      <div className="center-content">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="center-text"
        >
          <h1>¿Será niño o niña?</h1>
          <h2>Descubre el gran secreto...</h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="password-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="input-container">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Ingresa la contraseña mágica"
              className={`form-input ${error ? 'input-error' : ''}`}
            />
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-message"
            >
              ¡Ups! Prueba con "dinoamor"
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
          >
            <span className="button-text">
              {isLoading ? 'Descifrando...' : 'Revelar el secreto'}
            </span>
            <span className="button-icon">{buttonIcon}</span>
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginScreen;