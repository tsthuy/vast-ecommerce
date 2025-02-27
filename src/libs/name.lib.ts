export function splitComplexName(displayName: string) {
  if (!displayName) return { firstName: "", lastName: "" };

  const parts = displayName.trim().split(" ");

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  const lastName = parts.pop(); 
  const firstName = parts.join(" "); 

  return { firstName, lastName };
}