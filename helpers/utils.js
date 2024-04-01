const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  write data to the JSON file given a destination and some content
 *  @param {string} destination write file.
 *  @param {object} content content you write to the file.
 *  @returns {void} 
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  read data from a given a file and append some content
 *  @param {object} content The content that appends to the file.
 *  @param {string} file file save path.
 *  @returns {void} 
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
