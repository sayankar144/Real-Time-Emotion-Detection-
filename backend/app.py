from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
from model.predict import predict_emotion

app = Flask(__name__)
CORS(app)  # allow frontend (React) to connect

@app.route('/')
def home():
    return "✅ Real-Time Emotion Detection API Running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image data from POST request (Base64 encoded)
        data = request.get_json()
        image_data = data.get('image')

        # Decode Base64 to OpenCV image
        img_bytes = base64.b64decode(image_data.split(',')[1])
        np_arr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Predict emotion
        emotion, confidence = predict_emotion(frame)

        # Return result as JSON
        return jsonify({
            'emotion': emotion,
            'confidence': round(confidence * 100, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)
