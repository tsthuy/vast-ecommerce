export function customErrorMessage(error: any, overrideMessage?: string) {
  return (
    error?.response?.message ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    overrideMessage ||
    "Something went wrong"
  );
}
