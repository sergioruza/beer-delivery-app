class ErrorHandler {
  static handle(err, req, res, _next) {
    if (err instanceof Error && err.stack) {
      return res.status(+err.stack).json({ error: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}

module.exports = ErrorHandler;
