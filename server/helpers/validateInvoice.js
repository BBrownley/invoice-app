const validateInvoice = (invoice, next) => {
  for (const [key, value] of Object.entries(invoice)) {
    if (key === "items") {
      if (value.length === 0) {
        return next(new Error("No items"));
      } else {
        // Make sure all items have a name
        let hasUnnamedItem = false;
        value.forEach(item => {
          if (item.name.trim().length === 0) {
            hasUnnamedItem = true;
          }
        });
        if (hasUnnamedItem) {
          return next(new Error("Please name all items"));
        }
      }
    } else if (key === "clientAddress" || key === "senderAddress") {
      const addressValid = Object.values(value).every(
        field => field.trim().length !== 0
      );

      if (!addressValid) {
        return next(new Error("Fill out all fields"));
      }
    } else if (typeof value === "string" && value.trim().length === 0) {
      return next(new Error("Fill out all fields"));
    }
  }
  return true;
};

module.exports = validateInvoice;
