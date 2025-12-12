import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

const serviceAccountJson = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!,
  "base64"
).toString("utf-8");

const serviceAccount = JSON.parse(serviceAccountJson);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  try {
    const { token, title, message, link } = await request.json();

    const payload: Message = {
      token,
      notification: { title, body: message },
      webpush: link ? { fcmOptions: { link } } : undefined,
    };

    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Error sending FCM:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
