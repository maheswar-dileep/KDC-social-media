import { Router } from 'express';
import * as controller from '../controllers/posts.js';

const router = Router();

router.route('/post').post(controller.createPost);
router.route('/post').get(controller.getAllPost);
router.route('/post/:id').get(controller.getPost);
router.route('/post/:id').put(controller.updatePost);
router.route('/post/:id').delete(controller.deletePost);

router.route('/like/:id').put(controller.likePost);
router.route('/dislike/:id').put(controller.dislikePost);

router.route('/search').get(controller.searchPost);
router.route('/post-by-id/:id').get(controller.getPostById);

export default router;
