// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const photosRouter = require("./photos.js");
const commentsRouter = require("./comments.js");
const albumsRouter = require("./albums.js");
const albumPhotosRouter = require("./albumPhotos.js");

//const imagesRouter = require("./images.js");

// backend/routes/api/index.js
// GET /api/restore-user
const { restoreUser } = require("../../utils/auth.js");

// GET /api/set-token-cookie
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");

router.post("/test", function (req, res) {
 res.json({ requestBody: req.body });
});
// backend/routes/api/index.js
// ...

router.get("/set-token-cookie", async (_req, res) => {
 const user = await User.findOne({
  where: {
   username: "Demo-lition",
  },
 });

 setTokenCookie(res, user);
 return res.json({ user: user });
});
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/photos", photosRouter);

router.use("/comments", commentsRouter);

router.use("/albums", albumsRouter);

router.use("/albumPhotos", albumPhotosRouter);

//
router.post("/test", (req, res) => {
 res.json({ requestBody: req.body });
});
//
router.get("/restore-user", (req, res) => {
 return res.json(req.user);
});

router.get("/require-auth", requireAuth, (req, res) => {
 return res.json(req.user);
});

// ...
// ...
module.exports = router;
