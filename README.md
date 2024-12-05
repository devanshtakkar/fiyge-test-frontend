Here's the updated README with the detailed backend server setup instructions:

```markdown
# Form Builder Application

## Overview
The **Form Builder Application** is a web-based tool that allows users to build and customize forms with an intuitive drag-and-drop interface. Users can arrange, edit, and delete form components, save their configurations to a backend database, and view the form structure in the console or network tab after saving.

### Features
- **Drag and Drop**: Easily drag and drop form components into the builder area.
- **Customizable Properties**: Edit properties of form components such as:
  - Name
  - Placeholder
  - Required
  - Options (for dropdowns, checkboxes, etc.)
- **Save and View**: Save the customized form to a backend database and view the structure in the developer tools.

---

## Getting Started

### Prerequisites
- Ensure you have **Node.js** and **npm** installed on your machine.

### Backend Server Setup
1. Clone the backend server repository:
   ```bash
   git clone https://github.com/devanshtakkar/fiyge-test-backend
   ```
2. Navigate to the backend project directory:
   ```bash
   cd fiyge-test-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
   - The backend server is required to authenticate users and retrieve the auth token during login.

### Frontend Setup
1. Clone the Form Builder repository:
   ```bash
   git clone https://github.com/devanshtakkar/fiyge-test-frontend
   ```
2. Navigate to the project directory:
   ```bash
   cd https://github.com/devanshtakkar/fiyge-test-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Login Credentials
- **Username**: `user`
- **Password**: `password`

You will need these credentials to log in and access the application.

---

Watch this video demonstration to see the Form Builder in action:  
[![Form Builder Demo](https://img.youtube.com/vi/MngOoDEK-eo/0.jpg)](https://www.youtube.com/watch?v=MngOoDEK-eo)  
Click on the thumbnail or [here](https://www.youtube.com/watch?v=MngOoDEK-eo) to watch the video.

---

## How to Use

### Form Builder Features
1. **Add Components**:
   - Drag form components from the **Component Section** into the **Form Builder Area**.
   - Arrange the components in the desired order.

2. **Edit Components**:
   - Click the **Edit** button on a component to modify its properties (e.g., name, placeholder, required, etc.).
   - Once done, click the **"Done"** button in the customization window to apply the changes.

3. **Delete Components**:
   - Use the **Delete** button to remove unwanted components from the builder.

4. **Save the Form**:
   - After completing the edits, click the **Save** button to store the form in the backend database.
   - Check the final form structure:
     - **Console Log**: The latest structure is logged to the console.
     - **Network Tab**: Inspect the network requests to see the saved form data.

---
