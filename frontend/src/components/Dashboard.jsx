import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
    MdDashboard, 
    MdBook, 
    MdAdd, 
    MdEdit, 
    MdAnalytics, 
    MdShoppingCart, 
    MdPeople, 
    MdLogout,
    MdMenu,
    MdClose
} from 'react-icons/md';
import axios from 'axios';
import  getBaseUrl  from '../utils/getbaseUrl'; // Adjust the import path as
const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminInfo, setAdminInfo] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });
            } catch (error) {
                console.error('Error fetching admin info:', error);
                
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin');
    };

    const menuItems = [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: MdDashboard,
            exact: true
        },
        {
            path: '/dashboard/stats',
            name: 'Analytics',
            icon: MdAnalytics
        },
        {
            path: '/dashboard/manage-books',
            name: 'Manage Books',
            icon: MdBook
        },
        {
            path: '/dashboard/add-new-book',
            name: 'Add New Book',
            icon: MdAdd
        },
        {
            path: '/dashboard/orders',
            name: 'Orders',
            icon: MdShoppingCart
        },
        {
            path: '/dashboard/customers',
            name: 'Customers',
            icon: MdPeople
        }
    ];

    const isCurrentPath = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                           fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
                           lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out`}>
                
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-16 px-6 bg-indigo-600">
                    <div className="flex items-center">
                        <MdBook className="h-8 w-8 text-white" />
                        <span className="ml-2 text-xl font-semibold text-white">BookStore Admin</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white hover:text-gray-200"
                    >
                        <MdClose className="h-6 w-6" />
                    </button>
                </div>

                {/* Admin Info */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                <span className="text-white font-medium">
                                    {adminInfo?.username?.charAt(0).toUpperCase() || 'A'}
                                </span>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                                {adminInfo?.username || 'Admin'}
                            </p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`${
                                        isCurrentPath(item.path, item.exact)
                                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-200`}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 w-full p-3">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 
                                 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200"
                    >
                        <MdLogout className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                            >
                                <MdMenu className="h-6 w-6" />
                            </button>
                            <h1 className="ml-2 lg:ml-0 text-2xl font-semibold text-gray-900">
                                {menuItems.find(item => 
                                    isCurrentPath(item.path, item.exact)
                                )?.name || 'Dashboard'}
                            </h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-500">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {location.pathname === '/dashboard' ? (
                            <DashboardHome />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

// Dashboard Home Component
const DashboardHome = () => {
    const [quickStats, setQuickStats] = useState({
        totalBooks: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0
    });

    useEffect(() => {
        // You can fetch real stats here
        // For now, using dummy data
        setQuickStats({
            totalBooks: 150,
            totalOrders: 89,
            totalRevenue: 12450.50,
            totalCustomers: 245
        });
    }, []);

    const statsCards = [
        {
            title: 'Total Books',
            value: quickStats.totalBooks,
            color: 'bg-blue-500',
            icon: MdBook
        },
        {
            title: 'Total Orders',
            value: quickStats.totalOrders,
            color: 'bg-green-500',
            icon: MdShoppingCart
        },
        {
            title: 'Total Revenue',
            value: `$${quickStats.totalRevenue.toLocaleString()}`,
            color: 'bg-purple-500',
            icon: MdAnalytics
        },
        {
            title: 'Total Customers',
            value: quickStats.totalCustomers,
            color: 'bg-orange-500',
            icon: MdPeople
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to Your BookStore Dashboard
                </h2>
                <p className="text-gray-600">
                    Here's what's happening with your store today.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center">
                                <div className={`${card.color} rounded-lg p-3`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                    <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <NavLink
                        to="/dashboard/add-new-book"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <MdAdd className="h-8 w-8 text-indigo-600" />
                        <div className="ml-3">
                            <p className="font-medium text-gray-900">Add New Book</p>
                            <p className="text-sm text-gray-500">Add a new book to your inventory</p>
                        </div>
                    </NavLink>
                    
                    <NavLink
                        to="/dashboard/manage-books"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <MdEdit className="h-8 w-8 text-green-600" />
                        <div className="ml-3">
                            <p className="font-medium text-gray-900">Manage Books</p>
                            <p className="text-sm text-gray-500">Edit or delete existing books</p>
                        </div>
                    </NavLink>
                    
                    <NavLink
                        to="/dashboard/stats"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <MdAnalytics className="h-8 w-8 text-purple-600" />
                        <div className="ml-3">
                            <p className="font-medium text-gray-900">View Analytics</p>
                            <p className="text-sm text-gray-500">Check your sales and performance</p>
                        </div>
                    </NavLink>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                                <MdShoppingCart className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">New order received</p>
                            <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <MdBook className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">New book added to inventory</p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <MdPeople className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">New customer registered</p>
                            <p className="text-xs text-gray-500">3 hours ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;