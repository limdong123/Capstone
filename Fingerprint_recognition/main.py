import cv2
import numpy as np
import sys, os, glob
import warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
warnings.filterwarnings(action='ignore')
import tensorflow as tf
keras = tf.keras
from keras.models import load_model
import time

def preprocessing(img_name):
    img1 = cv2.imread('test_data/'+img_name)
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
    kernel = np.array([[0, -1, 0],
                   [-1, 5, -1],
                   [0, -1, 0]])
    img1 = cv2.filter2D(img1, -1, kernel)

    img1 = img1[1800:2300, 1300:1800]
    img1 = cv2.rotate(img1, cv2.ROTATE_90_COUNTERCLOCKWISE)
    #img1 = cv2.rotate(img1, cv2.ROTATE_90_CLOCKWISE)
    img1 = img1[250:450, 100:300]

    return img1

def increase_brightness(img, value): 
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV) 
    h, s, v = cv2.split(hsv) 
    
    lim = 255 - value 
    v[v > lim] = 255 
    v[v <= lim] += value 

    final_hsv = cv2.merge((h, s, v)) 
    img = cv2.cvtColor(final_hsv, cv2.COLOR_HSV2BGR) 
    
    return img

def cvt_gray(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    return img

def cvt_const(img):
    clashe = cv2.createCLAHE(clipLimit=2.0, titleGridSize = (8,8))
    img2 = clashe.apply(img)

    img = cv2.resize(img, (400, 400))
    img2 = cv2.resize(img2,(400, 400))

    #dst = np.hstack((img, img2))

    return img2

def img_fillter(img):
    block_size = 17
    C = 2
    th3 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, block_size, C)

    return th3

def cutting(img, x,xx,y,yy):
    img = img[x:xx, y:yy]
    return img

def pred(img1, img2):
    res = ''
    input_data = []
    input_data.append(img1)
    input_data.append(img2)
    input_data = np.array(input_data)

    model_list = glob.glob('model/*.h5')
    model_name = model_list[-1] 

    best_model = load_model(model_name)

    pred_rx = best_model.predict((input_data[0],input_data[1]), verbose=0)

    if pred_rx >= 0.5:
        res = 'matched'
    elif pred_rx < 0.5:
        res = 'unmatched'
    else: res = 'error'

    return res
        

def main():
    start_time = time.time()
    image_names = sys.argv[1] # 처리전 raw사진
    img = preprocessing(image_names)

    alpha = -0.2
    dst = np.clip((1+alpha) * img - 128 * alpha, 0, 255).astype(np.uint8)

    img = increase_brightness(dst, 25)
    img = cvt_gray(img)
    img = img_fillter(img)

    input_img1 = cv2.resize(img, (90,90)).reshape((1, 90, 90, 1)).astype(np.float32) / 255

    image_names2  = sys.argv[2] # 처리된 사진
    img2 = preprocessing(image_names2)

    alpha = -0.2
    dst = np.clip((1+alpha) * img2 - 128 * alpha, 0, 255).astype(np.uint8)

    img2 = increase_brightness(dst, 25)
    img2 = cvt_gray(img2)
    img2 = img_fillter(img2)
    input_img2 = cv2.resize(img2, (90, 90)).reshape((1, 90, 90, 1)).astype(np.float32) / 255

    res = pred(input_img1, input_img2)

    print(res, end='')
    sys.stdout.flush()
    print('Working time : {}'.format(time.time() - start_time))


if __name__ == "__main__":
	try:
		main()
	except:
		raise

    