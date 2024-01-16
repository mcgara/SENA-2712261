import db from './db.js';
import express from 'express';

const app = express();

app.get('/curso', (req, res) => {
  res.json(db.curso);
});

app.get('/instructores', (req, res) => {
  res.json(db.instructores);
});

app.get('/instructores/:id', (req, res) => {
  const id = Number(req.params.id);
  let result = db.instructores.filter(instructor => instructor.id === id);
  if (result.length === 0) result = { error: `not search instructor with id: '${id}'` };
  res.json(result);
});

app.get('/aprendices', (req, res) => {
  res.json(db.aprendices);
});

app.get('/aprendices/:id', (req, res) => {
  const id = Number(req.params.id);
  let result = db.aprendices.filter(aprendiz => aprendiz.id === id);
  if (result.length === 0) result = { error: `not search aprendiz with id: '${id}'` };
  res.json(result);
});

app.listen(5500);
