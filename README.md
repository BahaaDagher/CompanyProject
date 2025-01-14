# Company Project
project based on .NET core5 in Backend and Angular in Frontend

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Screenshots](#screenshots)


---

## Introduction
This project is a web application built using Angular for the frontend and .NET Core for the backend. It includes role-based authentication, also using Tailwind CSS, and secure data handling.

---

## Features
- User authentication and role-based access control.
- CRUD operations for managing employees, departments, projects, and users.
- Real-time notifications.
- Custom alerts using SweetAlert.

---

## Technologies Used
### Frontend:
- **Angular**: Framework for building the user interface.
- **Tailwind CSS**: For modern design.
- **RxJS**: For managing asynchronous data streams.

### Backend:
- **.NET Core**: Framework for creating the API.
- **Entity Framework Core**: ORM for database interactions.

### Database:
- **SQL Server**: Database used for storing application data.

### Other Tools:
- **SweetAlert**: For enhanced alert and confirmation dialogs.

---

## Setup and Installation
### Prerequisites
1. **Node.js**: Install from [Node.js website](https://nodejs.org/).
2. **Angular CLI**: Install globally using `npm install -g @angular/cli`.
3. **.NET Core SDK**: Install from [.NET website](https://dotnet.microsoft.com/download).
4. **SQL Server**: Ensure you have a running instance.

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Angular application:
   ```bash
   ng serve
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Restore .NET dependencies:
   ```bash
   dotnet restore
   ```
3. Update the connection string in `appsettings.json` to match your SQL Server configuration.
4. Run database migrations:
   ```bash
   dotnet ef database update
   ```
5. Start the backend server:
   ```bash
   dotnet run
   ```

---

## Usage
- Open the application in your browser at `http://localhost:4200/`.
- Log in using admin credentials to access all features.
- Regular users have limited access based on their roles.

---

## Screenshots
![Screenshot_486](https://github.com/user-attachments/assets/46e0f2c6-0bb3-4640-8677-54a37d6b84a6)
![Screenshot_487](https://github.com/user-attachments/assets/63189930-997d-404b-b955-9355d5fe9c71)
![Screenshot_488](https://github.com/user-attachments/assets/823eb384-aaf4-4f67-88f2-353f56cfbdac)
![Screenshot_489](https://github.com/user-attachments/assets/a0c114b5-4dea-4ba6-8bee-a2a640bf7c1f)
![Screenshot_490](https://github.com/user-attachments/assets/12c26655-a091-4ef9-b507-172b39300237)
![Screenshot_491](https://github.com/user-attachments/assets/cba610b9-f4e0-4734-b1bc-d0c146236f1d)

