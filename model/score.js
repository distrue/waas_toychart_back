import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}).then(async() => {
    console.log('MongoDB connected...')
})
.catch(error => console.log(error))

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

export const ScoreModel = mongoose.model('scores', schema);
