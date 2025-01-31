import express from 'express';
import Faq from "../model/faqModel.js"
import client from "../config/redis.js";



export const getAllFaq = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const cacheKey = `lan_${lang}`;

        const cachedFaqs = await client.get(cacheKey);
        if (cachedFaqs) {
            console.log('Cache hit');
            return res.status(200).json({
                success: true,
                translatedFaqs: JSON.parse(cachedFaqs),
            });
        } else {
            console.log('Not found in cache');
            const faqs = await Faq.find();

            const translatedFaqs = faqs.map((faq) => faq.getTranslatedText(lang));

            await client.set(cacheKey, JSON.stringify(translatedFaqs), 'EX', 3600);

            res.status(200).json({ success: true, translatedFaqs });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getSingleFaq = async (req, res) => {
    try {
        const { faqId } = req.params;
        const lang = req.query.lang || 'en';
        const cacheKey = `faq_${faqId}_lang_${lang}`;

        const cachedFaq = await client.get(cacheKey);
        if (cachedFaq) {
            console.log('Cache hit');
            return res.status(200).json({
                success: true,
                translatedFaq: JSON.parse(cachedFaq),
            });
        } else {
            console.log('Not found in cache');

            const faq = await Faq.findById(faqId);

            if (!faq) {
                return res.status(404).json({ success: false, message: 'FAQ not found' });
            }

            const translatedFaq = faq.getTranslatedText(lang);

            await client.set(cacheKey, JSON.stringify(translatedFaq), 'EX', 3600);

            res.status(200).json({ success: true, translatedFaq });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createFaq = async (req, res) => {
    try {
        const { question, answer, translations } = req.body;

        const newFaq = new Faq({ question, answer, translations });

        await newFaq.save();

        res.status(201).json({ success: true, newFaq });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
