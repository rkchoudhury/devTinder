const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../../models/connectionRequest");
const sendEmail = require("../emailUtils/sendEmail");


/**
 * Every second this job will run
 * 
 * Syntax:
 *      second (Optional) | min | hour | day | month | day of week
 */
// cron.schedule("* * * * * *", () => {
//     console.log("Hello World, " + new Date());
// });

/**
 * Send emails to all the people who got requests on the previous day
 * 
 * This job will run at 8 AM in the morning everyday
 */
cron.schedule("0 8 * * *", async () => {
    try {
        // Set the value to `0` to send mails for the friend requests which are sent within 24 hours
        const previousDay = subDays(new Date(), 1);
        const previousDayStart = startOfDay(previousDay); // 00.00 AM
        const previousDayEnd = endOfDay(previousDay); // 11.59 PM

        /**
         * This query can also be very expensive.
         * 
         * This query can also be paginated using Limit for performance improvements
         */
        const pendingRequests = await ConnectionRequest.find({
            status: "interested",
            createdAt: {
                $gte: previousDayStart,
                $lt: previousDayEnd,
            },
        }).populate("fromUserId toUserId");

        const listOfEmails = pendingRequests.map((req) => req.toUserId.emailId);
        const listOfUniqueEmailIds = [...new Set(listOfEmails)];

        /**
         * Not Proficent:
         *  1. Works good for less number of users.
         *  2. It is a syncroneous way / blocking way of sending the requests.
         * 
         * For handling millions of email Ids
         *  - We can use queue or send emails in bluck operations
         * 
         *  0. Send bluck request to Amazon SES and they will handle it.
         *  1. Or, we can create our own queue in nodejs process and send the emails in batches.
         *      - We can create queue using following libraries and send the emails in batch format.
         *          - bee-queue
         *          - bullMQ
         */
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

/**
 * Notes:
 * 
 * Visit `crontab.guru` to test the cron job
 */
