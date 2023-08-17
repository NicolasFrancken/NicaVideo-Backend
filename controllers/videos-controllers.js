const pool = require("../db");

const HttpError = require("../models/http-error");

const getPublishedVideos = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM videos WHERE published = true"
    );

    res.json(result.rows);
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

const getVideosByCreatorId = async (req, res, next) => {
  const { creatorId } = req.params;
  try {
    const creatorVideos = await pool.query(
      "SELECT * FROM videos WHERE id_creator = $1",
      [creatorId]
    );

    res.json(creatorVideos.rows);
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

const getVideoByVideoId = async (req, res, next) => {
  const { videoId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM videos WHERE id_video = $1",
      [videoId]
    );

    if (result.rows.length === 0) {
      const error = new HttpError("Video not found", 404);
      return next(error);
    }

    res.json(result.rows[0]);
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

const createVideo = async (req, res, next) => {
  const { creatorId } = req.params;
  const { url, title } = req.body;

  try {
    const createdVideo = await pool.query(
      "INSERT INTO videos (url, title, id_creator) VALUES ($1, $2, $3) RETURNING *",
      [url, title, creatorId]
    );

    res.json(createdVideo.rows);
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

const updateVideo = async (req, res, next) => {
  const { videoId } = req.params;
  const { title } = req.body;

  try {
    const result = await pool.query(
      "UPDATE videos SET title = $1 WHERE id_video = $2 RETURNING *",
      [title, videoId]
    );

    if (result.rows.length === 0) {
      const error = new HttpError("Video not found", 404);
      return next(error);
    }

    res.json(result.rows[0]);
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

const publishVideo = async (req, res, next) => {
  const { videoId } = req.params;

  try {
    const result = await pool.query(
      "UPDATE videos SET published = NOT published WHERE id_video = $1 RETURNING *",
      [videoId]
    );

    if (result.rows.length === 0) {
      const error = new HttpError("Video not found", 404);
      return next(error);
    }

    res.json(result.rows[0]);
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

const deleteVideo = async (req, res, next) => {
  const { videoId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM videos WHERE id_video = $1 RETURNING *",
      [videoId]
    );

    if (result.rowCount === 0) {
      const error = new HttpError("Video not found", 404);
      return next(error);
    }

    res.sendStatus(204);
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

const likeVideo = async (req, res, next) => {
  const { creatorId } = req.params;
  const { videoId } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM creators WHERE id_creator = $1 AND $2 = ANY(liked_videos)",
      [creatorId, videoId]
    );

    if (result.rows.length === 0) {
      try {
        const result = await pool.query(
          "UPDATE creators SET liked_videos = array_append(liked_videos, $2) WHERE id_creator = $1 RETURNING *",
          [creatorId, videoId]
        );

        res.json({ result: result.rows[0] });
      } catch (e) {
        const error = new HttpError("There was an error", 500);
        return next(error);
      }
    } else {
      try {
        const result = await pool.query(
          "UPDATE creators SET liked_videos = array_remove(liked_videos, $2) WHERE id_creator = $1 RETURNING *",
          [creatorId, videoId]
        );

        res.json({ result: result.rows[0] });
      } catch (e) {
        const error = new HttpError("There was an error", 500);
        return next(error);
      }
    }
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

exports.getPublishedVideos = getPublishedVideos;
exports.getVideosByCreatorId = getVideosByCreatorId;
exports.getVideoByVideoId = getVideoByVideoId;
exports.createVideo = createVideo;
exports.updateVideo = updateVideo;
exports.publishVideo = publishVideo;
exports.deleteVideo = deleteVideo;
exports.likeVideo = likeVideo;
