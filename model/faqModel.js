import mongoose from 'mongoose';

const faqSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    translations: {
        question_hi: { type: String },
        answer_hi: { type: String },
        question_bn: { type: String },
        answer_bn: { type: String },
    }
});

faqSchema.methods.getTranslatedText = function (lang) {
    const questionField = `question_${lang}`;
    const answerField = `answer_${lang}`;
    
    return {
      question: this.translations[questionField] || this.question,  // Access translations object
      answer: this.translations[answerField] || this.answer,        // Access translations object
    };
};

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;
