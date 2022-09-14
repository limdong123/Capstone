# Fingerprint Recognition From Raw Photo
Using Fingerprint recognition using CNN  
Data preprocessing(raw photo) for prediction

This project recognizes fingerprints with two pictures taken from smartphone and checks whether they are matched.

## TRAIN
The code train.ipynb is from https://github.com/kairess/fingerprint_recognition

## Data Preprocessing
 - Step1. Cutting image based on the square area
 - Step2. Increase brightness
 - Step3. Convert image to gray
 - Step4. Convert image const
 - Step5. Extract fingerprint by using Gaussian fillter

## Dependencies
- Python
- cv2(opencv)
- numpy
- tensorflow
- keras
- matplotlib
- sklearn
- [imgaug](https://github.com/aleju/imgaug)

## Dataset

Sokoto Coventry Fingerprint Dataset (SOCOFing) https://www.kaggle.com/ruizgara/socofing/home

## How to use

Before running the code you must Check 2 things
1. Using model must be in the "model" folder.
2. Testing image must be in the "test_data" folder.

After finishing checking

The command using python to run this code is as follows:
python main.py <img_name_1> <img_name_2>
