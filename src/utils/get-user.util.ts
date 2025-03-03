const GUEST_USER_KEY = "guest_user_id";

export const getGuestUserId = (): string => {
  if (typeof window === "undefined") {
    return "guest";
  }

  let guestUserId = localStorage.getItem(GUEST_USER_KEY);
  if (!guestUserId) {
    guestUserId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(GUEST_USER_KEY, guestUserId);
  }
  return guestUserId;
};

export const clearGuestUserId = (): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(GUEST_USER_KEY);
};
