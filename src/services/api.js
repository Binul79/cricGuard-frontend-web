import axios from 'axios';

// 1. REPLACE this with your actual Hugging Face Space URL
const API_URL = 'https://your-username-cricGuard.hf.space';

export const analyzeBowling = async (file, modelType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model_type', modelType);

    try {
        // We add the /analyze endpoint to your Space URL
        const response = await axios.post(`${API_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            // Optional: Increase timeout to 60s for large Vision Transformer models
            timeout: 60000
        });

        return response.data;
    } catch (error) {
        console.error("Cloud Analysis Error:", error);

        // If the error is a 404, check if the Space is 'Sleeping' or the URL is wrong
        if (error.response?.status === 404) {
            alert("Backend not found. Please check your Hugging Face Space URL.");
        } else {
            alert("The AI model is waking up or busy. Please try again in a moment.");
        }

        throw error;
    }
};