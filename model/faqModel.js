import mongoose from 'mongoose'


const faqSchema = mongoose.Schema({

    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    translations:{
        question_hi: {
            type: String
        },
        answer_hi:{
            type: String
        },

    }

    

});

faqSchema.methods.getTranslatedText = function (lang){
    // dynamically fetch the translated faq

    
    // console.log(`ye wala aaya  ${lang}`)
    return {
        question: this.translations[`question_${lang}`] || this.question,
        answer: this.translations[`answer_${lang}`] || this.answer
    }
}

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;