import { response } from "express";
import TextModel from "../models/textModel.js";

//allows for more readable code if I need to expand in the future
export const getTexts = async(req, res) => {
    try {
        const allText = await TextModel.find(); //await because async
        console.log(allText);
        res.status(200).json(allText); //if everything worked
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

//this is here for future purposes in case I wanted to add a feature to add their own prompts
export const addText = (req, res) => {
    const newText = new TextModel({
        //will add other ones later if necessary
        text: req.body.text
    });

    try {
        newText.save();
       res.status(201).json(newText)
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}