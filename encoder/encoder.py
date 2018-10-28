import ast
import csv
import tensorflow as tf
import tensorflow_hub as hub
import pandas as pd
import numpy as np
from flask import Flask
from flask import request
import time

# Import the Universal Sentence Encoder's TF Hub module
app = Flask(__name__)

DATA = pd.read_csv('./preproc.csv')

# def preprocess(messages):
#     with tf.Session() as session:
#         session.run([tf.global_variables_initializer(), tf.tables_initializer()])
#         message_embeddings = session.run(embed(messages))
#         save_encoding(messages, message_embeddings)

# dataset had resumes as "b''" (bytes log in a str)
# def parse_bytes(field): 
#     """ Convert string represented in Python byte-string literal syntax into a
#     decoded character string. Other field types returned unchanged.
#     """

#     result = field
#     try:
#         result = ast.literal_eval(field)
#     finally:
#         return result.decode()

# def save_encoding(messages, embedding):
#     with open('preproc.csv', 'a') as csvfile:
#         writer = csv.writer(csvfile)
#         for i in range(len(messages)):
#             writer.writerow([messages[i], message_embeddings])

def diff(in_encoding, encoding):
    return np.inner(in_encoding, encoding)

@app.route("/")
def send_reqs():
    message = request.args.get('message', type = str)
    embed = hub.Module("./use")
    input_encoding = None
    with tf.Session() as session:
        session.run([tf.global_variables_initializer(), tf.tables_initializer()])
        input_encoding = session.run(embed([message]))
        
    cv_encodings = DATA[DATA.columns[1]]
    
    diffs = []

    for index in range(len(cv_encodings)):
        diffs.append(index, diff(input_encoding, cv_encodings[index]))

    sorted_by_corr = sorted(diffs, key=lambda tup: tup[1])
    return sorted_by_corr
    
