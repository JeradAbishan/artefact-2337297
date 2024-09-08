from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import openai

# Initialize FastAPI app
app = FastAPI()

# Set OpenAI API key
api_key = ""
openai.api_key = api_key

# Store user-provided text in a dictionary (can be replaced with a database in production)
user_context = {}

# Default message for summarization
default_message = [
    {"role": "system",
     "content": "Summarize this text for students, keep it short and to the point. I want you to reduce the words by 80%"},
]

# Pydantic model for handling user input
class TextInput(BaseModel):
    user_id: str
    text: str

class QuestionInput(BaseModel):
    user_id: str
    question: str

@app.post("/upload-text/")
async def upload_text(text_input: TextInput):
    """
    Endpoint to receive text input from the user.
    Stores the text for the user in a dictionary.
    """
    user_id = text_input.user_id
    text = text_input.text

    # Store text in user_context for future reference
    user_context[user_id] = text

    # Return a confirmation message
    return {"message": "Text uploaded successfully. You can now ask questions based on this text."}

@app.post("/chat/")
async def chat(question_input: QuestionInput):
    """
    Chat endpoint that takes a user question and provides an answer based on the previously uploaded text.
    """
    user_id = question_input.user_id
    question = question_input.question

    # Retrieve the stored text for the user
    original_text = user_context.get(user_id)

    if not original_text:
        raise HTTPException(status_code=400, detail="No text found for this user. Please upload text first.")

    # Create a prompt that includes the original text and the user's question
    prompt = f"Based on the following text:\n\n{original_text}\n\nAnswer the following question:\n\n{question}"

    # Call OpenAI API to get a response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Act like a student helper system to help on their studies, keep replies short and useful."},
            {"role": "user", "content": prompt}
        ]
    )

    answer = response.choices[0].message['content'].strip()

    return {"answer": answer}

