module.exports = {
  normalizeNames: (name) => {
    let parts = name.split(" ");
    parts = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    );
    return parts.join(" ");
  },
};
