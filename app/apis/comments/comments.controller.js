const { Comment } = require("./comments.model");

class CommentController {
  async all(req, res) {
    try {
      const { product_id } = req.query;
      const commentsQuery = Comment
        .leftJoin("users", "id", "user_id")
        .selectFromRight("username")
        .where("product_id", "=", product_id);

      const comments = await commentsQuery.get();
      const rate = await commentsQuery.avg("rate");
      const count = await commentsQuery.count();
      res.json({ count, rate, comments });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async one(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" })
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async create(req, res) {
    try {
      const { product_id, rate, text } = req.body;
      const comment = await Comment.save({ user_id: req.user.id, product_id, rate, text })
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" })
      }
      const upComment = await Comment.update(id, req.body)
      res.json(upComment);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" })
      }
      const status = await Comment.delete(id)
      res.json({ ...status, comment });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

module.exports = { CommentController };