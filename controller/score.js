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
            const ans = await ScoreModel.find({area: area});
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
            const ans = await ScoreModel.find({area: area});
            Console.log(ans);
            if(!ans) {
                console.log('create new area');
                await ScoreModel.create({area: area, made: made, fail: fail},(err,score)=>{
                    if(err) throw Error(err);
                });
                console.log(area+'created');
            }
            else{
                if(made==='+1'||made==='-1'){
                    if(ans.made+made>=0) ans.made+=made;
                    else return 'under_zero';
                }
                if(fail==='+1'||fail==='-1'){
                    if(ans.fail+fail>=0) ans.fail+=fail;
                    else return 'under_zero';
                }
                await ans.save((err)=>{
                    if(err) throw Error(err);
                })
            }
            return true;
        }
    }
}
