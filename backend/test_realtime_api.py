import cv2
import base64
import requests
import numpy as np

# URL of your Flask backend
URL = "http://127.0.0.1:5000/predict"

# Start webcam
cap = cv2.VideoCapture(0)

print("🎥 Starting real-time emotion detection... (Press 'q' to quit)")

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Failed to capture frame")
        break

    # Encode frame to JPEG
    _, buffer = cv2.imencode('.jpg', frame)

    # Convert to Base64
    b64_string = base64.b64encode(buffer).decode('utf-8')
    image_data = "data:image/jpeg;base64," + b64_string

    try:
        # Send frame to backend
        response = requests.post(URL, json={'image': image_data})
        if response.status_code == 200:
            data = response.json()
            emotion = data.get('emotion', 'Unknown')
            confidence = data.get('confidence', 0)
            label = f"{emotion} ({confidence:.1f}%)"
        else:
            label = "Error"

    except Exception as e:
        label = f"Error: {str(e)}"

    # Display emotion on frame
    cv2.putText(frame, label, (20, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Real-Time Emotion Detection (Flask)", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
