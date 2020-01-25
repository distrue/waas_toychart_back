import {ScoreModel} from '../model/score';

export async function getScore(area) {
    area = Number(area);
    if(!isNaN(area)){
        if(0<=area<=10){
            const ans = await ScoreModel.findOne({area: area}, (err, score) => {
                if(err) throw Error(err)
            });
            //if ans === err
            if(!ans) return 'Not Found'
            return [ans.made, ans.fail];
        } else return 'Invaild';
    } else return 'Invaild';
}

export async function setScore(area, made, fail) {
    area = Number(area);
    if(!isNaN(area)){
        if(0<=area<=10){
            const ans = await ScoreModel.findOne({area: area}, (err, score) => {
                if(err) throw Error(err);
            });
            //if ans === err
            if(ans) {
                let changed = 0;
                if(made==='+1'||made==='-1') {
                    ans.made += Number(made);
                    changed = 1;
                }
                if(fail==='+1'||fail==='-1') {
                    ans.fail += Number(fail); 
                    changed = 1;
                }
                if(!changed) {
                    made = Number(made);
                    fail = Number(fail);
                    if(!isNaN(made)) ans.made = made;
                    if(!isNaN(fail)) ans.fail = fail;
                }
                await ans.save((err) => {
                    if(err) throw Error(err);
                });
                return true;
            }
            else {
                await ScoreModel.create({area: area, made: made, fail: fail});
                return 'Created';
            }
        } else {return 'Invaild';}
    } else {return 'Invaild';}
}
