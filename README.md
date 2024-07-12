# Image Processing System

**Overview**
The Image Processing System is designed to process image data provided via CSV files. The system supports asynchronous processing of images, compressing them by 50% of their original quality. It stores processed image data and associated product information in a database and provides APIs for file upload, status checking, and webhook notifications.

# Start Server#
clone the repo and install nodemodules using `npm install`
for start the server use `npm run dev` or `npm start`

**Features** # 1 Upload API: Accepts a CSV file, validates it, and returns a unique request ID. # 2 Status API: Allows users to check the processing status using the request ID. # 3 Webhook Notifications: Notifies a provided endpoint when image processing is complete. # 4 CSV Generation: Generates a CSV file with input and output image URLs after processing.

**Tech Stack**
Backend: Node.js
Database: MongoDB
Image Processing: Sharp (for image compression)
File Parsing: csv-parser
HTTP Requests: axios
CSV Generation: json2csv

# API Endpoints

**Upload API**
Endpoint: /api/upload
Method: POST
Description: Accepts a CSV file, validates it, and returns a unique request ID.
Request: Multipart form-data with file and optional webhookUrl.
Response: 202 Accepted with requestId.
**Status API**
Endpoint: /api/status/:requestId
Method: GET
Description: Checks the processing status using the request ID.
Response: 200 OK with status and product information.

# Validation Logic

**CSV Validation**
Headers: Ensure the CSV contains S. No., Product Name, and Input Image Urls.
Data Completeness: Ensure every column has a value.
URL Validation: Ensure each image URL is valid.

# Image Processing Logic

**Asynchronous Image Processing**
The processImagesAsync function handles the asynchronous processing of images, compressing them by 50% of their original quality.

**CSV Generation**
The generateCSV function generates a CSV file with input and output image URLs after processing.

**Webhook Logic**
The webhook service handles sending a POST request to a provided endpoint after image processing is complete.


**NOTE : Initially set the 30 sec time delay for completing the process for checking**