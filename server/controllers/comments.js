import db from '../models';

const { comments, replies } = db;

export const createComment = async (req, res) => {
  try {
    const { body } = req.body;

    const addComment = await comments.create({ body, creator: req.user.id });
    return res.status(201).json({ status: true, comment: addComment });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const getComments = await comments.findAll({
      include: [{ model: replies }],
    });
    return res.status(200).json({ status: true, comments: getComments });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const { reply } = req.body;
    const createReply = await replies.create({ commentId: req.params.id, reply });
    return res.status(201).json({ status: true, reply: createReply });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await comments.destroy({ where: { id: req.params.id } });
    return res.status(201).json({ status: true, message: 'Comment deleted' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
