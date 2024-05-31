const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        payment: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        dateLimit: {
            type: Date,
            get: (dateLimit) => dateFormat(dateLimit),
            required: true,
        },
    }
)










module.exports = jobSchema;