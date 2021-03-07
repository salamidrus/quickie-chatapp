export default {
  getInitialsFromName: (name) => {
    const letters = String(name)
      .split(" ")
      .map((c) => {
        return c.charAt(0).toUpperCase();
      });
    return letters.join("");
  },
};
