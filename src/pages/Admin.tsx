import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {Shield, Key, Mail, Calendar, CheckCircle, XCircle, AlertCircle, Lock} from 'lucide-react';
import toast from 'react-hot-toast';
import { lumi } from '../lib/lumi';

interface AccessCode {
  _id: string;
  code: string;
  email: string;
  planId: string;
  status: 'active' | 'revoked';
  createdAt: string;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'revoked'>('all');

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'TitanGryx2024') {
      setIsAuthenticated(true);
      fetchCodes();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'TitanGryx2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'TitanGryx2024');
      toast.success('Accès admin activé');
      fetchCodes();
    } else {
      toast.error('Mot de passe incorrect');
    }
  };

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const response = await lumi.entities.access_codes.list({
        sort: { createdAt: -1 },
        limit: 100
      });
      setCodes(response.list);
    } catch (error) {
      console.error('Error fetching codes:', error);
      toast.error('Erreur lors du chargement des codes');
    } finally {
      setLoading(false);
    }
  };

  const revokeCode = async (codeId: string) => {
    try {
      await lumi.entities.access_codes.update(codeId, { status: 'revoked' });
      toast.success('Code révoqué');
      fetchCodes();
    } catch (error) {
      console.error('Error revoking code:', error);
      toast.error('Erreur lors de la révocation');
    }
  };

  const reactivateCode = async (codeId: string) => {
    try {
      await lumi.entities.access_codes.update(codeId, { status: 'active' });
      toast.success('Code réactivé');
      fetchCodes();
    } catch (error) {
      console.error('Error reactivating code:', error);
      toast.error('Erreur lors de la réactivation');
    }
  };

  const filteredCodes = codes.filter(code => {
    if (filter === 'all') return true;
    return code.status === filter;
  });

  const stats = {
    total: codes.length,
    active: codes.filter(c => c.status === 'active').length,
    revoked: codes.filter(c => c.status === 'revoked').length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-8 rounded-xl border-2 border-red-600 max-w-md w-full"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-red-600 to-green-600 p-4 rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Admin - Gestion des Codes
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                <Lock className="inline w-4 h-4 mr-2" />
                Mot de passe admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="TitanGryx2024"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Se connecter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-red-600 to-green-600 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Gestion Admin</h1>
                <p className="text-gray-400">Codes d'accès clients</p>
              </div>
            </div>
            <button
              onClick={fetchCodes}
              className="bg-gray-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              Actualiser
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <Key className="w-8 h-8 text-gray-500" />
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl border border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Actifs</p>
                  <p className="text-3xl font-bold text-green-500">{stats.active}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl border border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Révoqués</p>
                  <p className="text-3xl font-bold text-red-500">{stats.revoked}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-red-600 to-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Tous ({stats.total})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Actifs ({stats.active})
            </button>
            <button
              onClick={() => setFilter('revoked')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'revoked'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Révoqués ({stats.revoked})
            </button>
          </div>
        </motion.div>

        {/* Codes List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Chargement...</p>
          </div>
        ) : filteredCodes.length === 0 ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Aucun code trouvé</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCodes.map((code) => (
              <motion.div
                key={code._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-gray-800 p-6 rounded-xl border-2 ${
                  code.status === 'active' ? 'border-green-600' : 'border-red-600'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        code.status === 'active'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}>
                        {code.status === 'active' ? 'ACTIF' : 'RÉVOQUÉ'}
                      </div>
                      <span className="bg-gray-700 px-4 py-1 rounded-lg font-mono text-white text-lg font-bold">
                        {code.code}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{code.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Key className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {code.planId === 'premium_app_monthly' ? '6,99€/mois' : '49€/an'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(code.createdAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {code.status === 'active' ? (
                      <button
                        onClick={() => revokeCode(code._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Révoquer
                      </button>
                    ) : (
                      <button
                        onClick={() => reactivateCode(code._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Réactiver
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;