import { Router } from "express";
import { deleteUsers, getUser, getUsers, postUsers, putUserByEmail } from "../controllers";

const router = Router();   

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUsers);
router.put('/:email', putUserByEmail);
router.delete('/:email', deleteUsers);

export default router;


