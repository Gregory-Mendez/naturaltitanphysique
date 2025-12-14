import { useState, useEffect } from "react";
import { lumi } from "../lib/lumi";

export function useAuth() {
  const [user, setUser] = useState(lumi.auth.user);
  const [isAuthenticated, setIsAuthenticated] = useState(lumi.auth.isAuthenticated);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = lumi.auth.onAuthChange(({ isAuthenticated, user }) => {
      setUser(user);
      setIsAuthenticated(isAuthenticated);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const { user, accessToken } = await lumi.auth.signIn();
      console.log("User authenticated:", user);
      return { user, accessToken };
    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    lumi.auth.signOut();
  };

  return {
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut,
  };
}
