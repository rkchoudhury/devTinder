
const detectClient = (req, res, next) => {
    const clientType = req.headers['x-client-type'];

    if (!['web', 'mobile'].includes(clientType)) {
        return res.status(400).json({ message: 'Invalid client type' });
    }

    req.clientType = clientType;
    
    next();
};

module.exports = {
    detectClient,
}