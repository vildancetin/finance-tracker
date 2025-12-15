const router = require("express").Router();

const user = require("../controller/userController");
const {protect} = require("../middleware/auth");

router.get("/", user.list);
router.get("/me", protect, user.getMe);
router.route("/:userId")
.get(user.read)
.put(user.update)
.patch(user.update)
.delete(user.delete)

module.exports = router;