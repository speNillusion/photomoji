# Photomoji 📸✨

**Photomoji** is a creative web application that transforms ordinary text into phase with emojis word. By leveraging a robust Java Spring Boot backend and a dynamic React frontend.

## 🚀 Features

-   **Real-time Text Parsing**: Instantly converts text input into emoji patterns.
-   **Customizable Emoji Mappings**: Sophisticated parsing logic to map characters to specific emoji arrangements.
-   **Modern UI/UX**: Built with React and Tailwind CSS for a sleek, responsive experience.
-   **Dark/Light Mode**: Fully supported theming for comfortable viewing in any environment.
-   **Cross-Platform**: Works seamlessly on desktop and mobile devices.

## 🛠️ Technology Stack

### Backend
-   **Java 21**: Core programming language.
-   **Spring Boot**: Framework for creating the RESTful API.
-   **Maven**: Dependency management and build tool.

### Frontend
-   **React 19**: Library for building the user interface.
-   **Vite**: Next-generation frontend tooling for fast builds.
-   **TypeScript**: Typed superset of JavaScript for safer code.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Lucide React**: Beautiful, consistent icons.

## Observation
- **.env**: In Project's Root, has .env, put the API key there.

## 📂 Project Structure

The project is organized into a monorepo-like structure containing both backend and frontend code:

```
photomoji/
├── src/
│   ├── main/java/com/photomoji/photomoji/  # Backend Source Code
│   │   ├── controllers/                    # REST Controllers (API Endpoints)
│   │   ├── dto/                            # Data Transfer Objects
│   │   ├── parser/                         # Core Text-to-Emoji Logic
│   │   └── PhotomojiApplication.java       # Main Spring Boot Entry Point
│   │
│   └── frotmain/                           # Frontend Source Code
│       ├── src/
│       │   ├── components/                 # React Components (InputArea, ResultDisplay)
│       │   ├── services/                   # API Integration (apiService.ts)
│       │   └── App.tsx                     # Main Application Component
│       ├── package.json                    # Frontend Dependencies
│       └── vite.config.ts                  # Vite Configuration
├── pom.xml                                 # Backend Dependencies (Maven)
└── README.md                               # Project Documentation
```

## 🔌 API Documentation

The backend exposes a RESTful API to handle text parsing.

### `POST /api/parse`

Converts a given word or phrase into an emoji grid string.

**Request Body:**
```json
{
  "word": "Era uma vez um lutador que gostava de comer cascas de banana"
}
```

**Response Body:**
```json
{
  "texto": "Era uma vez um 🥊 que gostava de 🍽️ cascas de 🍌"
}
```

## 🏁 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites
-   **Java 17** or higher installed.
-   **Node.js 18** or higher installed.
-   **Maven** (optional, wrapper included).

### Backend Setup

1.  Navigate to the project root directory.
2.  Run the Spring Boot application using the Maven wrapper:

    **Windows:**
    ```powershell
    ./mvnw spring-boot:run
    ```

    **Linux/macOS:**
    ```bash
    ./mvnw spring-boot:run
    ```

    The backend server will start at `http://localhost:3000`.

### Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd src/frotmain
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

    The frontend will be available at `http://localhost:5000` (or the port shown in the terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
