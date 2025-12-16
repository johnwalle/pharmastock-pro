"use client";

import { useEffect, useRef, useState } from "react";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, getMessagingInstance } from "../../firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function getNotificationPermissionAndToken(): Promise<string | null> {
  if (!("Notification" in window)) return null;

  // Permission already granted
  if (Notification.permission === "granted") return await fetchToken();

  // Ask for permission if not denied
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") return await fetchToken();
  }

  return null;
}

interface UseFcmTokenReturn {
  fcmToken: string | null;
  notificationPermissionStatus: NotificationPermission | null;
}

const useFcmToken = (): UseFcmTokenReturn => {
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);

  // Load FCM token
  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const token = await getNotificationPermissionAndToken();

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      isLoading.current = false;
      return;
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load token, please refresh the browser.");
        isLoading.current = false;
        return;
      }
      retryLoadToken.current += 1;
      isLoading.current = false;
      await loadToken();
      return;
    }

    setNotificationPermissionStatus(Notification.permission);
    setFcmToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window) loadToken();
  }, [loadToken]);

  // Listen for foreground messages
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const setupListener = async () => {
      if (!fcmToken) return;

      const messagingInstance = await getMessagingInstance();
      if (!messagingInstance) return;

      const { messaging } = messagingInstance;

      unsubscribe = onMessage(messaging, (payload) => {
        if (Notification.permission !== "granted") return;

        const link = payload.fcmOptions?.link || payload.data?.link;

        // Toast notification
        if (link) {
          toast.info(`${payload.notification?.title}: ${payload.notification?.body}`, {
            action: {
              label: "Visit",
              onClick: () => router.push(link),
            },
          });
        } else {
          toast.info(`${payload.notification?.title}: ${payload.notification?.body}`);
        }

        // Browser notification
        const n = new Notification(payload.notification?.title || "New message", {
          body: payload.notification?.body || "This is a new message",
          data: link ? { url: link } : undefined,
        });

        n.onclick = function (event: Event) {
          event.preventDefault();

          // 'this' is the Notification instance
          const target = event.target as Notification & { data?: { url?: string } };
          const url = target.data?.url;

          if (url) {
            router.push(url);
          }
        };

      });
    };

    setupListener();

    return () => unsubscribe?.();
  }, [fcmToken, router]);

  return { fcmToken, notificationPermissionStatus };
};

export default useFcmToken;
