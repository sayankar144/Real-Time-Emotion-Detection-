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
https://github.com/Sharmi007/Real_Time_Parking_Slot_Detection_using_Computer_Vision.git
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
pip install -r requirements.txt
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
 ⚠️ Dataset Download
> 📂 **Dataset Source (Google Drive)**  
> The dataset required for this project (parking video and mask image) is hosted on Google Drive.
🔗 **Download Link:**  
https://drive.google.com/drive/folders/1lfOwVNvOLFn0IUQ2EQw2FE-9GCfwWI4l
### 🔹 Step 5: Download the Image classification Model:
> Model required for this project is hosted on google drive and place the files inside the project directory.
🔗 **Download Link:**  
[https://drive.google.com/drive/folders/1lfOwVNvOLFn0IUQ2EQw2FE-9GCfwWI4l](https://drive.google.com/drive/folders/1IoBflzIE79gRGLLwfgvJgoYzhn1GF4n-)
### 🔹 Step 6: Run the Project:
```bash
python main.py
```
### 🔹 Step 7: View Output:
- A video window will open displaying:
  - Parking slots marked with bounding boxes
  - 🟩 Green → Vacant slots
  - 🟥 Red → Occupied slots
- Live counts of total, vacant, and occupied slots are shown on the video.
- Press q to stop execution and close the window.
---
## 🧠 Project Explanation (How It Works)
This project uses classical computer vision and mathematical concepts to efficiently solve a real-world parking problem.
### 1️⃣ Fixed Camera Assumption:
The system assumes:
- The camera is static
- Parking slot positions do not change
This allows slot locations to be computed once, improving efficiency.
### 2️⃣ Binary Mask Image
A binary mask image is created where:
- White (255) → Parking slots
- Black (0) → Background
The mask permanently defines the regions to be analyzed.
### 3️⃣ Connected Components Analysis
OpenCV’s connectedComponentsWithStats() is applied to the mask.
This:
- Identifies each connected white region
- Treats each region as one parking slot
- Extracts bounding box coordinates for slot-level processing
### 4️⃣ Frame Skipping Optimization
Slot classification is performed every N frames instead of every frame.
```bash
if frame_number % step == 0:
```
---
## 🏙️ Applications

- Smart parking systems
- Smart city infrastructure
- Traffic management
- CCTV-based parking monitoring
---
## 🔮 Future Improvements
- Improved robustness to shadows and lighting
- Web-based dashboard integration
- Multi-camera support

👤 Author
Sharmistha Hui
Computer Vision | Python | OpenCV
GitHub: https://github.com/Sharmi007
