import cv2
import numpy as np
import tensorflow as tf
import os

MODEL_PATH = "model/emotion_model.h5"
print("Loading model from:", os.path.abspath(MODEL_PATH))

# Fix: skip loading optimizer arguments
model = tf.keras.models.load_model(MODEL_PATH, compile=False)

EMOTIONS = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

def preprocess_frame(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    face = cv2.resize(gray, (64, 64))
    face = face / 255.0
    face = np.reshape(face, (1, 64, 64, 1))
    return face

def predict_emotion(frame):
    processed = preprocess_frame(frame)
    predictions = model.predict(processed)
    emotion_index = np.argmax(predictions)
    emotion_label = EMOTIONS[emotion_index]
    confidence = float(np.max(predictions))
    return emotion_label, confidence
