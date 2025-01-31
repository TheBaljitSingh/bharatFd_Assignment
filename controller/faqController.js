import express from 'express';
import Faq from "../model/faqModel.js"

export const getAllFaq = async (req, res)=>{


    console.log(req.query.lang);

    try {

        const lang = req.query.lang || "en";

        // have to add the redias


        const faqs = await Faq.find();

        const translatedFaqs = faqs.map((faq)=> {
            return faq.getTranslatedText(lang); // Convert plain object to Mongoose instance and then retured
        });


        res.status(200).json({success: true, translatedFaqs});


        
    } catch (error) {
        console.log(error);

        res.status(500).json({success: false, message: "Server Error"});
        
    }


}

export const createFaq  = async(req, res)=>{

    try {

        const {question, answer, translations} = req.body;

        console.log(translations);

        const newFaq = new Faq({question, answer, translations});

        await newFaq.save();

        res.status(201).json({success: true, newFaq});

        
    } catch (error) {

        console.log(error);

        res.status(500).json({success: false, message: "Server Error"});

        
    }

}
