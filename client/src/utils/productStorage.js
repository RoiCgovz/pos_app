const STORAGE_KEY = "products";

const defaultProducts = [
  {
    id: 1,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65,
    category: "Shoes",
    stock: 15,
    image: "https://images.unsplash.com/photo-1556048219-bb6978360b84?q=80&w=1171&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Air Max",
    brand: "Nike",
    price: 150,
    category: "Shoes",
    stock: 8,
    image: "https://images.unsplash.com/photo-1662245336484-99d8ee24ec30?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 180,
    category: "Shoes",
    stock: 12,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "RS-X Sneakers",
    brand: "Puma",
    price: 110,
    category: "Shoes",
    stock: 5,
    image: "https://m.media-amazon.com/images/I/71ZApeHKYSL.AC_SX675.jpg",
  },
  {
    id: 5,
    name: "Classic Leather",
    brand: "Reebok",
    price: 95,
    category: "Shoes",
    stock: 20,
    image: "https://cdn.runrepeat.com/storage/gallery/product_content/24862/reebok-classic-leather-jvw-21061278-main.jpg",
  },
  {
    id: 6,
    name: "Essential Hoodie",
    brand: "Nike",
    price: 55,
    category: "Clothing",
    stock: 18,
    image: "https://media.karousell.com/media/photos/products/2022/6/21/essentials_x_nike_hoodie_1655791016_b949b335.jpg",
  },
  {
    id: 7,
    name: "Oversized T-Shirt",
    brand: "Adidas",
    price: 35,
    category: "Clothing",
    stock: 25,
    image: "https://static-ph.zacdn.com/p/adidas-7282-0940814-2.jpg",
  },
  {
    id: 8,
    name: "Classic Backpack",
    brand: "Nike",
    price: 75,
    category: "Accessories",
    stock: 10,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Legion Pro 7i Gen9 16",
    brand: "Lenovo",
    price: 2399,
    category: "Electronics",
    stock: 7,
    image: "https://sm.pcmag.com/pcmag_me/photo/default/069pld1ryr9fv8r4ebquzjq-5_wdsb.jpg",
  },
  {
    id: 10,
    name: "Urban Watch",
    brand: "Casio",
    price: 120,
    category: "Accessories",
    stock: 4,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Oyster Perpetual Day-Date 40",
    brand: "Rolex",
    price: 45000,
    category: "Accessories",
    stock: 2,
    image: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_2440/v1/rolexcom/094398bf1f99/collection/watches-grid/popin-cards/m228235-0055/m228235-0055_v01",
  },
  {
    id: 12,
    name: "ROG Strix G16",
    brand: "Asus",
    price: 1399,
    category: "Electronics",
    stock: 5,
    image: "https://dlcdnwebimgs.asus.com/gain/65D421F6-2A1E-49B7-881E-4877752411A0",
  },
];

export function getProducts() {
  const products = localStorage.getItem(STORAGE_KEY);
  if (products) {
    return JSON.parse(products);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
}

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now(),
  };
  const updatedProducts = [...products, newProduct];
  saveProducts(updatedProducts);
  return newProduct;
}

export function updateProduct(id, updatedProduct) {
  const products = getProducts();
  const updatedProducts = products.map((product) =>
    product.id === id
      ? { ...product, ...updatedProduct }
      : product
  );
  saveProducts(updatedProducts);
  return updatedProducts;
}

export function deleteProduct(id) {
  const products = getProducts();
  const updatedProducts = products.filter(
    (product) => product.id !== id
  );
  saveProducts(updatedProducts);
  return updatedProducts;
}

export default defaultProducts;