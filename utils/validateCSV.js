// utils/validateCSV.js
const csv = require('csv-parser')
const fs = require('fs')
const { URL } = require('url')

const validateCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = []
    let headersValidated = false

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Validate headers
        if (!headersValidated) {
          const headers = Object.keys(data)
          const expectedHeaders = ['S. No.', 'Product Name', 'Input Image Urls']
          if (
            headers.length !== expectedHeaders.length ||
            !expectedHeaders.every((header, index) => header === headers[index])
          ) {
            reject(
              new Error(
                'CSV headers are incorrect. Expected headers: ' +
                  expectedHeaders.join(', '),
              ),
            )
            return
          }
          headersValidated = true
        }

        // Validate each row
        if (
          !data['S. No.'] ||
          !data['Product Name'] ||
          !data['Input Image Urls']
        ) {
          reject(
            new Error(
              'CSV data is incomplete. Each row must have a Serial Number, Product Name, and Input Image Urls.',
            ),
          )
          return
        }

        // Validate image URLs
        const urls = data?.['Input Image Urls']
          .split(',')
          .map((url) => url.trim())
        for (const url of urls) {
          try {
            new URL(url)
          } catch (_) {
            reject(new Error(`Invalid URL found in Input Image Urls: ${url}`))
            return
          }
        }

        results.push({
          serialNumber: parseInt(data['S. No.'], 10),
          productName: data['Product Name'],
          inputImageUrls: urls,
        })
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error))
  })
}

module.exports = validateCSV
