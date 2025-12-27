# 🚗 Real-Time Parking Slot Detection using OpenCV & Python

A real-world **computer vision project** that detects **vacant and occupied parking slots in real time** using **Python and OpenCV**, without relying on any external machine learning or deep learning libraries.  
The system is designed for **fixed-camera parking environments** such as basement parking lots or CCTV-based setups.

---

## 📌 Features

- Real-time parking slot occupancy detection  
- Mask-based fixed parking slot localization  
- Region-wise image processing (slot-level analysis)  
- Live counting of:
  - Total parking slots  
  - Vacant slots  
  - Occupied slots  
- Color-coded visualization:
  - 🟩 Green → Vacant slot  
  - 🟥 Red → Occupied slot  
- Optimized for real-time CPU performance  
- No external ML/DL frameworks used  

---

## 🧰 Tech Stack

- Python  
- OpenCV  
- NumPy  

---

## 📁 Project Structure


---

## ⚙️ How to Run the Project (Local Machine)

### 🔹 Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/parking-slot-detection.git
cd parking-slot-detection
```
### 🔹 Step 2: Create a Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
```
Activate the environment:
Windows:
```bash
venv\Scripts\activate
```
Linux / macOS
```bash
source venv/bin/activate
```
### 🔹 Step 3: Install Required Dependencies:
```bash
pip install opencv-python numpy
```
### 🔹 Step 4: Prepare the Dataset:
Ensure the following files are available:
- Binary mask image defining parking slots
- Parking lot video recorded from a fixed camera
Place the files inside the project directory:
```bash
mask_1920_1080.png
parking_video.mp4
```
