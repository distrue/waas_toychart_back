import {ScoreModel} from '../model/score';

export async function getScore(area) {
    // TODO: area가 number인지, 0~10 범위 안에 드는지 검증해야 함
    area = Number(area);
    if( isNaN(area) ) {
        return "Unexpected_type";
    }
    if( area < 0 || 10 < area ) {
        return "Out_of_range";
    }
    
    const ans = await ScoreModel.findOne( { area: area } );
    // getScore에서 made와 fail을 돌려줄 것, 지금은 0,0 돌려줌
    return [ans.made, ans.fail];
}

export async function setScore(area, ismade, isbutton, num) {
    // TODO: area가 number인지, 0~10 범위 안에 드는지, made, fail이 +1/-1인지 검증해야 함.
    area = Number(area);
    ismade = ismade === '1';
    isbutton = isbutton === '1';
    num = Number(num);

    if( isNaN(area) || isNaN(num) ) {
        return "Unexpected_type";
    }
    if( area < 0 || 10 < area ) {
        return "Out_of_range_area";
    }
    if( isbutton && num !== -1 && num !== 1 ) {
        return "Unexpected_button_value";
    }
    if( !isbutton && ( num < 0 || num > 99999 ) ) {
        return "Out_of_range_shot";
    }
    
    const ans = await ScoreModel.findOne( { area: area } );
    // 해당 결과가 있는지, 없는 경우 새로 생성할 것
    // made, fail이 type 외에도 슛을 넣었을 때 적절한 범위 안에 해당되는지도 검증해야 함.
    // 1. 생성하는 경우
    if( ans.made === undefined || ans.fail === undefined ) {
        console.log("ASdf");
        if( isbutton && num === -1 ) num = 0;
        if(ismade) await ScoreModel.create({area: area, made: num, fail: 0});
        else await ScoreModel.create({area: area, made: 0, fail: num});
        return true;
    }
    // 2. 변경하는 경우
    if(isbutton) {
        if(ismade) ans.made += num;
        else ans.fail += num;
    }
    else {
        if(ismade) ans.made = num;
        else ans.fail = num;
    }
    await ans.save();
    // 정확하게 변경 되었는지, 그러지 못했으면 error를 throw 할 것
    return true;
}
