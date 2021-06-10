import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print("joined path: " + str(os.path.join(BASE_DIR, 'frontend', 'static')))