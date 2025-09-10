Celebrity Face Identifier
This project is a web application that identifies sports celebrities from images. It uses a machine learning model built with OpenCV to recognize faces, with a Flask backend serving the results to a frontend built with HTML, CSS, and JavaScript.

🧐 How It Works
The system identifies a person by comparing their face to a pre-trained model. Here's how it works:

Data Collection: Images of 10 sports celebrities were collected from Google.

Image Processing: Using OpenCV's Haar cascades, key facial features like eyes and the nose were detected and extracted from the images. This focuses the model on important data points.

Model Training: A machine learning model was trained using the processed facial data of the 10 celebrities.

Backend (Flask): When a user uploads an image, the Flask backend processes it and sends it to the trained model for analysis.

Prediction: The model compares the new image to its trained data and predicts which celebrity it most closely matches.

Frontend: The final result is presented to the user through the web interface.

🚀 Getting Started
To run this project, you need to have a Python environment set up with the necessary libraries. Once you have the code, you can start the application, which will launch a local web server. You can then access the application from your web browser to upload images and see the results.

💡 Key Features
Face Recognition: Identifies sports celebrities from images.

OpenCV & ML: Utilizes computer vision and machine learning for accurate analysis.

Web Application: Provides a user-friendly interface via a web browser.

Full Stack: Combines a Flask backend with an HTML, CSS, and JavaScript frontend
