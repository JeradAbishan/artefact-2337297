from pydantic import BaseModel


class TextRequest(BaseModel):
    text: str

class ChatRequest(BaseModel):
    originalText: str
    question: str