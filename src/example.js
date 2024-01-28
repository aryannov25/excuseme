import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

const MyComponent = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Make sure to prefix environment variables with REACT_APP_ in React projects
      });

      try {
        const result = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              "role": "system",
              "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
            },
            {
              "role": "user",
              "content": "I loved the new Batman movie!"
            }
          ],
          temperature: 0.7,
          max_tokens: 64,
          top_p: 1,
        });

        setResponse(result);
      } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        setResponse(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {response ? (
        <div>
          <h2>Response from OpenAI:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading response...</p>
      )}
    </div>
  );
};

export default MyComponent;
