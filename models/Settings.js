const mongoose = require('mongoose');

const options = {
    id: false,
    collection: 'settings',
    timestamps: true,
    toObject: {
        getters: true
    },
    versionKey: false
};

const SettingsSchema = new mongoose.Schema({
    akey: {
        type: String,
        required: true,
        unique: true
    },
    autoSOC: {
        type: Boolean,
        default: false
    },
    summary: {
        type: Boolean,
        default: false
    },
    SOCThreshold: {
        type: Number,
        required: true,
        default: 70
    },
    language: {
        type: String,
        required: true,
        default: 'en'
    },
    car: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: false,
        default: null
    },
    consumption: {
        type: Number,
        required: true,
        default: 12
    },
    device: {
        type: String,
        required: false
    }
}, options);

module.exports = mongoose.model('Settings', SettingsSchema);