import {ScoreModel} from '../model/score';


export async function getScore(area) {
    console.log(area);
    area=Number(area);
    if(isNaN(area))
        return 'InValid_area';
    else{
        if(area<0||area>10) {
            return 'InValid_area';
        }
        else{
            const ans = await ScoreModel.findOne({area: area});
            console.log(ans);
            if(!ans) return 'NotFound';
            else return [ans.made,ans.fail];            
        }
    }
}

export async function setScore(area, made, fail) {
    area=Number(area);
    if(isNaN(area)) return 'InValid_area';
    else{
        if(area<0||area>10) return 'Invalid_area';
        else {
            const ans = await ScoreModel.findOne({area: area});
            console.log(ans);
            if(!ans) {
                console.log('create new area');
                await ScoreModel.create({area: area, made: made, fail: fail});
                return 'created';
            }
            else{
                if(made==='+1'||made==='-1'){
                    console.log('change made');
                    if(ans.made+Number(made)>=0) ans.made+=Number(made);
                    else return 'under_zero';
                }
                if(fail==='+1'||fail==='-1'){
                    console.log('change fail');
                    if(ans.fail+Number(fail)>=0) ans.fail+=Number(fail);
                    else return 'under_zero';
                }
                console.log(ans);
                await ans.save((err)=>{
                    if(err) throw Error(err);
                })
                return true;
            }
        }
    }
}
