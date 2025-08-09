// src/components/Dashboard.jsx
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
    MdDashboard, 
    MdAdd, 
    MdEdit, 
    MdAnalytics,
    MdShoppingCart,
    MdSettings,
    MdLogout
} from 'react-icons/md';

const Dashboard = () => {
    const location = useLocation();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: MdDashboard,
            current: location.pathname === '/dashboard'
        },
        {
            name: 'Add Book',
            href: '/dashboard/add-new-book',
            icon: MdAdd,
            current: location.pathname === '/dashboard/add-new-book'
        },
        {
            name: 'Manage Books',
            href: '/dashboard/manage-books',
            icon: MdEdit,
            current: location.pathname === '/dashboard/manage-books'
        },
        {
            name: 'Analytics',
            href: '/dashboard/stats',
            icon: MdAnalytics,
            current: location.pathname === '/dashboard/stats'
        },
        {
            name: 'Orders',
            href: '/dashboard/orders', 
            icon: MdShoppingCart,
            current: location.pathname === '/dashboard/orders'
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <h1 className="text-xl font-bold text-gray-900">
                            📚 Bookstore Admin
                        </h1>
                    </div>
                    <div className="mt-8 flex-grow flex flex-col">
                        <nav className="flex-1 px-2 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) =>
                                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                                                isActive
                                                    ? 'bg-indigo-100 text-indigo-900'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <Outlet /> {/* ✅ This renders the child routes */}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;