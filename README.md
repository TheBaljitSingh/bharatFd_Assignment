Here’s an updated `README.md` for your project:

```markdown
# BharatFD Assignment

This is the backend for the BharatFD Assignment. The backend server is built with Express.js, MongoDB, and Redis for caching FAQs.

## Features

- **FAQ Management**: Add, retrieve all FAQs, and retrieve a single FAQ by ID.
- **Translation Support**: Supports multiple languages for FAQ questions and answers (English, Hindi, Bengali).
- **Caching**: FAQ data is cached using Redis to improve performance.
- **Server**: Default server port is `3000`.

## Installation

### 1. Clone the Repository

Clone the repository to your local machine.

```bash
git clone https://github.com/TheBaljitSingh/bharatFd_Assignment.git
cd bharatFd_Assignment
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
MONGO_URI=<your-mongodb-uri>
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
PORT=3000
```

- Replace `<your-mongodb-uri>` with the URI of your MongoDB database.
- Replace `<your-redis-host>` and `<your-redis-port>` with your Redis host and port.
- You can leave the `PORT` variable as `3000` (default).

### 4. Start the Server

Run the following command to start the server:

```bash
npm start
```

The server will be running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. `GET /faq`

Get all FAQs with optional language support.

- **Query Parameters**:
  - `lang` (optional): Language for translation (default is `en`, options: `hi`, `bn`).
  
Example:

```bash
GET http://localhost:3000/faq?lang=hi
```

Response:

```json
{
  "success": true,
  "translatedFaqs": [
    {
      "question": "क्या है?",
      "answer": "यह एक सवाल है।"
    },
    ...
  ]
}
```

### 2. `GET /faq/:faqId`

Get a single FAQ by its ID with optional language support.

- **Route Parameter**:
  - `faqId`: ID of the FAQ.

- **Query Parameters**:
  - `lang` (optional): Language for translation (default is `en`, options: `hi`, `bn`).

Example:

```bash
GET http://localhost:3000/faq/609b2b320f2a1c5f74e3f5c2?lang=hi
```

Response:

```json
{
  "success": true,
  "translatedFaq": {
    "question": "क्या है?",
    "answer": "यह एक सवाल है।"
  }
}
```

### 3. `POST /faq`

Create a new FAQ.

- **Request Body**:
  - `question`: The question for the FAQ (String).
  - `answer`: The answer for the FAQ (String).
  - `translations`: An object containing translations for different languages.
    - `question_hi`, `answer_hi`: Hindi translation.
    - `question_bn`, `answer_bn`: Bengali translation.

Example:

```bash
POST http://localhost:3000/faq
Content-Type: application/json

{
  "question": "What is this?",
  "answer": "This is an FAQ.",
  "translations": {
    "question_hi": "क्या है यह?",
    "answer_hi": "यह एक FAQ है।",
    "question_bn": "এটা কী?",
    "answer_bn": "এটা একটি FAQ।"
  }
}
```

Response:

```json
{
  "success": true,
  "newFaq": {
    "_id": "609b2b320f2a1c5f74e3f5c2",
    "question": "What is this?",
    "answer": "This is an FAQ.",
    "translations": {
      "question_hi": "क्या है यह?",
      "answer_hi": "यह एक FAQ है।",
      "question_bn": "এটা কী?",
      "answer_bn": "এটা একটি FAQ।"
    }
  }
}
```

## Technologies Used

- **Express.js**: For building the server and API endpoints.
- **MongoDB**: For storing FAQs.
- **Redis**: For caching the FAQs to improve performance.
- **dotenv**: For managing environment variables.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### How to Update the `README.md`
1. Replace the placeholder values in the environment variable section (`MONGO_URI`, `REDIS_HOST`, `REDIS_PORT`) with actual values.
2. Ensure that the API section is aligned with the API endpoints in your actual project.

Let me know if you'd like further changes!