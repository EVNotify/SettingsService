const asyncHandler = require('@evnotify/utils').asyncHandler;
const SettingsModel = require('../models/Settings');
const errors = require('../errors.json');

const replaceOrCreateSettings = asyncHandler(async (req, res, next) => {
    const settingsObj = req.body || {};

    if (settingsObj.akey != null && settingsObj.akey != req.params.akey) return next(errors.AKEY_MISMATCH);

    settingsObj.akey = req.params.akey;

    res.json(await SettingsModel.findOneAndUpdate({
        akey: settingsObj.akey
    }, settingsObj, {
        upsert: true,
        new: true
    }));
});

const getSettings = asyncHandler(async(req, res, next) => {
    res.json(await SettingsModel.findOne({
        akey: req.params.akey
    }));
});

const updateSettings = asyncHandler(async(req, res, next) => {
    const settingsObj = req.body || {};

    if (settingsObj.akey != null && settingsObj.akey != req.params.akey) return next(errors.AKEY_MISMATCH);

    settingsObj.akey = req.params.akey;

    res.json(await SettingsModel.updateOne({
        akey: settingsObj.akey
    }, settingsObj, {
        new: true
    }));
});

module.exports = {
    replaceOrCreateSettings,
    getSettings,
    updateSettings
};