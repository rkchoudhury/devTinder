const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, message) => {
    return new SendEmailCommand({
        Destination: {
            /* required */
            CcAddresses: [
                /* more items */
            ],
            ToAddresses: [
                toAddress,
                /* more To-email addresses */
            ],
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: "<h1>You have got one request. 🥰</h1></br>" + message,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Hello User!",
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "DevTinder 💕: Hey you have got a Friend Request!",
            },
        },
        Source: fromAddress,
        ReplyToAddresses: [
            /* more items */
        ],
    });
};

const run = async (message, _recipientEmailId, _senderEmailId) => {
    const sendEmailCommand = createSendEmailCommand(
        "rakeshchoudhury@gmail.com", // "recipient@example.com",
        "choudhuryrakesh@gmail.com", // "sender@example.com",
        message
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (caught) {
        if (caught instanceof Error && caught.name === "MessageRejected") {
            const messageRejectedError = caught;
            return messageRejectedError;
        }
        throw caught;
    }
};

module.exports = { run };