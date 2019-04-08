const readline = require('readline');
const fs = require('fs');

const getDataObject = (fileName, callback) => {
    const reader = readline.createInterface({
        input: fs.createReadStream(fileName)
    });
    
    // array of headers
    let headers = [];
    
    // array with whole data
    const data = [];
    let lineNumber = 0;
    reader.on('line', line => {
        if (lineNumber == 0) {
            // generate headers from the first line of file
            headers = generatePropertyArray(line);
            lineNumber++;
            return;
        }
        const splittedLine = line.split(',');
        // after that, just populate the data array
        if (splittedLine.length == headers.length) {
            const lineData = {}
            headers.forEach((header, index) => {
                lineData[header] = splittedLine[index];
            });
            data.push(lineData);
        }
        lineNumber++;
    });
    
    reader.on('close', line => {
        callback(data);
    });
}


const generatePropertyArray = headerLine => {
    const headers = headerLine.split(',');
    const headerArray = [];
    headers.forEach(header => {
        headerArray.push(getHeaderName(header));
    });
    return headerArray;
}

const getHeaderName = header  => {
    const splittedHeader = header.split(' ');
    splittedHeader[0] = splittedHeader[0].toLowerCase();
    return splittedHeader.join('').trim();
}

module.exports = getDataObject;