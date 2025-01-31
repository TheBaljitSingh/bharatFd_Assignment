import express from 'express';
import Faq from "../model/faqModel.js"

export const getAllFaq = async (req, res)=>{
    console.log('fetching all faqs');
    try {

        const lang = req.query.lang || "en";

        // have to add the redias


        const faqs = await Faq.find();

        const translatedFaqs = faqs.map((faq)=> faq.getTranslatedText(lang));


        res.status(200).json({success: true, translatedFaqs});


        
    } catch (error) {
        console.log(error);

        res.status(500).json({success: false, message: "Server Error"});
        
    }


}

export const createFaq  = async(req, res)=>{

    try {

        const {question, answer, translation} = req.body;

        const newFaq = new Faq({question, answer, translation});

        await newFaq.save();

        res.status(201).json({success: true, newFaq});

        
    } catch (error) {

        console.log(error);

        res.status(500).json({success: false, message: "Server Error"});

        
    }

}
