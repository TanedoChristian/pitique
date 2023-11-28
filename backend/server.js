const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());

// When in PROD
// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("../client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
//   });
// }
const realtorRouter = require("./router/realtorRouter");
const pitiquerRouter = require("./router/pitiquerRouter");
const packageRouter = require("./router/packageRouter");
const portfolioRouter = require("./router/portfolioRouter");
const bookingRouter = require("./router/bookingRouter");
const realtorFeedbackRouter = require("./router/realtorFeedbackRouter");
const paymentRouter = require("./router/paymentRouter");

app.use(bodyParser.json());

app.use("/realtors", realtorRouter);
app.use("/pitiquers", pitiquerRouter);
app.use("/packages", packageRouter);
app.use("/portfolios", portfolioRouter);
app.use("/bookings", bookingRouter);
app.use("/realtor-feedbacks", realtorFeedbackRouter);
app.use("/payments", paymentRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Node JS Server Started"));
