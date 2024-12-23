from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import datasets,transforms
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
from cnn import ConvolutionalNeuralNetwork 

app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Adjust for specific domains in production
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

@app.get("/")
async def read_root():
    return FileResponse("frontend/index.html")


@app.post("/upload/")
async def process_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return JSONResponse(status_code=400, content={"message": "Uploaded file is not an image."})

    try:
        
        # Read the uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image = image.convert('RGB')


        loaded_CNNmodel = ConvolutionalNeuralNetwork()
        loaded_CNNmodel.load_state_dict(torch.load('model_1.pt'))
        loaded_CNNmodel.eval()  # Set the model to evaluation mode
        print("Model weights loaded successfully!")

        # Load model
        # model_ANN = COnvolutionalNeuralNetwork()  # Ensure class name matches
        # print(model_ANN)
        # print(torch.load('model_1.pth',weights_only=True))
        # Transform the image
        val_transpose = transforms.Compose([
            transforms.Resize(224),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ])
        image = val_transpose(image).unsqueeze(0)  # Add batch dimension
        print(image.shape)
        # Make prediction
        with torch.no_grad():
            predict = loaded_CNNmodel(image)
            print(predict)
            pred_val = torch.argmax(predict, dim=1).item()  # Extract the predicted class index
            print(pred_val)
        # Map prediction to labels
        labels = {
            0: 'Potato___Early_blight',
            1: 'Potato___Late_blight',
            2: 'Potato___healthy',
        }
        print({"label": labels.get(pred_val, "Unknown")})
        return {"label": labels.get(pred_val, "Unknown")}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error processing the image: {str(e)}"})
