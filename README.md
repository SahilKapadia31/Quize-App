**Quiz Application**

**Overview**

This repository contains the frontend and backend code for an online quiz application. Users can select quizzes from a list, answer questions, and receive their scores.

**Features**

* **Quiz Management:**
    * Quizzes are stored in a MongoDB database.
    * Each quiz has a title, description, and an array of questions.
    * Each question has a text, answer choices, and a correct answer.
* **Quiz Taking:**
    * Users can select quizzes from a list.
    * Questions are dynamically loaded from the backend.
    * Users can submit their answers.
* **Score Calculation:**
    * User scores are calculated on the backend and returned to the frontend.
* **Error Handling:**
    * Error handling is implemented for invalid quiz submissions and user answers.

**API Reference**

Refer to REST API best practices for designing simple yet effective endpoints.

**Full-Stack Integration**

* **Frontend-Backend Communication:**
    * Axios is used to fetch quizzes and submit user responses.
* **Dynamic Quiz Loading:**
    * When a user selects a quiz, the questions are loaded from the backend.
* **Score Calculation:**
    * User scores are calculated on the backend and returned to the frontend.

**Deployment**

* **Frontend:** Deployed to Vercel.
* **Backend:** Deployed to Heroku.

**Live URLs**

* **Frontend:** [Frontend URL]
* **Backend:** [Backend URL]

**Running Locally**

**Backend:**

1. Clone the repository: `git clone [Repository URL]`
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

**Frontend:**

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

**Contributing**

Feel free to contribute to this project by submitting pull requests or opening issues on GitHub.

**License**

This project is licensed under the MIT License.
