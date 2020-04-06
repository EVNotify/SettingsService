const mongoose = require('mongoose');
const connection = require('@evnotify/utils').db.getDB();

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
    auto_soc: {
        type: Boolean,
        default: false
    },
    summary: {
        type: Boolean,
        default: false
    },
    soc_threshold: {
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
        default: ''
    },
    capacity: {
        type: Number,
        required: false,
        default: null
    },
    consumption: {
        type: Number,
        required: true,
        default: 15
    },
    device: {
        type: String,
        default: ''
    }
}, options);

module.exports = connection.model('Settings', SettingsSchema);