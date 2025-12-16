import authStore from '@/store/authStore';
import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface MedicineNotificationData {
  title: string;
  message: string;
}

interface ApiErrorResponse {
  message: string;
  [key: string]: any;
}

export const sendNotification = async (
  fcmToken: string,
  medicineData: MedicineNotificationData
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(
      '/send-notification',
      {
        token: fcmToken,
        title: medicineData.title,
        message: medicineData.message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error('Error sending notification:', error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }

    throw new Error('Network error');
  }
};

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  link: string = ''
): Promise<any> => {
  const { userData } = authStore.getState();
  try {
    const token = userData?.tokens?.access?.token;
    if (!token) throw new Error('User is not authenticated');

    const response: AxiosResponse = await axios.post(
      `${API_URL}/notifications`,
      {
        userId,
        title,
        message,
        link,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error('Error creating notification:', error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }

    throw new Error('Network error');
  }
};
