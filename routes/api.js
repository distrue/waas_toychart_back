import express from 'express';
import {getScore, setScore} from '../controller/score';

const Router = express.Router();

Router.get('/score/:area', (req, res) => {
    const area = req.params.area;
    const get = async (area) => {
        const score = await getScore(area);
        if(typeof score[0] === 'number') {
            return res.status(200).json({score: score});
        }
        else {
            return res.status(400).json({success: false, reason: score});
        }
    }
    //if(req.params) 
    try {
        get(area)
    } catch(err) {
        res.status(500).json({success: false, reason: err});
    }
});

Router.put('/score/:area', (req, res) => {
    const area = req.params.area;
    const body = req.body;
    const set = async (area, made, fail) => {
        const ask = await setScore(area, made, fail);
        if(ask === true) {
            return res.status(200).json({success: true});
        }
        else {
            return res.status(400).json({success: false, reason: ask});
        }
    }
    try {
        set(area, body.made, body.fail);
    } catch(err) {
        return res.status(500).json({success: false, reason: err});
    }
});

module.exports = Router;