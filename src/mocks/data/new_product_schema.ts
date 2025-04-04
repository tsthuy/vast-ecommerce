/* eslint-disable check-file/filename-naming-convention */

export const new_products_schema: NewProduct[] = [
  {
    id: 1,
    name: "Laptop",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
        image: { url: "/images/car.png" },
      },
    ],
  },
  {
    id: 2,
    name: "Laptop 2",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 3",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 4",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 5",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 6",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 7",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 8",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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

export const products_jus_for_u: NewProduct[] = [
  {
    id: 5,
    name: "Laptop 5",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 6",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 7",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
    name: "Laptop 8",
    description:
      "A comfortable and stylish t-shirt made from high-quality cotton.",
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
        image: { url: "/images/laptop.png" },
      },
      {
        id: "v3",
        attributes: [
          { attributeId: "attr1", valueId: "c1" },
          { attributeId: "attr2", valueId: "s3" },
        ],
        price: 13.99,
        stock: 8,
        image: { url: "/images/trainer.png" },
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
