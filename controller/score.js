import {ScoreModel} from '../model/score';

export async function getScore(area) {
    
    area = Number(area);
    console.log(area);
    // TODO: area가 number인지, 0~10 범위 안에 드는지 검증해야 함
    if(!isNaN(area)){
        if(area<0||area>10)return 'Invalid number';//error
        else{
            const ans = await ScoreModel.find({area: area});
            console.log(ans);
            if(!ans){console.log('whatf');return 'not found';}
            // getScore에서 made와 fail을 돌려줄 것, 지금은 0,0 돌려줌
            return [ans.made,ans.fail];
        }
    }
    return 'String';
}

export async function setScore(area, made, fail) {
    // TODO: area가 number인지, 0~10 범위 안에 드는지, made, fail이 +1/-1인지 검증해야 함.
    area = Number(area);
    if(!isNaN(area)){
        if(area<0||area>10)return 'Invalid number';//error
        else{
            const ans = await ScoreModel.findOne({area: area},(err)=>{
                if(err)throw Error(err);
            });
            console.log(made);
            let change=0;
            if(ans){//ans exists
                if(made===1||made===-1){
                    ans.made+=Number(made);
                    change=1;
                }
                if(fail===+1||made===-1){
                    ans.fail+=Number(fail);
                    change=1;
                }
                if(change){
                    if(ans.made<0)ans.made=0;
                    if(ans.fail<0)ans.fail=0;
                }
                await ans.save((err)=>{
                    if(err)throw Error(err);
                });
            }
            else{
                console.log('else');
                await ScoreModel.create({area: area, made: made, fail: fail},(err,score)=>{
                    if(err)throw Error(err);
                });
                console.log(created);
            }
            return true;
        }
    }
    return 'Some Error';
    
    // console.log(ans);
    // 해당 결과가 있는지, 없는 경우 새로 생성할 것
    
    // made, fail이 type 외에도 슛을 넣었을 때 적절한 범위 안에 해당되는지도 검증해야 함.
    // 1. 생성하는 경우
    
    // 2. 변경하는 경우
    // 정확하게 변경 되었는지, 그러지 못했으면 error를 throw 할 것
}
