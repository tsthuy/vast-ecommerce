// eslint-disable-next-line check-file/filename-naming-convention
export const new_products_backend: NewProductBackend[] = [
  {
    id: 1,
    name: {
      en: "Gaming Smart Watch",
      vi: "Đồng hồ thông minh Gaming",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gaming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [
      { url: "/images/car.png" },
      { url: "/images/pad.png", isDefault: true },
    ],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 15,
        image: { url: "/images/cano.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 17,
        image: { url: "/images/tv.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/bag.png" },
      },
    ],
  },
  {
    id: 2,
    name: {
      en: "Breed Dry Dog Food",
      vi: "Thức ăn khô cho chó Breed",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gamming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [{ url: "/images/cano.png", isDefault: true }],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 10,
        image: { url: "/images/jacket.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 2,
        image: { url: "/images/dual.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/coat.png" },
      },
    ],
  },
  {
    id: 3,
    name: {
      en: "CANON EOS DSLR Camera",
      vi: "Máy ảnh DSLR CANON EOS",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gamming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [
      { url: "/images/car.png" },
      { url: "/images/cano.png", isDefault: true },
    ],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 10,
        image: { url: "/images/cano.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 2,
        image: { url: "/images/dual.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/coat.png" },
      },
    ],
  },
  {
    id: 4,
    name: {
      en: "Kids Electric Car",
      vi: "Xe điện trẻ em",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gamming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [
      { url: "/images/car.png" },
      { url: "/images/pad.png", isDefault: true },
    ],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 10,
        image: { url: "/images/car.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 2,
        image: { url: "/images/dual.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/coat.png" },
      },
    ],
  },
  {
    id: 5,
    name: {
      en: "GP11 Shooter USB Gamepad",
      vi: "Tai nghe không dây GP11 Shooter USB",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gamming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [
      { url: "/images/car.png" },
      { url: "/images/pad.png", isDefault: true },
    ],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 10,
        image: { url: "/images/pad.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 2,
        image: { url: "/images/dual.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/coat.png" },
      },
    ],
  },
  {
    id: 6,
    name: {
      en: "Quilted Satin Jacket",
      vi: "Áo khoác lót satin",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gamming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [
      { url: "/images/car.png" },
      { url: "/images/pad.png", isDefault: true },
    ],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 10,
        image: { url: "/images/jacket.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 2,
        image: { url: "/images/dual.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/coat.png" },
      },
    ],
  },
  {
    id: 7,
    name: {
      en: "ASUS FHD Gaming Laptop",
      vi: "Laptop Gaming ASUS FHD",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gamming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [
      { url: "/images/car.png" },
      { url: "/images/pad.png", isDefault: true },
    ],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 10,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 2,
        image: { url: "/images/dual.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/coat.png" },
      },
    ],
  },
  {
    id: 8,
    name: {
      en: "Gaming Smart Watch 8",
      vi: "Đồng hồ thông minh Gaming 8",
    },
    description: {
      en: "A comfortable and stylish t-shirt made from high-quality cotton.",
      vi: "Áo thun thoải mái và thời trang được làm từ bông chất lượng cao.",
    },
    price: 29.99,
    category: { id: "6", name: "Gamming" },
    isNew: true,
    ratings: 4.5,
    reviews: 12,
    images: [
      { url: "/images/car.png" },
      { url: "/images/pad.png", isDefault: true },
    ],
    attributes: [
      {
        id: "attr1",
        name: "Color",
        values: [
          { id: "c1", label: "Red", value: "#FF0000" },
          { id: "c2", label: "Blue", value: "#2986cc" },
        ],
      },
      {
        id: "attr2",
        name: "Size",
        values: [
          { id: "s1", label: "Small", value: "S" },
          { id: "s2", label: "Medium", value: "M" },
          { id: "s3", label: "Large", value: "L" },
        ],
      },
    ],
    variants: [
      {
        id: "v1",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 11.99,
        stock: 10,
        image: { url: "/images/cano.png" },
      },
      {
        id: "v2",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 12.99,
        stock: 15,
        image: { url: "/images/book.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v4",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s1" },
        ],
        price: 14.99,
        stock: 2,
        image: { url: "/images/dual.png" },
      },
      {
        id: "v5",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s2" },
        ],
        price: 15.99,
        stock: 8,
        image: { url: "/images/keyb.png" },
      },
      {
        id: "v6",
        attributes: [
          { attributeId: "attr1", valueId: "c2" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 16.99,
        stock: 9,
        image: { url: "/images/coat.png" },
      },
    ],
  },
];
