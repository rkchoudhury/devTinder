/**
 * Never relay on the frontend amount because some can alter this frontend amount (MIM - Man In the Middle Attack)
 */
membershipAmount = {
    'silver': 300,
    'gold': 700,
}

module.exports = { membershipAmount };
