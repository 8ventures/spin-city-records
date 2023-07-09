# Spin City Records TS Peer-to-peer Vinyl E-Marketplace

Spin City Records is a peer-to-peer vinyl e-marketplace built using TypeScript and Next.js. The application allows users to buy and sell vinyl records in a secure and efficient manner. It leverages TRPC for efficient and type-safe communication between the client and server, ensuring robust and reliable interactions. The database management is handled by MySQL and Prisma, providing seamless data handling capabilities.

## Features

- **TRPC**: Utilized TRPC for efficient and type-safe communication between the client and server, ensuring reliable interactions and minimizing errors.
- **MySQL and Prisma**: Leveraged MySQL and Prisma for database management, allowing for seamless and efficient data handling.
- **Tailwind CSS**: Designed a modern and responsive user interface using Tailwind CSS, providing an intuitive and visually appealing experience for users.
- **Stripe API Integration**: Integrated the Stripe API to ensure secure and reliable payment processing for transactions made on the platform.
- **Form Validation with Zod**: Used Zod for form validation, ensuring that user input is valid and minimizing errors.
- **Authentication with Clerk**: Implemented authentication using Clerk, providing secure user authentication and authorization features.
- **Serverless Database with Planet Scale**: Utilized Planet Scale for serverless database management, offering scalable and reliable data storage capabilities.

## Deployment

The application is deployed using Vercel and can be accessed at [https://spin-city-records-gamma.vercel.app/](https://spin-city-records-gamma.vercel.app/). 

## Installation

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Navigate to the project directory: `cd spin-city-records`
3. Install dependencies: `npm install`
4. Set up the environment variables:
   - Create a `.env` file in the root directory with the following format:

     ```
     DATABASE_URL='MYSQL SERVER'
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=KEY
     CLERK_SECRET_KEY=KEY
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
     NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=KEY
     STRIPE_SECRET_KEY=KEY
     STRIPE_WEBHOOK_SIGNING_SECRET=KEY
     SPOTIFY_CLIENT_ID=KEY
     SPOTIFY_CLIENT_SECRET=KEY
     ```

     Replace `MYSQL SERVER`, `KEY`, and other placeholders with your actual values.

5. Start the development server: `npm run dev`
6. Access the application in your browser at `http://localhost:3000`

To explore the database, run the following command:
`npx prisma studio`


## Usage

- Register an account or log in to an existing account.
- Browse the available vinyl records listed by other users.
- Add desired records to your cart and proceed to checkout.
- Complete the payment process securely using the integrated Stripe API.
- Manage your vinyl records listings and transactions in your user dashboard.
- Explore additional features such as adding albums to your favorites.

## Contributing

We welcome contributions to improve the Spin City Records application. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.


