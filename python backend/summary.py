import openai
from openai import OpenAI

from request import TextRequest

api_key = ""

client = OpenAI(
    api_key=api_key
)

default_message = [
    {"role": "system",
     "content": "Summarize this text for students, keep it short and to the point. i want you to reduce the"
                    "words by 80%,give the summarized as paragraph first then under the summarized text put heading called Key Points and give 3 to 6 important key points from the text in points form  "},
    ]

def chat(text, question):
    messages = [
        {"role": "system",
         "content": "act like a student helper system and answer the question from given text.keep the answer short and limit to 100 words. given text is "+ text}
    ]
    return summarize(question, messages)

def summarize(text, messages=None):
    if messages is None:
        messages = default_message
    if text:
        messages.append({"role": "user", "content": text})
        chat = client.chat.completions.create(
            model="gpt-3.5-turbo", messages=messages
        )
        reply = chat.choices[0].message.content
        print(reply)
        return TextRequest(text=reply)
