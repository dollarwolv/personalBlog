const icons = import.meta.glob("../assets/usericons/usericon-*.svg", {
  eager: true,
  import: "default",
});

// Turn object into a sorted array
export const userIcons = Object.values(icons);
