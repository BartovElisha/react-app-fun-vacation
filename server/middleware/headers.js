module.exports = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    else {
        next();
    }
}