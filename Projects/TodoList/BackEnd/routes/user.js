import { Router } from 'express';
import { onceCallback } from '../utils.js';
import { useDataBase, useUser } from '../database.js';

const userRoute = Router();

const useUserRoute = onceCallback(async () => {
  const User = useUser(await useDataBase());

  userRoute.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    res.json(await User.findById(id));
  })

  return userRoute;
})

export default useUserRoute;
