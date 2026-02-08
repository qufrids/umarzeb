// app/(admin)/dashboard/page.tsx
// Admin Dashboard Overview

'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  MessageSquare,
  FileText,
  Eye,
  TrendingUp,
  Activity,
  Mail,
  Calendar
} from 'lucide-react';

interface DashboardStats {
  totalPageViews: number;
  uniqueVisitors: number;
  unreadMessages: number;
  publishedPosts: number;
  recentMessages: any[];
  topPages: any[];
  recentActivity: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  async function fetchDashboardStats() {
    try {
      // Fetch multiple endpoints in parallel
      const [analytics, messages, blog] = await Promise.all([
        fetch('/api/analytics').then(r => r.json()),
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/blog?limit=5').then(r => r.json()),
      ]);

      setStats({
        totalPageViews: analytics.summary.totalPageViews,
        uniqueVisitors: analytics.summary.uniqueVisitors,
        unreadMessages: messages.messages.filter((m: any) => m.status === 'UNREAD').length,
        publishedPosts: blog.pagination.total,
        recentMessages: messages.messages.slice(0, 5),
        topPages: analytics.topPages.slice(0, 5),
        recentActivity: [], // Combined recent activity
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Eye className="w-6 h-6" />}
          label="Page Views"
          value={stats?.totalPageViews.toLocaleString() || '0'}
          change="+12.5%"
          changeType="positive"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Unique Visitors"
          value={stats?.uniqueVisitors.toLocaleString() || '0'}
          change="+8.2%"
          changeType="positive"
        />
        <StatCard
          icon={<MessageSquare className="w-6 h-6" />}
          label="Unread Messages"
          value={stats?.unreadMessages.toString() || '0'}
          change={stats?.unreadMessages > 0 ? 'New' : ''}
          changeType={stats?.unreadMessages > 0 ? 'warning' : 'neutral'}
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label="Published Posts"
          value={stats?.publishedPosts.toString() || '0'}
          change=""
          changeType="neutral"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Recent Messages
            </h2>
            <a
              href="/dashboard/messages"
              className="text-primary hover:text-purple-400 text-sm font-medium"
            >
              View All →
            </a>
          </div>

          <div className="space-y-4">
            {stats?.recentMessages.map((message: any) => (
              <div
                key={message.id}
                className="p-4 bg-darker/50 rounded-lg border border-white/5 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white">{message.name}</h3>
                    <p className="text-sm text-gray-400">{message.email}</p>
                  </div>
                  {message.status === 'UNREAD' && (
                    <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">{message.message}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(message.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Top Pages
            </h2>
            <a
              href="/dashboard/analytics"
              className="text-primary hover:text-purple-400 text-sm font-medium"
            >
              View Analytics →
            </a>
          </div>

          <div className="space-y-3">
            {stats?.topPages.map((page: any, index: number) => (
              <div
                key={page.path}
                className="flex items-center justify-between p-3 bg-darker/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary/40">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-white font-medium">{page.path}</p>
                    <p className="text-sm text-gray-400">{page.views} views</p>
                  </div>
                </div>
                <div className="w-20 h-8 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded flex items-end justify-end p-1">
                  <div
                    className="bg-primary rounded"
                    style={{
                      height: `${(page.views / stats.topPages[0].views) * 100}%`,
                      width: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          icon={<FileText className="w-6 h-6" />}
          title="New Blog Post"
          description="Create and publish a new article"
          href="/dashboard/blog/new"
          color="primary"
        />
        <QuickAction
          icon={<MessageSquare className="w-6 h-6" />}
          title="View Messages"
          description="Check and respond to inquiries"
          href="/dashboard/messages"
          color="purple"
        />
        <QuickAction
          icon={<Activity className="w-6 h-6" />}
          title="Analytics"
          description="View detailed traffic reports"
          href="/dashboard/analytics"
          color="cyan"
        />
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  change,
  changeType
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'warning' | 'neutral';
}) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    warning: 'text-yellow-400',
    neutral: 'text-gray-400',
  };

  return (
    <div className="glass rounded-xl p-6 hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/20 rounded-lg text-primary">
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{label}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

// Quick Action Component
function QuickAction({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: 'primary' | 'purple' | 'cyan';
}) {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary border-primary/30',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
  };

  return (
    <a
      href={href}
      className={`
        group p-6 rounded-xl border bg-gradient-to-br
        hover:scale-105 transition-all duration-200
        ${colorClasses[color]}
      `}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-white font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </a>
  );
}

// Global CSS (add to globals.css)
/*
.glass {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
*/
