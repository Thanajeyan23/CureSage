const express = require("express");
const axios = require('axios');
const prompt = require("prompt-sync");
const app = express();
const port = 8080;
const apiKey = "GU1d1zMI4jNHpQt00jv01P3Fr7BRcPmG";
const externalUserId = 'webathon';

app.use(express.urlencoded({ extended: true }));
let queryResponse = "nothing";

// Function to create a chat session
async function createChatSession() {
    try {
        const response = await axios.post(
            'https://api.on-demand.io/chat/v1/sessions',
            {
                pluginIds: ['plugin-1726230106',
          'plugin-1717416016',
          'plugin-1717426672',
          'plugin-1717464304',
          'plugin-1713962163',
          'plugin-1712327325',
        ],
                externalUserId: externalUserId
            },
            {
                headers: {
                    apikey: apiKey
                }
            }
        );
        return response.data.data.id; // Extract session ID
    } catch (error) {
        console.error('Error creating chat session:', error);
        throw error;
    }
}

// Function to submit a query
async function submitQuery(sessionId, userQuery) {
    try {
        const response = await axios.post(
            `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
            {
                endpointId: 'predefined-openai-gpt4o',
                query: userQuery, // Use the user's query
                pluginIds: ['plugin-1726230106',
          'plugin-1717416016',
          'plugin-1717426672',
          'plugin-1717464304',
          'plugin-1713962163',
          'plugin-1712327325'
        ],
                responseMode: 'sync'
            },
            {
                headers: {
                    apikey: apiKey
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error submitting query:', error);
        throw error;
    }
}

// Function to handle console input and API response
async function handleConsoleQuery() {
    const prompt = require('prompt-sync')();
    const userQuery = prompt("Enter your query: ");

    if (!userQuery) {
        console.log("Query cannot be empty!");
        return;
    }

    try {
        const sessionId = await createChatSession();
        queryResponse = await submitQuery(sessionId, userQuery);
        console.log('Query Response:', queryResponse.response || queryResponse);
    } catch (error) {
        console.error('Error in querying:', error);
    }
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    handleConsoleQuery(); // Trigger console-based query input
});

console.log(queryResponse);