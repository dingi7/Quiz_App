import * as api from '../api/api';
const endpoints = {
    categories: 'categories',
    questions: 'questions',
};

export const getCategories = async () => {
    return api.get(endpoints.categories);
};

export const createCategory = async tag => {
    return api.post(endpoints.categories, { tag });
};

export const getQuestions = async () => {
    return api.get(endpoints.questions);
};

export const createQuestion = async (
    question,
    answers,
    correctAnswer,
    category
) => {
    return api.post(endpoints.questions, {
        question,
        answers,
        correctAnswer,
        category,
    });
};
