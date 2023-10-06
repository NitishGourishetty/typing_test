import { response } from "express";
import TextModel from "../models/textModel.js";
import textModel from "../models/textModel.js";

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

export const addText = (req, res) => {
    const body = req.body;
    const newPost = new TextModel(message);
        
    } catch (error) {
        
    }
}