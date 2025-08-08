import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
    MdBook, 
    MdShoppingCart, 
    MdPeople, 
    MdAttachMoney,
    MdTrendingUp,
    MdTrendingDown,
    MdAdd,
    MdEdit,
    MdAnalytics,
    MdNotifications,
    MdSettings
} from 'react-icons/md';
import axios from 'axios';
import getBaseUrl from '../utils/getbaseUrl';

const Dashboard_main = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState({
        totalBooks: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        recentOrders: [],
        topBooks: [],
        notifications: []
    });
    const [adminInfo, setAdminInfo] = useState(null);

    // ✅ Helper function to safely format currency
    const formatCurrency = (amount) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '$0';
        }
        return `$${amount.toLocaleString()}`;
    };

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                
                // Get admin info from localStorage
                const user = localStorage.getItem('user');
                if (user) {
                    setAdminInfo(JSON.parse(user));
                }

                // Try to fetch real stats from API
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${getBaseUrl()}/api/admin/stats`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    
                    if (response.data.success) {
                        setDashboardStats(response.data.data);
                    }
                } catch (apiError) {
                    console.log('Using demo data - API not available');
                    // Use demo data if API fails
                    setDashboardStats({
                        totalBooks: 156,
                        totalOrders: 89,
                        totalRevenue: 12450.75,
                        totalCustomers: 245,
                        recentOrders: [
                            { 
                                id: 'ORD-1234', 
                                customer: 'John Doe', 
                                email: 'john@example.com',
                                amount: 45.99, 
                                status: 'completed',
                                date: new Date().toISOString()
                            },
                            { 
                                id: 'ORD-1235', 
                                customer: 'Jane Smith', 
                                email: 'jane@example.com',
                                amount: 67.50, 
                                status: 'pending',
                                date: new Date().toISOString()
                            },
                            { 
                                id: 'ORD-1236', 
                                customer: 'Mike Johnson', 
                                email: 'mike@example.com',
                                amount: 23.99, 
                                status: 'shipped',
                                date: new Date().toISOString()
                            },
                        ],
                        topBooks: [
                            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', sold: 45, revenue: 675.55 },
                            { title: 'To Kill a Mockingbird', author: 'Harper Lee', sold: 38, revenue: 494.74 },
                            { title: '1984', author: 'George Orwell', sold: 42, revenue: 546.58 },
                            { title: 'Pride and Prejudice', author: 'Jane Austen', sold: 35, revenue: 455.65 },
                        ],
                        notifications: [
                            { id: 1, message: 'New order received from John Doe', time: '2 minutes ago', type: 'order' },
                            { id: 2, message: 'Low stock alert: JavaScript Guide', time: '1 hour ago', type: 'warning' },
                            { id: 3, message: 'Monthly sales report ready', time: '3 hours ago', type: 'info' }
                        ]
                    });
                }

            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
                <span className="ml-4 text-xl text-gray-600">Loading dashboard...</span>
            </div>
        );
    }

    const statsCards = [
        {
            title: 'Total Books',
            value: dashboardStats.totalBooks || 0,
            change: '+12%',
            trend: 'up',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            icon: MdBook
        },
        {
            title: 'Total Orders',
            value: dashboardStats.totalOrders || 0,
            change: '+8%',
            trend: 'up',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            icon: MdShoppingCart
        },
        {
            title: 'Total Revenue',
            // ✅ FIXED: Use helper function to safely format currency
            value: formatCurrency(dashboardStats.totalRevenue),
            change: '+15%',
            trend: 'up',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            icon: MdAttachMoney
        },
        {
            title: 'Total Customers',
            value: dashboardStats.totalCustomers || 0,
            change: '+5%',
            trend: 'up',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600',
            icon: MdPeople
        }
    ];

    const quickActions = [
        {
            title: 'Add New Book',
            description: 'Add a new book to your inventory',
            path: 'add-new-book',
            icon: MdAdd,
            color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
            hoverColor: 'hover:from-indigo-600 hover:to-indigo-700'
        },
        {
            title: 'Manage Books',
            description: 'Edit or delete existing books',
            path: '/manage-books',
            icon: MdEdit,
            color: 'bg-gradient-to-r from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700'
        },
        {
            title: 'View Analytics',
            description: 'Check sales and performance metrics',
            path: '/dashboard/stats',
            icon: MdAnalytics,
            color: 'bg-gradient-to-r from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                Welcome back, {adminInfo?.username || 'Admin'}! 👋
                            </h1>
                            <p className="text-indigo-100 text-lg">
                                Here's what's happening with your bookstore today
                            </p>
                            <div className="mt-4 text-indigo-200">
                                📅 {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="h-24 w-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <MdAnalytics className="h-12 w-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((card, index) => {
                        const Icon = card.icon;
                        const TrendIcon = card.trend === 'up' ? MdTrendingUp : MdTrendingDown;
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`bg-gradient-to-r ${card.color} rounded-lg p-3`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex items-center">
                                        <TrendIcon className={`h-4 w-4 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                                        <span className={`text-sm font-medium ml-1 ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {card.change}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <NavLink
                                    key={index}
                                    to={action.path}
                                    className={`${action.color} ${action.hoverColor} text-white rounded-xl p-6 transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
                                >
                                    <div className="flex items-center">
                                        <Icon className="h-8 w-8 mr-4" />
                                        <div>
                                            <h3 className="font-bold text-lg">{action.title}</h3>
                                            <p className="text-sm opacity-90 mt-1">{action.description}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                            <NavLink 
                                to="/orders" 
                                className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
                            >
                                View all →
                            </NavLink>
                        </div>
                        <div className="space-y-4">
                            {/* ✅ FIXED: Safe array handling */}
                            {(dashboardStats.recentOrders || []).slice(0, 5).map((order, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                            <MdShoppingCart className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{order.customer || 'Unknown'}</p>
                                            <p className="text-sm text-gray-600">Order #{order.id || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {/* ✅ FIXED: Safe amount formatting */}
                                        <p className="font-bold text-gray-900">{formatCurrency(order.amount)}</p>
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {order.status || 'unknown'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
                            <MdNotifications className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {/* ✅ FIXED: Safe array handling */}
                            {(dashboardStats.notifications || []).map((notification) => (
                                <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-900">{notification.message || 'No message'}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notification.time || 'Just now'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Books */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Top Selling Books</h3>
                        <NavLink 
                            to="/manage-books" 
                            className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
                        >
                            Manage books →
                        </NavLink>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Book Title</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Author</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Sold</th>
                                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* ✅ FIXED: Safe array handling */}
                                {(dashboardStats.topBooks || []).map((book, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium text-gray-900">{book.title || 'Unknown'}</td>
                                        <td className="py-3 px-4 text-gray-600">{book.author || 'Unknown'}</td>
                                        <td className="py-3 px-4 text-center text-gray-900">{book.sold || 0}</td>
                                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                                            {formatCurrency(book.revenue)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Performance Overview */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                            <p className="text-sm text-green-700 font-medium">Customer Satisfaction</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600 mb-2">2.3 days</div>
                            <p className="text-sm text-blue-700 font-medium">Avg. Delivery Time</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                            <p className="text-sm text-purple-700 font-medium">Order Fulfillment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_main;