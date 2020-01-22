import mongoose from 'mongoose';

const schema = {
    area: {  // 농구 코트 영역, 숫자로 저장
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
