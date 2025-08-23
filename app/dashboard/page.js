// app/dashboard/page.js

'use client'; // This page uses client-side hooks and actions

import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';

function Dashboard() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await auth.signOut();
    // The AuthProvider will automatically redirect to /login
  };

  return (
    <ProtectedRoute>
      <h1>Welcome to your Dashboard, {user?.email}!</h1>
      <p>This page is protected.</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </ProtectedRoute>
  );
}

export default Dashboard;