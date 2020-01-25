const mongoose = require('mongoose');

const schema = {
    area: {
        type: Number,
        required: true
    },
    made: {
        type: Number,
        default: 0
    },
    fail: {
        type: Number,
        default: 0
    }
};

export const ScoreModel = mongoose.model('score', schema);
