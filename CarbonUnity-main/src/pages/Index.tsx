import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const profile = localStorage.getItem('cu_profile');
    const hasProfile = !!profile;
    const target = hasProfile ? '/home' : '/onboarding';
    if (location.pathname === '/' || location.pathname === '/onboarding' || location.pathname === '/home') {
      navigate(target, { replace: true });
    }
  }, [navigate, location.pathname]);

  return null;
};

export default Index;
