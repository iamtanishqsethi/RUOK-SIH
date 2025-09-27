const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
  isLiked: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: false },
  color: { type: String, default: 'bg-gradient-to-t from-red-900' },
  timestamp: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  tags: { type: Array, default: [] },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
