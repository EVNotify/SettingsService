const cors = require('cors');
const express = require('express');

const errors = require('./errors.json');
const port = process.env.PORT || 3003;

const authorizationMiddleware = require('./middlewares/authorization');
const settingsRouter = require('./routes/settings');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// Cross-Origin-Resource-Sharing support
app.use(cors({
    credentials: true,
    /**
     * Handles the origin for CORS request
     * @param {String} origin the origin
     * @param {Function} callback callback function
     */
    origin: (origin, callback) => {
        if (!origin || origin === 'null') origin = '*';
        callback(null, origin);
    }
}));

// route parsing
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// route handling
app.use('/settings', authorizationMiddleware, settingsRouter);

// unknown route
app.use((_req, _res, next) => next(errors.UNKNOWN_ROUTE));

// error handling
app.use((err, req, res, next ) => {
    if (!err) err = new Error();

    console.error('An error occurred on ' + req.method + ' ' + req.url, err);

    if (res.headersSent) return next(err);
    const status = parseInt(err.status || err.code) || 500;

    res.status(status >= 400 && status < 600 ? status : 422).json({
        error: process.env.NODE_ENV === 'development' ? err : status === 500 ? errors.INTERNAL_ERROR.message : errors.UNPROCESSABLE_ENTITY.message
    });
});

require('./utils/db').connect().then(() => {
    app.listen(port, () => console.log(`[HTTP] Server started on port ${port}`));
    app.emit('server_ready');
}).catch(() => {
    console.error('Database connection failed');
    process.exit(1);
});

module.exports = app;