import {ScoreModel} from '../model/score';

const check=(value)=>{
    if(value===1 || value===-1) return true;
    else false;
};

export async function getScore(area) {
    console.log(area);
    if(isNaN(area)) return 'InValid_area';
    else{
        if(area<0||area>10) return 'InValid_area';
        else{
            const ans = await ScoreModel.find({area: area},(err,score)=>{
                if(err) throw Error(err);
            });
            // console.log(ans);
            if(!ans) return 'NotFound'
            return [ans.made,ans.fail];            
        }
    }
}

export async function setScore(area, made, fail) {
    // TODO: area가 number인지, 0~10 범위 안에 드는지, made, fail이 +1/-1인지 검증해야 함.
    const ans = await ScoreModel.find({area: area});
    // console.log(ans);
    // 해당 결과가 있는지, 없는 경우 새로 생성할 것
    
    // made, fail이 type 외에도 슛을 넣었을 때 적절한 범위 안에 해당되는지도 검증해야 함.
    // 1. 생성하는 경우
    await ScoreModel.create({area: area, made: made, fail: fail});
    
    // 2. 변경하는 경우
    if(check(made)) ans.made += made;
    if(check(fail)) ans.fail += fail;
    await ans.save();

    // 정확하게 변경 되었는지, 그러지 못했으면 error를 throw 할 것
    return true;
}
