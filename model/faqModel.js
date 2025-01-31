import mongoose from 'mongoose';


const faqSchema = mongoose.Schema({

    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    translations: {
        type: Map,
        of: {
            question: String,
            answer: String
        },
        default: {}
    }

    

});

faqSchema.methods.getTranslatedText = function (lang){
    // dynamically fetch the translated faq

    const translation = this.translations.get(lang);

    if(translation){
        return {
            question: translation.question,
            answer: translation.answer
        };
    }else{
        return {
            question: this.question,
            answer: this.answer
        };
    }
  
}

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;