
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

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <repository-folder>
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

## Development Notes
- This project is in active development. Contributions are welcome!
- For any issues, please create a GitHub issue in the repository.

---