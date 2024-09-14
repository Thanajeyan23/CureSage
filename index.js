document.getElementById('chat-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const userInput = document.getElementById('input').value;
    if (userInput.trim() === '') return;

    // Append user's message to chat
    appendMessage('You', userInput, 'user');

    // Clear input field
    document.getElementById('input').value = '';

    try {
        // Send user query to server
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userQuery: userInput })
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const botMessage = data.data && data.data.answer ? data.data.answer : 'Sorry, I didn\'t understand that.';

        appendMessage('Bot', botMessage, 'bot');
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Bot', 'Sorry, something went wrong.', 'bot');
    }
});

function appendMessage(sender, message, type) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + type;

    // Create text nodes for message and sender
    const senderText = document.createTextNode(`${sender}: `);
    const messageText = document.createTextNode(message);

    // Append the sender and message to the message div
    messageDiv.appendChild(senderText);
    messageDiv.appendChild(messageText);

    // Append the message div to the messages container
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to bottom
}
