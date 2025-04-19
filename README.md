
# SOAP Web Service with Express.js and Material-UI

This project implements a SOAP web service for calculating the area of three geometric shapes: square, rectangle, and circle. The backend is built using Express.js and Node.js, while the frontend is developed using React with Material-UI (MUI) for a modern and responsive user interface. This project demonstrates the process of creating, consuming, and testing SOAP services within a full-stack application context.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Dependencies](#dependencies)
3. [How to Run the Project](#how-to-run-the-project)
4. [Testing the SOAP Service](#testing-the-soap-service)
5. [Folder Structure](#folder-structure)


## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **SOAP**: Protocol for structured information exchange.
- **CORS**: Middleware for enabling cross-origin requests.

### Frontend:
- **React.js**: JavaScript library for building user interfaces.
- **Material-UI (MUI)**: React UI framework for styling.
- **Axios**: Promise-based HTTP client.

### Testing Tools:
- **Postman**: For testing SOAP requests.
- **curl**: Command-line tool for sending requests.

## Dependencies

### Backend Dependencies:
Install using `npm`:
```bash
npm install express soap body-parser cors
```
- **express**: Core server framework.
- **soap**: Library for creating and consuming SOAP services.
- **body-parser**: Middleware for parsing request bodies.
- **cors**: Manages Cross-Origin Resource Sharing.

### Frontend Dependencies:
Navigate to the `frontend` directory and install using `npm`:
```bash
cd frontend
npm install @mui/material @emotion/react @emotion/styled axios
```
- **@mui/material, @emotion/react, @emotion/styled**: Required for Material-UI styling.
- **axios**: Used for making HTTP requests.

## How to Run the Project

Follow these steps to set up and run the project locally:

### Step 1: Clone the Repository
Clone the project source code:
```bash
git clone <repository-url>
cd <project-directory>
```

### Step 2: Install Dependencies
Install backend dependencies:
```bash
npm install
```

Navigate to the frontend directory and install frontend dependencies:
```bash
cd frontend
npm install
```

### Step 3: Start the Backend Server
From the main project directory, run the backend server:
```bash
node server.js
```
The backend service will start on `http://localhost:8000`.

### Step 4: Start the Frontend Development Server
In a separate terminal, navigate to the `frontend` directory and start the development server:
```bash
npm start
```
The frontend application will typically be accessible at `http://localhost:3000`.

### Step 5: Access the Application
Open your web browser and navigate to `http://localhost:3000` to interact with the application.

## Testing the SOAP Service

The SOAP service can be tested directly using tools like Postman or `curl`.

### Using Postman:
1. Create a new POST request targeting `http://localhost:8000/geometry`.
2. Set the `Content-Type` header to `text/xml;charset=UTF-8`.
3. Set the `SOAPAction` header to `http://localhost:8000/geometry/<operation-name>` (replace `<operation-name>` with `calculateSquareArea`, `calculateRectangleArea`, or `calculateCircleArea`).
4. In the request body, select `raw` and `XML`, then paste the appropriate SOAP request XML (see `curl` examples below).
5. Send the request to view the SOAP response.

### Using curl (Examples):

#### Square Area:
```bash
curl -X POST http://localhost:8000/geometry \
     -H "Content-Type: text/xml;charset=UTF-8" \
     -H "SOAPAction: http://localhost:8000/geometry/calculateSquareArea" \
     -d '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:geo="http://localhost:8000/geometry">
            <soapenv:Header/>
            <soapenv:Body>
               <geo:calculateSquareArea>
                  <geo:side>5</geo:side>
               </geo:calculateSquareArea>
            </soapenv:Body>
         </soapenv:Envelope>'
```

#### Rectangle Area:
```bash
curl -X POST http://localhost:8000/geometry \
     -H "Content-Type: text/xml;charset=UTF-8" \
     -H "SOAPAction: http://localhost:8000/geometry/calculateRectangleArea" \
     -d '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:geo="http://localhost:8000/geometry">
            <soapenv:Header/>
            <soapenv:Body>
               <geo:calculateRectangleArea>
                  <geo:length>6</geo:length>
                  <geo:width>4</geo:width>
               </geo:calculateRectangleArea>
            </soapenv:Body>
         </soapenv:Envelope>'
```

#### Circle Area:
```bash
curl -X POST http://localhost:8000/geometry \
     -H "Content-Type: text/xml;charset=UTF-8" \
     -H "SOAPAction: http://localhost:8000/geometry/calculateCircleArea" \
     -d '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:geo="http://localhost:8000/geometry">
            <soapenv:Header/>
            <soapenv:Body>
               <geo:calculateCircleArea>
                  <geo:radius>3</geo:radius>
               </geo:calculateCircleArea>
            </soapenv:Body>
         </soapenv:Envelope>'
```

## Folder Structure

The project is organized as follows:
```
soap-service/
├── geometry.wsdl          # WSDL file defining the SOAP service
├── server.js              # Backend server implementation
├── package.json           # Backend dependencies
├── frontend/              # Frontend application directory
│   ├── src/               # Source code for the React app
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # Entry point for the React app
│   ├── package.json       # Frontend dependencies
```