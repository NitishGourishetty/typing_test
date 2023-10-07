import { response } from "express";
import WPMModel from "../models/wpmModel.js";


export const getWPMs = async(req, res) => {
    try {
        const allWPMs = await WPMModel.find(); //await because async
        console.log(allWPMs);
        res.status(200).json(allWPMs); //if everything worked
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

//this is here for future purposes in case I wanted to add a feature to add their own prompts
export const addWPMs = (req, res) => {
    const newWPM = new WPMModel({
        //will add other ones later if necessary
        wpm: req.body.wpm,
        accuracy: req.body.accuracy
    });

    try {
        newWPM.save();
       res.status(201).json(newWPM)
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}