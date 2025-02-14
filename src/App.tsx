import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import ProfileSetup from './pages/ProfileSetup';
import { AuthState } from './types';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    profile: null,
  });

  const [loading, setLoading] = useState(false); // 🔹 Agregar el estado de carga
  useEffect(() => {
    const checkSession = async () => {
   
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        setLoading(true); // �� Agregar el estado de carga
        if (error) throw error;
  
        if (session) {
          setAuthState({
            isAuthenticated: true,
            user: session.user,
            profile: null,
          });
  
          // Obtener el perfil del usuario
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
  
          if (profileError) {
            console.error("❌ Error obteniendo perfil:", profileError);
          }
  
          setAuthState(prev => ({
            ...prev,
            profile: profile || null,
          }));
        }
      } catch (err) {
        console.error("❌ Error en checkSession:", err);
      } finally {
        setLoading(false); // ✅ Se ejecuta siempre, haya o no errores
      }
    };
  
    checkSession();
  
    // Escuchar cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔄 Cambio en la autenticación:", event, session);
  
        if (session) {
          setAuthState({
            isAuthenticated: true,
            user: session.user,
            profile: null,
          });
  
          // Obtener perfil
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
  
          setAuthState(prev => ({
            ...prev,
            profile: profile || null,
          }));
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            profile: null,
          });
        }
  
        setLoading(false);
      }
    
    );
  
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  
  // Mostrar pantalla de carga si loading es true
  if (loading) {
    return (
      <div className="min-h-screen bg-[#34568B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...
          Fallando
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            authState.isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Auth />
            )
          }
        />
        <Route
          path="/profile/setup"
          element={
            !authState.isAuthenticated ? (
              <Navigate to="/auth" replace />
            ) : (
              <ProfileSetup />
            )
          }
        />
        <Route
          path="/*"
          element={
            !authState.isAuthenticated ? (
              <Navigate to="/auth" replace />
            ) : (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </Layout>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
