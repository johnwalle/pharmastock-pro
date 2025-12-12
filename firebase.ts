import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Function to return messaging instance and SW registration
export const getMessagingInstance = async () => {
  if (!(await isSupported())) return null;

  const messaging = getMessaging(app);
  const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

  return { messaging, swRegistration };
};

// Fetch FCM token safely
export const fetchToken = async () => {
  const result = await getMessagingInstance();
  if (!result) return null;

  const { messaging, swRegistration } = result;
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });
    return token;
  } catch (err) {
    console.error("Error fetching FCM token:", err);
    return null;
  }
};

export { app };
