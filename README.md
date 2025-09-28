# 🚗 MoovSafe Project Overview

## Project Name
**MoovSafe** – Full-Stack Vehicle Inspection & Maintenance Application

---

## 📝Project Description
MoovSafe is a full-stack application designed to help users **inspect, monitor, and maintain their vehicles**. Users can record vehicle faults, document maintenance history (both DIY and professional jobs), track mileage, and store vehicle information for future reference.  

The backend is built with **Node.js**, **Express**, and **TypeScript**, using **Drizzle ORM** with **PostgreSQL** for database management. The frontend (planned/under development) is built with **React Native** for a mobile-first experience.  

The app is designed to scale with features such as PDF report generation for maintenance history, inspection summaries, and vehicle health reports.



## ✅ Key Features (Implemented)
- 🚘 **Vehicle Management**: Add and manage vehicle details such as make, model, year, and registration.  
- 🛠️ **Inspection & Fault Recording**: Users can log vehicle faults on a daily or monthly basis.  
- 🔧 **Maintenance History Tracking**: Document repairs and maintenance, including receipts, invoices, and service details.  
- 📏 **Mileage Tracking**: Track vehicle mileage over time to plan maintenance schedules.  
- 📸 **File Uploads**: Store images of invoices, receipts, or vehicle faults using **Cloudinary**.  
- 💾 **Database Management**: Drizzle ORM with migrations, schema generation, and database studio for management.  
- 🛡️ **Type Safety & Validation**: Input validation with **Zod** for safe and reliable API requests.



## 🚀 Planned Features / Roadmap
- 🔐 **Authentication & Authorization** (JWT / OAuth) for user accounts  
- 📄 **PDF Report Generation**:
  - Vehicle service history  
  - Inspection reports showing logged faults and overall vehicle health  
- 📱 **Frontend Integration** with React Native for mobile app usage  
- 🔔 **Push Notifications** for maintenance reminders  
- 📊 **Analytics & Insights** on vehicle usage and health trends  


## 🛠️ Tech Stack
- **Backend Framework:** Node.js + Express  
- **Frontend:** React Native (planned)  
- **Language:** TypeScript  
- **Database:** PostgreSQL (via Drizzle ORM)  
- **File Storage:** Cloudinary (via Multer)  
- **Validation:** Zod  
- **Dev Tools:** ESLint, Prettier, TSX for live development  
- **CI/CD & Deployment:** Genezio serverless functions, GitHub Actions  



## 📁 Project Structure

  ```moovSafe/  
        ├─ api/ # Backend server  
        │ ├─ src/ # TypeScript source code  
        │ ├─ dist/ # Compiled JS code  
        │ ├─ drizzle/ # Database migrations  
        │ ├─ node_modules/  
        │ ├─ package.json  
        │ ├─ tsconfig.json  
        │ └─ genezio.yaml # Deployment configuration  
        ├─ client/ # Frontend (React Native)  
        ├─ .github/ # GitHub Actions workflows  
        └─ README.md # Project summary for GitHub
```





## 💾 Database & ORM
- **PostgreSQL** hosted via Genezio  
- **Drizzle ORM** for database operations  
- Commands for management:

```bash
# Generate migration
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle studio
npm run db:studio
```
## ⚡ Scripts

Common backend scripts:

```# Start backend in dev mode
npm run dev

# Build backend
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Prettier formatting
npm run prettier
```



## 🔄 CI/CD

-   **GitHub Actions** triggers deployment on pushes to `main`.
    
-   Backend deployed to **Genezio serverless functions** automatically.
    
-   Uses a secure **GENEZIO_TOKEN** stored as a repository secret.
