# 🚀 MoovSafe API - Production Deployment Guide

## 📍 Live Production API

**Production URL**: https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io

### 🔗 Live Endpoints

#### **API Documentation**

- **Interactive Swagger UI**: https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api-docs
- **API Homepage**: https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io

#### **Vehicle Management**

```bash
# Get all vehicles
GET https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/vehicles

# Create new vehicle
POST https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/vehicles

# Get vehicle by ID
GET https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/vehicles/{id}

# Get vehicle by license plate
GET https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/vehicles/license/{licensePlate}
```

#### **Vehicle Inspections**

```bash
# Get all inspections
GET https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/inspections

# Create new inspection (with file uploads)
POST https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/inspections

# Get inspections by date range
GET https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/inspections/date?startDate=2024-10-01&endDate=2024-10-31
```

#### **Maintenance History**

```bash
# Get all maintenance records
GET https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/maintenance

# Get maintenance by vehicle license plate
GET https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/maintenance/vehicle/{licensePlate}

# Create maintenance record (with file uploads)
POST https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/maintenance
```

## 🔄 Deployment Instructions

### **Deploy Updated API with Swagger**

1. **Build the API:**

```bash
cd api
pnpm run build
```

2. **Deploy to Genezio:**

```bash
# From the api directory
genezio deploy --stage production
# or
genezio deploy --stage staging
```

3. **Verify Deployment:**

```bash
# Test the API homepage
curl https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/

# Test Swagger documentation
curl https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api-docs
```

## 🧪 Testing Production API

### **Using curl**

```bash
# Health check
curl https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/

# Test vehicles endpoint
curl https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/vehicles

# Test with specific headers
curl -H "Content-Type: application/json" \
     https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/vehicles
```

### **Using Swagger UI**

1. Visit: https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api-docs
2. Select "Production server (Genezio)" from server dropdown
3. Expand any endpoint section
4. Click "Try it out"
5. Fill parameters and execute

### **Using Postman/Insomnia**

Import the OpenAPI spec from:

```
https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api-docs/swagger.json
```

## 🔧 Configuration Details

### **Environment Variables (Production)**

Make sure these are set in your Genezio dashboard:

```env
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=production
```

### **CORS Configuration**

Production API allows all origins (`*`) for development purposes. For production, consider restricting to specific domains:

```typescript
res.header("Access-Control-Allow-Origin", "https://yourmobileapp.com");
```

### **File Upload Limits**

- **Inspection images**: Max 5 files per request
- **Maintenance photos**: Max 5 files per request
- **Maintenance invoices**: Max 5 files per request
- **File size limit**: As configured in Cloudinary/multer settings

## 📊 Production Features

### **✅ What's Working**

- ✅ All REST endpoints deployed
- ✅ Interactive Swagger documentation
- ✅ File upload support (Cloudinary integration)
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling with structured responses
- ✅ Input validation using Zod schemas

### **🔍 Database Status**

Note: If you see database connection errors, ensure:

1. PostgreSQL database is running and accessible
2. Database URL is correctly configured in Genezio environment
3. Database migrations have been applied
4. Network access is allowed from Genezio servers

### **📈 Monitoring**

- **Health check**: GET `/` endpoint returns HTML page
- **API status**: All endpoints return JSON responses
- **Error tracking**: Console logs available in Genezio dashboard

## 🎯 Next Steps

1. **Update deployment** with latest Swagger changes
2. **Test all endpoints** using production Swagger UI
3. **Configure mobile app** to use production API URL
4. **Set up monitoring** for production API health
5. **Document any database setup** required for full functionality

## 🌐 Client Integration

### **Mobile App Configuration**

Update your mobile app's API configuration:

```typescript
// Replace localhost with production URL
const API_BASE_URL =
  "https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io";
```

### **Frontend Integration**

```javascript
// Example fetch request
fetch(
  "https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io/api/vehicles"
)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Your MoovSafe API is now **production-ready** with comprehensive documentation! 🚀
