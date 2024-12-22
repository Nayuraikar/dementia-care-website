import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename


app = Flask(__name__)


# Folder to save uploaded photos
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Allowed file extensions for photo uploads
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}


# List to store diary entries (you can replace this with a database if needed)
diary_entries = []


# Function to check file extension
def allowed_file(filename):
   return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Route to display the home page
@app.route('/')
def home():
   return render_template('index.html')


# Route to handle diary entry submission
@app.route('/diary', methods=['GET', 'POST'])
def diary():
   if request.method == 'POST':
       entry = request.form['diary_entry']
       diary_entries.append(entry)  # Save the diary entry (can be saved to a database)
       return redirect(url_for('diary'))
   return render_template('diary.html', entries=diary_entries)


# Route for the location tracking page
@app.route('/location')
def location():
   return render_template('location.html')


@app.route('/reminders')
def reminders():
   return render_template('reminders.html')


# Route to handle photo album (file upload)
@app.route('/photo_album', methods=['GET', 'POST'])
def photo_album():
   if request.method == 'POST':
       if 'file' not in request.files:
           return redirect(request.url)
       file = request.files['file']
       if file and allowed_file(file.filename):
           filename = secure_filename(file.filename)
           file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
           return redirect(url_for('photo_album'))


   # Get the list of photos in the upload folder
   photo_files = os.listdir(app.config['UPLOAD_FOLDER'])
   return render_template('photo_album.html', photos=photo_files)


@app.route('/game1')
def game1():
   return render_template('game1.html')


@app.route('/drag_and_drop')
def drag_and_drop():
   return render_template('drag_and_drop.html')


if __name__ == '__main__':
   app.run(debug=True)


