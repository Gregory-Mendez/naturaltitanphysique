
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Contact from './pages/Contact'

// Lazy loading des pages pour optimisation du bundle
const Home = lazy(() => import('./pages/Home'))
const Exercises = lazy(() => import('./pages/Exercises'))
const Programs = lazy(() => import('./pages/Programs'))
const Nutrition = lazy(() => import('./pages/Nutrition'))
const Products = lazy(() => import('./pages/Products'))
const Booking = lazy(() => import('./pages/Booking'))
const Subscription = lazy(() => import('./pages/Subscription'))
const Legal = lazy(() => import('./pages/Legal'))
const Admin = lazy(() => import('./pages/Admin'))

// Composant de chargement
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      <p className="text-white mt-4 text-xl font-semibold">Chargement...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercices" element={<Exercises />} />
              <Route path="/programmes" element={<Programs />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/produits" element={<Products />} />
              <Route path="/abonnement" element={<Subscription />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/reservation" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
