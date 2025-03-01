interface CategoryBackend {
  id: string;
  name: {
    en: string;
    vi: string;
  };
}
interface Category extends CategoryBackend {
  name: string;
}

interface CategoryGridBackend {
  id: string;
  name: { en: string; vi: string };
}
interface CategoryGrid extends CategoryGridBackend {
  name: string;
}

interface SlideBackend {
  id: number;
  icon: string;
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  image: string;
  href: string;
}
interface Slide extends SlideBackend {
  title: string;
  description: string;
}
