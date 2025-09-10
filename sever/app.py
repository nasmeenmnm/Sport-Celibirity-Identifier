import os
import face_recognition
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = "dataset"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure dataset directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/register', methods=['POST'])
def register_student():
    name = request.form['name']
    images = request.files.getlist("images")

    person_folder = os.path.join(app.config["UPLOAD_FOLDER"], name)
    if not os.path.exists(person_folder):
        os.makedirs(person_folder)

    for img in images:
        filename = secure_filename(img.filename)
        img.save(os.path.join(person_folder, filename))

    train_model()

    return jsonify({"message": f"Student {name} registered successfully and model updated!"})


def train_model():
    dataset_path = "dataset/"
    known_face_encodings = []
    known_face_names = []

    for person_name in os.listdir(dataset_path):
        person_folder = os.path.join(dataset_path, person_name)
        for image_name in os.listdir(person_folder):
            image_path = os.path.join(person_folder, image_name)
            image = face_recognition.load_image_file(image_path)
            face_encoding = face_recognition.face_encodings(image)

            if face_encoding:
                known_face_encodings.append(face_encoding[0])
                known_face_names.append(person_name)

    # Save updated encodings
    np.save("face_encodings.npy", known_face_encodings)
    np.save("face_names.npy", known_face_names)


if __name__ == '__main__':
    app.run(debug=True)
