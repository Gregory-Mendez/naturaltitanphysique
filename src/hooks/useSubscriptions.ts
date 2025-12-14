import { useState, useEffect } from "react";
import { lumi } from "../lib/lumi";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserSubscription = async (userId: string) => {
    setLoading(true);
    try {
      const { list } = await lumi.entities.subscriptions.list({
        filter: { userId },
        sort: { createdAt: -1 },
        limit: 5,
      });
      
      // Check for active OR trialing (free trial) subscription
      const validSubscription = list.find((sub: any) => 
        sub.status === 'active' || sub.status === 'trialing'
      );
      
      if (validSubscription) {
        setCurrentSubscription(validSubscription);
      } else {
        setCurrentSubscription(null);
      }
      
      return validSubscription || null;
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (data: any) => {
    try {
      const newSubscription = await lumi.entities.subscriptions.create({
        ...data,
        status: "pending",
        accessPassword: "TitanGryx2024",
        creator: data.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      return newSubscription;
    } catch (error) {
      console.error("Failed to create subscription:", error);
      throw error;
    }
  };

  const updateSubscription = async (subscriptionId: string, updates: any) => {
    try {
      const updated = await lumi.entities.subscriptions.update(subscriptionId, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      
      // Refresh current subscription
      if (currentSubscription?._id === subscriptionId) {
        setCurrentSubscription(updated);
      }
      
      return updated;
    } catch (error) {
      console.error("Failed to update subscription:", error);
      throw error;
    }
  };

  const cancelSubscription = async (subscriptionId: string) => {
    try {
      await updateSubscription(subscriptionId, {
        status: "cancelled",
        autoRenew: false,
      });
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      throw error;
    }
  };

  return {
    subscriptions,
    currentSubscription,
    loading,
    fetchUserSubscription,
    createSubscription,
    updateSubscription,
    cancelSubscription,
  };
}
