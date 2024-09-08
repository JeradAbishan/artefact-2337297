from fastapi import FastAPI, File, UploadFile
from request import TextRequest, ChatRequest
from summary import summarize, chat
import fitz  # PyMuPDF for extracting text from PDFs
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/chat/text")
async def chat_text(req: ChatRequest) -> TextRequest:
    return chat(req.originalText, req.question)

@app.post("/summary/text")
async def summarize_text(request: TextRequest) -> TextRequest:
    return summarize(request.text)

# Endpoint to handle PDF uploads and extract text (no summarization)
@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Read the PDF file bytes
        pdf_bytes = await file.read()
        pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
        extracted_text = ""

        # Extract text from each page
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            extracted_text += page.get_text()

        # Check if any text was extracted
        if not extracted_text:
            return JSONResponse(status_code=400, content={"message": "No text found in the PDF"})

        # Return the extracted text (no summarization)
        return {"extracted_text": extracted_text}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

