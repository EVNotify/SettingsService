const asyncHandler = require('@evnotify/utils').asyncHandler;
const SettingsModel = require('../models/Settings');
const errors = require('../errors.json');

const akeyMismatch = (settingsAKey, paramAKey) => settingsAKey != null && settingsAKey != paramAKey;

const getSettings = asyncHandler(async(req, res, next) => {
    if (req.params.akey != req.headers.akey) return next(errors.AKEY_MISMATCH);

    res.json(await SettingsModel.findOneAndUpdate({
        akey: req.params.akey
    }, {
        akey: req.params.akey
    }, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    }).select('-_id -createdAt'));
});

const updateSettings = asyncHandler(async(req, res, next) => {
    const settingsObj = req.body || {};

    if (req.params.akey != req.headers.AKey) return next(errors.AKEY_MISMATCH);
    if (akeyMismatch(settingsObj.akey, req.params.akey)) return next(errors.AKEY_MISMATCH);

    settingsObj.akey = req.params.akey;

    res.json(await SettingsModel.findOneAndUpdate({
        akey: settingsObj.akey
    }, settingsObj, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    }).select('-_id -createdAt'));
});

const deleteSettings = asyncHandler(async(req, res, next) => {
    if (req.params.akey != req.headers.AKey) return next(errors.AKEY_MISMATCH);

    await SettingsModel.deleteOne({
        akey: req.params.akey
    });

    res.status(204).end();
});

module.exports = {
    getSettings,
    updateSettings,
    deleteSettings
};
