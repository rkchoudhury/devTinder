export const capitalizedString = (value: string) =>
  value.replace(/\b\w/g, (char) => char.toUpperCase());

// value
//   .split(" ")
//   .map((word) => word?.[0]?.toUpperCase() + word.substring(1))
//   .join(" ");

// value?.[0]?.toUpperCase() + value?.substring(1)
