const express = require("express");

const videosControllers = require("../controllers/videos-controllers");

const router = express.Router();

const {
  getPublishedVideos,
  getVideosByCreatorId,
  getVideoByVideoId,
  createVideo,
  updateVideo,
  deleteVideo,
  publishVideo,
  likeVideo,
} = videosControllers;

router.get("/", getPublishedVideos);

router.get("/creator/:creatorId", getVideosByCreatorId);

router.get("/:videoId", getVideoByVideoId);

router.post("/creator/:creatorId", createVideo);

router.put("/creator/:videoId", updateVideo);

router.put("/creator/publish/:videoId", publishVideo);

router.delete("/creator/:videoId", deleteVideo);

router.put("/like/:creatorId", likeVideo);

module.exports = router;
