// services/imageService.js
const axios = require('axios')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const { SERVER_URL } = require('../constant')

const downloadImage = async (url, filePath) => {
  const response = await axios({
    url,
    responseType: 'stream',
  })
  response.data.pipe(fs.createWriteStream(filePath))
  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve(filePath))
    response.data.on('error', reject)
  })
}

const processImage = async (inputUrl) => {
  console.log({ inputUrl })
  const inputFilePath = path.join(__dirname, '../uploads', uuidv4() + '.jpeg')

  const outputFilename = 'output_' + path.basename(inputFilePath)
  const outputFilePath = path.join(__dirname, '../uploads', outputFilename)

  await downloadImage(inputUrl, inputFilePath)
  await sharp(inputFilePath).jpeg({ quality: 50 }).toFile(outputFilePath)

  return `${SERVER_URL}/${outputFilename}`
}

module.exports = { processImage }
