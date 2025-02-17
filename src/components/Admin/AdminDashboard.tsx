import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, FileText, MessageSquare } from 'lucide-react';
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { UserManagement } from './UserManagement';
import { ContentManager } from './ContentManager';
import { ForumManagement } from './ForumManagement';

export function AdminDashboard() {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage users, content, and forum from one central location
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/users"
            className={`p-6 rounded-lg shadow-sm ${
              location.pathname.includes('/admin/users') ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <Users className={`w-8 h-8 ${location.pathname.includes('/admin/users') ? 'text-blue-500' : 'text-gray-400'}`} />
              <div className="ml-4">
                <h3 className={`text-lg font-semibold ${location.pathname.includes('/admin/users') ? 'text-blue-700' : 'text-gray-900'}`}>
                  User Management
                </h3>
                <p className={`text-sm ${location.pathname.includes('/admin/users') ? 'text-blue-600' : 'text-gray-500'}`}>
                  View and manage user accounts
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/content"
            className={`p-6 rounded-lg shadow-sm ${
              location.pathname.includes('/admin/content') ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <FileText className={`w-8 h-8 ${location.pathname.includes('/admin/content') ? 'text-blue-500' : 'text-gray-400'}`} />
              <div className="ml-4">
                <h3 className={`text-lg font-semibold ${location.pathname.includes('/admin/content') ? 'text-blue-700' : 'text-gray-900'}`}>
                  Content Management
                </h3>
                <p className={`text-sm ${location.pathname.includes('/admin/content') ? 'text-blue-600' : 'text-gray-500'}`}>
                  Edit website content and messaging
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/forum"
            className={`p-6 rounded-lg shadow-sm ${
              location.pathname.includes('/admin/forum') ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <MessageSquare className={`w-8 h-8 ${location.pathname.includes('/admin/forum') ? 'text-blue-500' : 'text-gray-400'}`} />
              <div className="ml-4">
                <h3 className={`text-lg font-semibold ${location.pathname.includes('/admin/forum') ? 'text-blue-700' : 'text-gray-900'}`}>
                  Forum Management
                </h3>
                <p className={`text-sm ${location.pathname.includes('/admin/forum') ? 'text-blue-600' : 'text-gray-500'}`}>
                  Moderate community discussions
                </p>
              </div>
            </div>
          </Link>
        </div>

        <Routes>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="forum" element={<ForumManagement />} />
          <Route path="*" element={<Navigate to="users" replace />} />
        </Routes>
      </div>
    </div>
  );
}