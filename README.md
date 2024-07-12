# Whois Domain Information

This project is a web application that allows users to fetch and display information about domains using WHOIS data.

## Getting Started

### Prerequisites

Before you begin, you'll need to obtain an API key from Whois XML API [https://main.whoisxmlapi.com](https://main.whoisxmlapi.com). Follow these steps to get started:

1. ### Obtain API Key
   - Sign up or log in to Whois XML API [https://main.whoisxmlapi.com](https://main.whoisxmlapi.com)
   - Obtain your API key, which will be used to authenticate requests to the WHOIS API.

### Installation and Usage

1. ### Clone the repository

   ```bash
   git clone https://github.com/srhqmp/whois.git
   cd whois
   ```

2. ### Environment Configuration

   1. Create a `.env` file in the root directory of your project.
   2. Add your API key to the `.env` file:

      ```makefile
      VITE_WHOIS_API_KEY=your_api_key_here
      ```

      Replace your_api_key_here with the API key obtained from Whois XML API.

3. ### Install dependencies

   ```bash
   npm install
   ```

4. ### Start the development server

   ```bash
   npm run dev
   ```

5. ### Open the application

   Open your browser and navigate to `http://localhost:5000`.

## Features

- Fetches domain information based on user input.
- Displays WHOIS records for the entered domain.
- Handles errors gracefully and displays error messages when necessary.
- Built with React for the frontend user interface.
- Uses Axios for making API requests to fetch domain data.
- Styled with Tailwind CSS for modern and responsive design.
- Developed and bundled with Vite for fast and efficient development.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Lints the JavaScript files using ESLint.
- `npm run preview`: Previews the production build locally.
- `npm run build-css`: Builds Tailwind CSS from src/styles.css to public/styles.css.
- `npm run dev-css`: Watches and rebuilds Tailwind CSS during development.
