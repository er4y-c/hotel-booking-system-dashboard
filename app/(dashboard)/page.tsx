'use client';

import React, { useEffect } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import { authServices } from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';

const Dashboard = () => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authServices.profile();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ text: 'Dashboard', href: '/' }]} />
      <h1>Welcome! {user?.name || 'Guest'}</h1>
    </div>
  );
};

export default Dashboard;
