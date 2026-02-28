const admin = require("firebase-admin");
const { google } = require("googleapis");
const path = require("node:path");

// Import the Firebase configuration to initialize the SDK
require('../../config/firebase'); 

// Function to send a notification to a device
async function sendNotification(token, title, body) {
    const message = {
        notification: {
            title,
            body,
        },
        android: {
            priority: "high",
        },
        data: {
            deepLink: "ncbdapp://feature1",
            title: "แจ้งเตือนรหัส OTP",
            content: "รหัส OTP ของคุณคือ 12345"
        },
        apns: {
            payload: {
                aps: {
                    alert: { title, body },
                    sound: "default",
                    contentAvailable: true,
                },
            },
        },
        token,
    };

    try {
        const response = await admin.messaging().send(message);
        console.log("Notification sent successfully:", response);
        return response;
    } catch (error) {
        console.error("Error sending notification:", error);
        throw error;
    }
}

// Function to get an access token using Google OAuth2
async function getAccessToken() {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, "../../serviceAccountKey.json"), // path to the service account key
        scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });

    try {
        const accessToken = await auth.getAccessToken();
        console.log("Access Token:", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    }
}

module.exports = {
    sendNotification,
    getAccessToken,
};
