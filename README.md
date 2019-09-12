# E-commerce app

Demo link : [See the project here](https://ecombooks.herokuapp.com/)
![preview commerce app](https://www.zupimages.net/up/19/37/n6g2.png)

**Technologies used in this project**
Server Side
  - Node.js 12.9.0
  - ExpressJs 4.17.1
  - MongoDB / Mongoose 5.6.11
  - Braintree (Payment system) 2.19.0
  
Client Side
  - React.js 16.9.0 (Hooks)
  - MDBReact 4.19.1 (Material design)
  - MomentJs 2.24.0

### Installation Server

Requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run start || nodemon server
```

Rename .env.sample to .env and change settings with your own

```sh
DATABASE= /your mongoDB URL/
JWT_SECRET=
BRAINTREE_MERCHANT_ID=
BRAINTREE_PUBLIC_KEY=
BRAINTREE_PRIVATE_KEY=
```

### Installation Client

Requires [Create react app](https://github.com/facebook/create-react-app) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
```

Rename .env.sample to .env and change settings with your own

```sh
REACT_APP_API_URL= /URL to you server/
```

```sh
npm run start
```
