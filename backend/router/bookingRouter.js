const express = require("express");
const router = express.Router();

const BookingModel = require("../model/bookingModel");

const bookingModel = new BookingModel();

// GET /bookings/:id - Get a specific realtor by ID
router.get("/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await bookingModel.getBookingById(bookingId);

    if (!booking) {
      res.status(404).send("booking not found");
    } else {
      res.json(booking);
    }
  } catch (error) {
    console.error(`Error getting booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /bookings/realtor/:id - Get the bookings by realtor id
router.get("/realtor/:id", async (req, res) => {
  const realtorId = req.params.id;

  try {
    const bookings = await bookingModel.getBookingByRealtor(realtorId);

    if (bookings.length === 0) {
      res.status(404).send("bookings not found");
    } else {
      res.json(bookings);
    }
  } catch (error) {
    console.error(
      `Error getting bookings with realtor id ${realtorId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// GET /bookings/pitiquer/:id - Get the bookings by pitiquer id
router.get("/pitiquer/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const bookings = await bookingModel.getBookingByPitiquer(pitiquerId);

    if (bookings.length === 0) {
      res.status(404).send("bookings not found");
    } else {
      res.json(bookings);
    }
  } catch (error) {
    console.error(
      `Error getting bookings with pitiquer id ${pitiquerId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// GET /bookings/history/pitiquer/:id - Get the history bookings by pitiquer id
router.get("/history/pitiquer/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const bookings = await bookingModel.getBookingHistoryByPitiquer(pitiquerId);

    if (bookings.length === 0) {
      res.status(404).send("history bookings not found");
    } else {
      res.json(bookings);
    }
  } catch (error) {
    console.error(
      `Error getting history bookings with pitiquer id ${pitiquerId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// GET /bookings/history/realtor/:id - Get the history bookings by realtor id
router.get("/history/realtor/:id", async (req, res) => {
  const realtorId = req.params.id;

  try {
    const bookings = await bookingModel.getBookingHistoryByRealtor(realtorId);

    if (bookings.length === 0) {
      res.status(404).send("history bookings not found");
    } else {
      res.json(bookings);
    }
  } catch (error) {
    console.error(
      `Error getting history bookings with realtor id ${realtorId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// GET /bookings/request/:id - Get the booking requests by pitiquer id
router.get("/request/:id", async (req, res) => {
  const pitiquerId = req.params.id;

  try {
    const bookings = await bookingModel.getBookingRequestByPitiquer(pitiquerId);

    if (bookings.length === 0) {
      res.status(404).send("requests not found");
    } else {
      res.json(bookings);
    }
  } catch (error) {
    console.error(
      `Error getting requests with pitiquer id ${pitiquerId}:`,
      error
    );
    res.status(500).send("Internal Server Error");
  }
});

// POST /bookings/request - Create a new request
router.post("/request", async (req, res) => {
  const bookingInfo = req.body;

  try {
    await bookingModel.requestBooking(bookingInfo);
    res.status(201).json({ message: "Reqeust created successfully" });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /bookings/accept/:id - accept a booking by ID
router.put("/accept/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const existingBooking = await bookingModel.getBookingById(bookingId);

    if (!existingBooking) {
      res.status(404).send("booking not found");
      return;
    }

    await bookingModel.acceptBookingRequest(bookingId);
    res.json({ message: "Booking accepted successfully" });
  } catch (error) {
    console.error(`Error accepting Booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /bookings/pay/:id - pay a booking by ID
router.put("/pay/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const existingBooking = await bookingModel.getBookingById(bookingId);

    if (!existingBooking) {
      res.status(404).send("booking not found");
      return;
    }

    await bookingModel.payBookingRequest(bookingId);
    res.json({ message: "Booking paid successfully" });
  } catch (error) {
    console.error(`Error accepting Booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /bookings/complete/:id - complete a booking by ID
router.put("/complete/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const existingBooking = await bookingModel.getBookingById(bookingId);

    if (!existingBooking) {
      res.status(404).send("booking not found");
      return;
    }

    await bookingModel.completeBookingRequest(bookingId);
    res.json({ message: "Booking completed successfully" });
  } catch (error) {
    console.error(`Error completing Booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /bookings/decline/:id - decline a booking by ID
router.put("/decline/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const existingBooking = await bookingModel.getBookingById(bookingId);

    if (!existingBooking) {
      res.status(404).send("booking not found");
      return;
    }

    await bookingModel.declineBookingRequest(bookingId);
    res.json({ message: "Booking declined successfully" });
  } catch (error) {
    console.error(`Error declining Booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /bookings/cancel/:id - cancelled a booking by ID
router.put("/cancel/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const existingBooking = await bookingModel.getBookingById(bookingId);

    if (!existingBooking) {
      res.status(404).send("booking not found");
      return;
    }

    await bookingModel.cancelledBookingRequest(bookingId);
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(`Error cancelling Booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /bookings/reschedule/:id - reschedule a booking by ID
router.put("/reschedule/:id", async (req, res) => {
  const bookingId = req.params.id;
  const { date } = req.body;

  try {
    const existingBooking = await bookingModel.getBookingById(bookingId);

    if (!existingBooking) {
      res.status(404).send("booking not found");
      return;
    }

    await bookingModel.rescheduleBooking(bookingId, date);
    res.json({ message: "Booking reschedule successfully" });
  } catch (error) {
    console.error(`Error rescheduling Booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT /bookings/reschedule/:id - update a booking by ID
router.put("/reschedule/:id", async (req, res) => {
  const bookingId = req.params.id;
  const { pitiquerId, updatedInfo } = req.body;

  try {
    const existingBooking = await bookingModel.getBookingById(bookingId);

    if (!existingBooking) {
      res.status(404).send("booking not found");
      return;
    }

    await bookingModel.updateBooking(pitiquerId, bookingId, updatedInfo);
    res.json({ message: "Booking update successfully" });
  } catch (error) {
    console.error(`Error updating Booking with ID ${bookingId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
