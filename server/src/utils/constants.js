/**
 * Never relay on the frontend amount because some can alter this frontend amount (MIM - Man In the Middle Attack)
 */
const membershipAmount = {
    'silver': 300,
    'gold': 700,
}

const membershipValidity = {
    'silver': '3 Months',
    'gold': '7 Months',
}

module.exports = { membershipAmount, membershipValidity };
