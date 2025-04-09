// src/components/LoginScreen.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dinoPink from '../assets/rosa.png';
import dinoBlue from '../assets/azul.png';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_PASSWORD;
    if (password === correctPassword) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-r from-pink-100 to-blue-100">
      {/* Círculo con dino rosa (izquierda) */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full flex items-center justify-center"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={dinoPink} alt="Dino Rosa" className="w-32 h-32" />
      </motion.div>

      {/* Círculo con dino azul (derecha) */}
      <motion.div
        className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full flex items-center justify-center"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={dinoBlue} alt="Dino Azul" className="w-32 h-32" />
      </motion.div>

      {/* Contenedor para texto y formulario, centrado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-center leading-tight">
          Ella o él?
          <br />
          ¿Cuál será nuestro dinosaurio?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md max-w-sm w-[20rem]"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
            className={`border p-2 mb-4 w-full rounded ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {error && (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-red-500 mb-4 text-center"
            >
              Contraseña incorrecta
            </motion.div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;