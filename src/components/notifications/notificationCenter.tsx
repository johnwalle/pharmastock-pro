"use client";

import { useEffect } from "react";
import { Bell, CheckCircle2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/store/notificationStore";
import { Notification } from "@/types/notification";

const groupNotifications = (notifications: Notification[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups = {
    Today: [] as Notification[],
    Yesterday: [] as Notification[],
    Earlier: [] as Notification[],
  };

  notifications.forEach((n) => {
    const date = new Date(n.createdAt);
    if (date >= today) groups.Today.push(n);
    else if (date >= yesterday) groups.Yesterday.push(n);
    else groups.Earlier.push(n);
  });

  return groups;
};

export default function NotificationCenter() {
  const { fetchUserNotifications, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useNotificationStore()
  
  const unreadCount = notifications?.filter((n) => !n.read).length;

  useEffect(() => {
    if (!notifications || notifications.length === 0) {
      fetchUserNotifications();
    }
  }, [fetchUserNotifications, notifications]);

  const grouped = groupNotifications(notifications);

  return (
    <div className="min-h-screen w-full bg-[#F4F7FE] dark:bg-neutral-900 px-6 py-10">

      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>

          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {unreadCount}
            </span>
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Stay informed about system alerts and updates.
        </p>

        {unreadCount > 0 && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={markAllNotificationsAsRead}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        )}
      </div>

      {/* Notification Groups */}
      <div className="max-w-4xl mx-auto space-y-10">

        {Object.entries(grouped).map(([period, items]) =>
          items.length > 0 ? (
            <div key={period} className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-semibold">
                <Clock className="w-4 h-4" />
                {period}
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((notif) => (
                    <motion.div
                      key={notif._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      onClick={() => markNotificationAsRead(notif._id)}
                      className={`cursor-pointer rounded-xl p-5 bg-white dark:bg-neutral-800 shadow-sm border 
                        transition-all duration-300 
                        ${notif.read ? "border-gray-200 dark:border-neutral-700" : "border-indigo-300 shadow-md"}
                      `}
                    >
                      <div className="flex items-start gap-4">

                        {/* Generic Icon */}
                        <div className="p-3 rounded-full bg-indigo-50 dark:bg-neutral-700">
                          <Bell className="w-5 h-5 text-indigo-600" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {notif.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatDistanceToNow(notif.createdAt, { addSuffix: true })}
                          </p>
                        </div>

                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : null
        )}

        {notifications.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mt-4">You are all caught up!</h3>
            <p className="text-gray-500 dark:text-gray-400">
              No notifications at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
