import admin from "../../config/firebase";


interface Message {
    token: string
    notification: {}
    data: {}
}


const sendNotification = async (fcmToken: string, title: string, body: object, data = {}) => {
    try {
        const message: Message = {
            token: fcmToken,
            notification: {
                title,
                body,
            },
            data
        }
        await admin.messaging().send(message)
    } catch (error: any) {
        console.error("notification failed: ", error.message)
    }

}

export default sendNotification