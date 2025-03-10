import { memo, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default memo(function UpButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="text-primary-foreground fixed bottom-20 right-4 z-50 rounded-full bg-white p-2 shadow-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 md:right-10"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-6" />
        </button>
      )}
    </>
  );
});
