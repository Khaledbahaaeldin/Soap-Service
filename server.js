const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));
app.use(cors());

// Define the SOAP service
const service = {
  GeometryService: {
    GeometryServicePort: {
      calculateSquareArea: (args) => {
        const side = parseFloat(args.side);
        return { area: side * side };
      },
      calculateRectangleArea: (args) => {
        const length = parseFloat(args.length);
        const width = parseFloat(args.width);
        return { area: length * width };
      },
      calculateCircleArea: (args) => {
        const radius = parseFloat(args.radius);
        return { area: Math.PI * radius * radius };
      }
    }
  }
};

// Load the WSDL file
const wsdlPath = path.join(__dirname, 'geometry.wsdl');
const wsdlContent = fs.readFileSync(wsdlPath, 'utf8');

// Start the SOAP server
const port = 8000;
app.listen(port, () => {
  console.log(`SOAP Server running at http://localhost:${port}/geometry , finally , an 11 year old technology is being used to solve a problem that could be solved with a simple REST API`);
  soap.listen(app, '/geometry', service, wsdlContent);
});