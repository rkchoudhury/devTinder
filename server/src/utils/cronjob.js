const cron = require("node-cron");

// Every second this job will run
// second | min | hour | day | month | day of week
cron.schedule("* * * * * *", () => {
    console.log("Hello World, " + new Date());
});

// min | hour | day | month | day of week
cron.schedule("* * * * *", () => {
    console.log("Hello World, " + new Date().getFullYear());
});