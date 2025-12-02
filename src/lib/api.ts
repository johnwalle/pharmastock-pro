import authStore from '@/store/authStore';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface medicineData {
    title: string;
    message: string;
}

export const sendNotification = async (fcmToken: string, medicineData: medicineData) => {
    try {
        const response = await axios.post('/send-notification', {
          token: fcmToken,
          title: medicineData.title,
          message: medicineData.message,
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      const data = await response.data;
      console.log(data);
      return data;
      } catch (error: any) {
        console.error("Error sending notification:", error);
        throw error.response ? error.response.data : new Error("Network error");
      }
}

export const createNotification = async ( userId: string, title: string, message: string, link: string | '') => {
    const { userData } = authStore.getState();
    try {
      const token = userData?.tokens?.access?.token;
      if(!token) throw new Error("User is not authenticated");
      const response = await axios.post(`${API_URL}/notifications`, {
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
    });
    const data = await response.data;
    console.log(data);
    return data;
    } catch (error: any) {
      console.error("Error creating notification:", error);
      throw error.response ? error.response.data : new Error("Network error");
    }
  }
  