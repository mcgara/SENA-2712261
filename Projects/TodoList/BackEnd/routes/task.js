import { Router } from 'express';
import { onceCallback } from '../utils.js';
import { useDataBase, useTask } from '../database.js';

const taskRoute = Router();

const useTaskRoute = onceCallback(async () => {
  const Task = useTask(await useDataBase());

  taskRoute.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    res.json(await Task.findById(id));
  })

  return taskRoute;
})

export default useTaskRoute;
