import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import BlogListPage from '@/pages/BlogListPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ResourcesPage from '@/pages/ResourcesPage';
import ContactPage from '@/pages/ContactPage';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="sobre-mi" element={<AboutPage />} />
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/:postId" element={<BlogPostPage />} />
            <Route path="recursos" element={<ResourcesPage />} />
            <Route path="contacto" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;