import {ScoreModel} from '../model/score';

export async function getScore(area) {
    if(typeof area !== 'number' || area <= 0 || area >= 10) {
        return null;
    }
    const ans = await ScoreModel.find({area: area});
    // getScore에서 made와 fail을 돌려줄 것, 지금은 0,0 돌려줌
    return {
        made: ans[0].made,
        fail: ans[0].fail
    };
}

export async function setScore(area, made, fail) {
    // TODO: area가 number인지, 0~10 범위 안에 드는지, made, fail이 +1/-1인지 검증해야 함.
    if (typeof area === 'number' && 0 <= area <= 10){
        // console.log(Math.abs(made))
        // console.log(Math.abs(made) == 1 && Math.abs(fail) == 1)
        if ( 0 <= Math.abs(made) <= 1 && 0 <=Math.abs(fail) <= 1){
            // const ans = await ScoreModel.find({area: area});
            const ans = await ScoreModel.findOne({area: area});
            // console.log(ans)
            if (ans === []){
                // 해당 결과가 있는지, 없는 경우 새로 생성할 것
                // made, fail이 type 외에도 슛을 넣었을 때 적절한 범위 안에 해당되는지도 검증해야 함.
                // 1. 생성하는 경우
                await ScoreModel.create({area: area, made: made, fail: fail});                
            }else{
                console.log(ans)
                
                // 2   . 변경하는 경우
                if(ans.made) ans.made += made;
                if(ans.fail) ans.fail += fail;
                console.log(ans.made);
                console.log(ans.fail);
                try {
                  await ans.save();
                } catch (err) {
                  console.log("error occured: ", err);
                }

                console.log(ans);
                return true;                                
            }
        }else{
            return false
        }
    }else{
        return false;
    }
}
