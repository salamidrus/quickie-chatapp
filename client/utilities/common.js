export default {
  getInitialsFromName: (name) => {
    const letters = String(name)
      .split(" ")
      .map((c) => c.chartAt(0));
    return letters.join("");
  },
};
