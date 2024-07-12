# Image Processing System API and Workers Documentation

## API Documentation

### Upload API

**Endpoint:** `/upload`

**Method:** POST

**Description:**
Accepts a CSV file containing image data. Validates the CSV format, saves request details, and initiates asynchronous image processing.

**Request Body:**

- Content-Type: multipart/form-data
- Parameters:
  - `csvFile`: The CSV file containing image data.

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "requestId": "unique_request_id"
  }
  ```

### Status API

**Endpoint:** `/status/{requestId}`

**Method:** GET

**Description:** Checks the processing status of a request using the provided requestId.

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
  "requestId": "unique_request_id",
  "status": "processing" | "completed",
  ...request
  }
  ```
