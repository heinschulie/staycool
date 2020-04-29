
import * as functions from 'firebase-functions';
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

import { correctamundo, weCool, thisIsARobbery } from '../../../libs/functions/src';

const one = functions.https.onRequest((request, response) => response.send( thisIsARobbery() ));
const two = functions.https.onRequest((request, response) => response.send( correctamundo() ));
const three = functions.https.onRequest((request, response) => response.send( weCool() ));

app.get('/one', one);
app.get('/two', two);
app.get('/three', three);

exports.quotes = functions.https.onRequest(app);
