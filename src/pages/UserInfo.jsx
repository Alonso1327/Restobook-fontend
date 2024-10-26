import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  if (!auth) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1E2330] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#D2B48C]">
            Información del Usuario
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="bg-[#2A2F3F] p-4 rounded-md">
              <p className="text-[#D2B48C]"><strong>Token:</strong> {auth.token}</p>
              <p className="text-[#D2B48C]"><strong>Tipo de Usuario:</strong> {auth.user_type}</p>
              <p className="text-[#D2B48C]"><strong>ID de Usuario:</strong> {auth.id}</p>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#D2B48C] hover:bg-[#C19A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D2B48C]"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
