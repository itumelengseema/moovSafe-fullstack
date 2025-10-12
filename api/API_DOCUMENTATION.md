# 📚 MoovSafe API Documentation

This document describes how to use the automatically generated Swagger/OpenAPI documentation for the MoovSafe API.

## 🚀 Quick Start

### Start the API Server
```bash
cd api
pnpm install
pnpm run dev
```

### Access Documentation
- **Swagger UI**: http://localhost:3000/api-docs
- **API Homepage**: http://localhost:3000

## 🔍 API Overview

The MoovSafe API provides comprehensive endpoints for vehicle fleet management and inspection system:

### 🚗 **Vehicles** (`/api/vehicles`)
- `GET /` - List all vehicles
- `GET /{id}` - Get vehicle by ID
- `GET /license/{licensePlate}` - Get vehicle by license plate
- `POST /` - Create new vehicle
- `PUT /{id}` - Update vehicle
- `DELETE /{id}` - Delete vehicle

### 🔍 **Inspections** (`/api/inspections`)
- `GET /` - List all inspections
- `GET /date` - Get inspections by date range
- `GET /{id}` - Get inspection by ID
- `POST /` - Create new inspection (with file uploads)
- `DELETE /{id}` - Delete inspection

### 🔧 **Maintenance** (`/api/maintenance`)
- `GET /` - List all maintenance records
- `GET /vehicle/{licensePlate}` - Get maintenance by vehicle
- `GET /{id}` - Get maintenance record by ID
- `POST /` - Create maintenance record (with file uploads)
- `PUT /{id}` - Update maintenance record
- `DELETE /{id}` - Delete maintenance record

## 📝 Interactive Documentation Features

The Swagger UI provides:

### ✅ **Try It Out**
- Test endpoints directly from the documentation
- See real request/response examples
- Upload files for inspection and maintenance endpoints

### 📊 **Schema Validation**
- Complete request/response schemas
- Field descriptions and constraints
- Enum values for standardized fields

### 🔒 **Error Handling**
- Standard HTTP status codes
- Detailed error response schemas
- Common error scenarios documented

## 🛠️ Development Features

### **Auto-Generated from Code**
The documentation is automatically generated from:
- TypeScript interfaces and schemas
- Route definitions and middleware
- JSDoc comments in route files

### **Always Up-to-Date**
- Documentation updates automatically with code changes
- No manual documentation maintenance required
- Synchronized with actual API behavior

## 📚 Using the Documentation

### **1. Explore Endpoints**
- Browse all available endpoints by category
- View detailed parameter and response information
- See example requests and responses

### **2. Test API Calls**
- Use "Try it out" button on any endpoint
- Fill in parameters and request body
- Execute requests and see live responses

### **3. Understand Data Models**
- View complete schemas for Vehicle, Inspection, and Maintenance
- See all available fields and their types
- Understand required vs optional fields

## 🔧 Technical Details

### **File Upload Support**
Endpoints that support file uploads (inspections and maintenance):
- `multipart/form-data` content type
- Multiple file fields (images, invoices, photos)
- Maximum file limits documented

### **Query Parameters**
Advanced filtering options:
- Date ranges for inspections
- Vehicle-specific filtering
- Pagination with limit/offset
- Maintenance type filtering

### **Response Format**
All endpoints return consistent JSON responses:
- Success responses with data
- Error responses with detailed messages
- Standard HTTP status codes

## 🎯 Example Usage

### Create a Vehicle
```json
POST /api/vehicles
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2022,
  "vin": "1HGBH41JXMN109186",
  "engineNumber": "ENG123456789",
  "licensePlate": "ABC123GP",
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "currentMileage": 45000,
  "colour": "White",
  "vehicleType": "Car"
}
```

### Create an Inspection
```bash
POST /api/inspections
Content-Type: multipart/form-data

vehicleId: 123e4567-e89b-12d3-a456-426614174000
mileage: 45000
overallCondition: Good
exteriorWindshield: Good
notes: Vehicle is in excellent condition
faultsImages: [file1.jpg, file2.jpg]
odometerImage: odometer.jpg
```

## 🚀 Production Ready

The API documentation includes:
- Complete OpenAPI 3.0 specification
- Production and development server configurations
- Comprehensive error handling
- File upload capabilities
- Query parameter validation

Visit http://localhost:3000/api-docs to start exploring the interactive documentation!
