import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function App() {
  const [shape, setShape] = useState('');
  const [dimensions, setDimensions] = useState({});
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let soapRequest = '';
    if (shape === 'square') {
      soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:geo="http://localhost:8000/geometry">
           <soapenv:Header/>
           <soapenv:Body>
              <geo:calculateSquareArea>
                 <geo:side>${dimensions.side}</geo:side>
              </geo:calculateSquareArea>
           </soapenv:Body>
        </soapenv:Envelope>
      `;
    } else if (shape === 'rectangle') {
      soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:geo="http://localhost:8000/geometry">
           <soapenv:Header/>
           <soapenv:Body>
              <geo:calculateRectangleArea>
                 <geo:length>${dimensions.length}</geo:length>
                 <geo:width>${dimensions.width}</geo:width>
              </geo:calculateRectangleArea>
           </soapenv:Body>
        </soapenv:Envelope>
      `;
    } else if (shape === 'circle') {
      soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:geo="http://localhost:8000/geometry">
           <soapenv:Header/>
           <soapenv:Body>
              <geo:calculateCircleArea>
                 <geo:radius>${dimensions.radius}</geo:radius>
              </geo:calculateCircleArea>
           </soapenv:Body>
        </soapenv:Envelope>
      `;
    }

    try {
      const response = await axios.post('http://localhost:8000/geometry', soapRequest, {
        headers: { 'Content-Type': 'text/xml' },
      });

      // Parse the XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const area = xmlDoc.getElementsByTagName('area')[0].textContent;
      setResult(`The area is: ${area}`);
    } catch (error) {
      console.error(error);
      setResult('An error occurred while calculating the area.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Geometry Area Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            select
            label="Select Shape"
            fullWidth
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            <option value="square">Square</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </TextField>
        </Box>
        {shape === 'square' && (
          <Box mb={2}>
            <TextField
              label="Side"
              fullWidth
              type="number"
              onChange={(e) => setDimensions({ ...dimensions, side: e.target.value })}
            />
          </Box>
        )}
        {shape === 'rectangle' && (
          <>
            <Box mb={2}>
              <TextField
                label="Length"
                fullWidth
                type="number"
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Width"
                fullWidth
                type="number"
                onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
              />
            </Box>
          </>
        )}
        {shape === 'circle' && (
          <Box mb={2}>
            <TextField
              label="Radius"
              fullWidth
              type="number"
              onChange={(e) => setDimensions({ ...dimensions, radius: e.target.value })}
            />
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Calculate Area
        </Button>
      </form>
      {result && (
        <Typography variant="h6" mt={2}>
          {result}
        </Typography>
      )}
    </Container>
  );
}

export default App;