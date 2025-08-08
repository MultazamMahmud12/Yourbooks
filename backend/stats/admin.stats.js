const Order = require('../orders/order.model');
const Book = require('../books/book.model');

// Get comprehensive admin statistics
const getAdminStats = async (req, res) => {
    try {
        // 📈 Sales Overview
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        
        const avgOrderValue = totalRevenue[0]?.total / totalOrders || 0;

        // 📚 Book Statistics
        const totalBooks = await Book.countDocuments();
        const totalBooksSold = await Order.aggregate([
            { $unwind: '$books' },
            { $group: { _id: null, total: { $sum: '$books.quantity' } } }
        ]);

        // 🎯 Genre Performance
        const genreStats = await Order.aggregate([
            { $unwind: '$books' },
            {
                $lookup: {
                    from: 'books',
                    localField: 'books.bookId',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            {
                $group: {
                    _id: '$bookDetails.category',
                    totalSold: { $sum: '$books.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$books.quantity', '$books.price'] } },
                    avgPrice: { $avg: '$books.price' },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);

        // 💰 Profit Analysis
        const profitAnalysis = await Order.aggregate([
            { $unwind: '$books' },
            {
                $lookup: {
                    from: 'books',
                    localField: 'books.bookId',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            {
                $addFields: {
                    costPrice: { $multiply: ['$books.price', 0.6] }, // Assuming 40% markup
                    profit: { $multiply: ['$books.price', 0.4] },
                    totalCost: { $multiply: [{ $multiply: ['$books.price', 0.6] }, '$books.quantity'] },
                    totalProfit: { $multiply: [{ $multiply: ['$books.price', 0.4] }, '$books.quantity'] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCost: { $sum: '$totalCost' },
                    totalProfit: { $sum: '$totalProfit' },
                    totalRevenue: { $sum: { $multiply: ['$books.quantity', '$books.price'] } }
                }
            }
        ]);

        const profit = profitAnalysis[0] || { totalCost: 0, totalProfit: 0, totalRevenue: 0 };
        const grossMargin = profit.totalRevenue > 0 ? (profit.totalProfit / profit.totalRevenue * 100) : 0;

        // 📅 Monthly Sales Trend
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$totalPrice' },
                    avgOrderValue: { $avg: '$totalPrice' }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
        ]);

        // 🏆 Top Selling Books
        const topBooks = await Order.aggregate([
            { $unwind: '$books' },
            {
                $lookup: {
                    from: 'books',
                    localField: 'books.bookId',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            {
                $group: {
                    _id: '$books.bookId',
                    title: { $first: '$bookDetails.title' },
                    author: { $first: '$bookDetails.author' },
                    category: { $first: '$bookDetails.category' },
                    totalSold: { $sum: '$books.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$books.quantity', '$books.price'] } }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 10 }
        ]);

        // 👥 Customer Analytics
        const customerStats = await Order.aggregate([
            {
                $group: {
                    _id: '$email',
                    orderCount: { $sum: 1 },
                    totalSpent: { $sum: '$totalPrice' },
                    avgOrderValue: { $avg: '$totalPrice' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCustomers: { $sum: 1 },
                    avgOrdersPerCustomer: { $avg: '$orderCount' },
                    avgCustomerValue: { $avg: '$totalSpent' }
                }
            }
        ]);

        // 📊 Recent Orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('_id name email totalPrice createdAt')
            .lean();

        res.json({
            success: true,
            data: {
                overview: {
                    totalOrders,
                    totalRevenue: totalRevenue[0]?.total || 0,
                    avgOrderValue: Math.round(avgOrderValue * 100) / 100,
                    totalBooks,
                    totalBooksSold: totalBooksSold[0]?.total || 0
                },
                profit: {
                    totalRevenue: profit.totalRevenue,
                    totalCost: profit.totalCost,
                    totalProfit: profit.totalProfit,
                    grossMargin: Math.round(grossMargin * 100) / 100
                },
                genreStats,
                monthlySales,
                topBooks,
                customerStats: customerStats[0] || {
                    totalCustomers: 0,
                    avgOrdersPerCustomer: 0,
                    avgCustomerValue: 0
                },
                recentOrders
            }
        });

    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
};

// Get genre-specific statistics
const getGenreStats = async (req, res) => {
    try {
        const genrePerformance = await Order.aggregate([
            { $unwind: '$books' },
            {
                $lookup: {
                    from: 'books',
                    localField: 'books.bookId',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            { $unwind: '$bookDetails' },
            {
                $group: {
                    _id: '$bookDetails.category',
                    totalSold: { $sum: '$books.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$books.quantity', '$books.price'] } },
                    avgPrice: { $avg: '$books.price' },
                    orderCount: { $sum: 1 },
                    uniqueBooks: { $addToSet: '$books.bookId' }
                }
            },
            {
                $addFields: {
                    uniqueBooksCount: { $size: '$uniqueBooks' },
                    avgRevenuePerBook: { $divide: ['$totalRevenue', { $size: '$uniqueBooks' }] }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]);

        res.json({
            success: true,
            data: genrePerformance
        });

    } catch (error) {
        console.error('Error fetching genre stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch genre statistics'
        });
    }
};

// Get sales trends with date range
const getSalesTrends = async (req, res) => {
    try {
        const { startDate, endDate, period = 'monthly' } = req.query;
        
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter = {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            };
        }

        let groupBy = {};
        if (period === 'daily') {
            groupBy = {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
                day: { $dayOfMonth: '$createdAt' }
            };
        } else if (period === 'weekly') {
            groupBy = {
                year: { $year: '$createdAt' },
                week: { $week: '$createdAt' }
            };
        } else {
            groupBy = {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
            };
        }

        const salesTrends = await Order.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: groupBy,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$totalPrice' },
                    avgOrderValue: { $avg: '$totalPrice' },
                    totalBooks: { $sum: { $size: '$books' } }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.week': 1 } }
        ]);

        res.json({
            success: true,
            data: salesTrends
        });

    } catch (error) {
        console.error('Error fetching sales trends:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sales trends'
        });
    }
};

module.exports = {
    getAdminStats,
    getGenreStats,
    getSalesTrends
};