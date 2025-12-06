const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../../models/connectionRequest");
const sendEmail = require("../emailUtils/sendEmail");

// crontab.guru

// Every second this job will run
// second | min | hour | day | month | day of week
// cron.schedule("* * * * * *", () => {
//     console.log("Hello World, " + new Date());
// });

/**
 * Send emails to all the people who got requests on the previous day
 */
cron.schedule("0 8 * * *", async () => {
    try {
        const previousDay = subDays(new Date(), 1);
        const previousDayStart = startOfDay(previousDay);
        const previousDayEnd = endOfDay(previousDay);

        const pendingRequests = await ConnectionRequest.find({
            status: "interested",
            createdAt: {
                $gte: previousDayStart,
                $lt: previousDayEnd,
            },
        }).populate("fromUserId toUserId");

        const listOfEmails = pendingRequests.map((req) => req.toUserId.emailId);
        const listOfUniqueEmailIds = [...new Set(listOfEmails)];

        for (const toEmailId of listOfUniqueEmailIds) {
            try {
                // Send Email
                const emailMessage = `New Friend Request Pending for ${toEmailId}. Please login to devTinder and accept/reject the request.`;
                await sendEmail.run(emailMessage, toEmailId, "support@devtinder.com");
                console.info("Email send successfully to " + toEmailId);
            } catch (error) {
                console.error("Error while sending email for " + toEmailId);
            }
        }
    } catch (error) {
        console.log("Error in corn job", error);
    }
});
