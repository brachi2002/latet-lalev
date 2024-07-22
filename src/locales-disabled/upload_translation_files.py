import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def upload_json_to_firestore(json_file_path, document_id):
    # Initialize Firestore if not already initialized
    if not firebase_admin._apps:
        cred = credentials.Certificate('firebase.json')
        firebase_admin.initialize_app(cred)
    db = firestore.client()

    # Read JSON file
    with open(json_file_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)

    # Upload data to Firestore
    doc_ref = db.collection('lang').document(document_id)
    doc_ref.set(data)
    print(f'Successfully uploaded {json_file_path} to Firestore collection "lang" with document ID {document_id}')

def process_directories(base_path):
    # Iterate over each directory in the base path
    for dir_name in os.listdir(base_path):
        dir_path = os.path.join(base_path, dir_name)
        if os.path.isdir(dir_path):
            json_file_path = os.path.join(dir_path, 'translation.json')
            if os.path.exists(json_file_path):
                upload_json_to_firestore(json_file_path, dir_name)
            else:
                print(f'No translation.json file found in {dir_path}, skipping...')

if __name__ == '__main__':
    base_path = '.'  # Replace with the path to your base directory
    process_directories(base_path)
