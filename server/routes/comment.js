import { Router } from 'express';
import { createComment, getAllComments, addReply, deleteComment } from '../controllers/comments';
import { validator } from '../utils';
import { createCommentSchema, addReplySchema } from './schema';
import { authenticate } from '../middleware/auth';

const commentRoute = Router();

commentRoute.post('/comments', validator.body(createCommentSchema), authenticate, createComment);
commentRoute.get('/comments', getAllComments);
commentRoute.patch('/comments/:id', validator.body(addReplySchema), authenticate, addReply);
commentRoute.delete('/comments/:id', authenticate, deleteComment);

export default commentRoute;
