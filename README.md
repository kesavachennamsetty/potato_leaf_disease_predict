# Data Source: Kaggle Potato leaf Disease
# Potato Leaf Disease Predictor 🌿🔍
The Potato Leaf Disease Predictor is a machine learning-based web application designed to classify potato leaves into three categories: Healthy, Early Blight, and Late Blight. Built using PyTorch and CNN (Convolutional Neural Networks), the model analyzes leaf images to detect potential diseases with high accuracy.


## Technologies Used in the Potato Leaf Disease Predictor 🌿💻
**Programming Language:** 
- ***Python*** – The core language used for model development, API creation, and data processing.

**Machine Learning & Deep Learning:**
- ***PyTorch*** – For building and training the CNN model.
- ***Convolutional Neural Networks (CNN)*** – For image classification.
**Web Development & Deployment:**
- ***FastAPI*** – To create the backend API for serving predictions.
- ***JavaScript, HTML, and CSS – For the frontend UI***.

**Data Processing & Model Training:** 
- ***OpenCV & PIL (Pillow)*** – For image preprocessing.
- ***NumPy & Pandas*** – For data handling and transformation.
- ***Matplotlib & Seaborn*** – For visualizing training performance.

- **🚀 Deploy FastAPI App on Localhost**
 
***Follow these steps to set up and run your FastAPI application locally.***

Create a Virtual Environment
Create and activate a virtual environment using the env.yaml file:

- ***conda env create -f env.yaml***
- ***conda activate your_env_name***
(Replace your_env_name with the actual environment name from env.yaml.)
- ***pip install uvicorn***

Run the FastAPI Server
Start the FastAPI app using the following command:
- ***python -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload***

**🌍 Access the Application**
- Frontend UI: http://127.0.0.1:8000/
- API Docs (Swagger UI): http://127.0.0.1:8000/docs
- ReDoc API Docs: http://127.0.0.1:8000/redoc


