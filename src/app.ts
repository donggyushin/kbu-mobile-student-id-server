import express, { Application, Request, Response, NextFunction } from 'express'
import api from './api'
import { json } from 'body-parser';
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
import session from 'express-session';


const app: Application = express();

app.use(session({
    secret: 'keyborad cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
// Allow server to accept json type data from client side. 
app.use(json())
// As we are developing an API that will serve data for any kind of 
// client-side applications, we need to enable the CORS’s middleware 
// for the endpoints become public. Meaning that some clients can 
// make requests on our API.
app.use(cors())
// we are going to set up our application to report and generate logs files 
// about the user’s requests. To do this let’s use the module morgan which is 
// a middleware for generating request’s logs in the server.
app.use(morgan("common"))
// To make requests lighter and load faster, let’s enable another middleware 
// which is going to be responsible for compacting the JSON responses and 
// also the static files which your application will serve to GZIP format, 
// a compatible format to several browsers.
app.use(compression())
// Finishing the development of our API, let’s include a very important module, 
// which is a security middleware that handles several kinds of attacks in the 
// HTTP/HTTPS protocols. This module is called helmet which is a set of nine internal 
// middlewares, responsible to treat the following HTTP settings:

// Configures the Content Security Policy;
// Removes the header X-Powered-By that informs the name and the version of a server;
// Configures rules for HTTP Public Key Pinning;
// Configures rules for HTTP Strict Transport Security;
// Treats the header X-Download-Options for Internet Explorer 8+;
// Disables the client-side caching;
// Prevents sniffing attacks on the client Mime Type;
// Prevents ClickJacking attacks;
// Protects against XSS (Cross-Site Scripting) attacks.
app.use(helmet())
app.use('/api', api)

export default app;