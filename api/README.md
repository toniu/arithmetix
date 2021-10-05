# API Configuration
The API is configured with environment variables. A predefined list of these is in the `.env.example` file. Copy this to a new `.env` file (`cp .env.example .env`) and fill in your details. The application uses the `.env` file as its primary configuration, however passing environment variables in directly will override these values.

## Configuring email sending
Emails are used for notifying the student of their module changes and notifying the office about batches of user module changes. The required environment variables for sending emails are:

- `EMAIL_ADDRESS` - The sender's email address
- `EMAIL_PASSWORD` - The sender's email password
- `EMAIL_NAME` - The sender's name

