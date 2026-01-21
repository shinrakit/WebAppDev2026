import Link from "next/link";
import Image from "next/image";
import ProductSearch from "@/components/product-search";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  image: string;
}

// Mock Data
const products: Product[] = [
  {
    id: 1,
    name: "โทรศัพท์มือถือ Samsung Galaxy S24",
    price: 25900,
    category: "phone",
    description: "สมาร์ทโฟนรุ่นล่าสุดพร้อมกล้อง AI และหน้าจอ Dynamic AMOLED 2X",
    image: "/products/galaxy-s24.jpg",
  },
  {
    id: 2,
    name: "แล็ปท็อป MacBook Air M3",
    price: 42900,
    category: "laptop",
    description: "แล็ปท็อปบางเบาพร้อมชิป M3 ประสิทธิภาพสูงและแบตเตอรี่ใช้งานได้ยาวนาน",
    image: "/products/macbook-air.jpg",
  },
  {
    id: 3,
    name: "หูฟังไร้สาย AirPods Pro",
    price: 8990,
    category: "audio",
    description: "หูฟังระดับพรีเมียมพร้อม Active Noise Cancellation และ Spatial Audio",
    image: "/products/airpods-pro.jpg",
  },
  {
    id: 4,
    name: "แท็บเล็ต iPad Air",
    price: 21900,
    category: "tablet",
    description: "แท็บเล็ตอเนกประสงค์พร้อมชิป M2 และจอ Liquid Retina ขนาด 11 นิ้ว",
    image: "/products/ipad-air.jpg",
  },
  {
    id: 5,
    name: "โทรศัพท์มือถือ iPhone 15 Pro",
    price: 41900,
    category: "phone",
    description: "iPhone รุ่นท็อปพร้อมชิป A17 Pro และกล้องระดับมืออาชีพ",
    image: "/products/iphone15-pro.jpg",
  },
  {
    id: 6,
    name: "หูฟัง Sony WH-1000XM3",
    price: 7990,
    category: "audio",
    description: "หูฟังตัดเสียงรบกวนระดับพรีเมียม",
    image: "/products/sony-wh1000xm3.jpg",
  },
];

type ProductsContentProps = {
  searchParams?: Promise<{ search?: string }>;
};

export async function ProductsContent({ searchParams }: ProductsContentProps) {
  const params = (await searchParams) ?? {};
  const search = params.search?.trim() ?? "";

  const filteredProducts = search
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : products;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">รายการสินค้า</h1>

      <ProductSearch initialQuery={search} />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
          <p className="text-slate-500 text-lg">
            ไม่พบสินค้าที่ค้นหาสำหรับ &quot;{search}&quot;
          </p>
          <Link href="/products" className="text-blue-600 hover:underline mt-2 inline-block">
            ล้างการค้นหา
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-6 text-slate-600">
            พบ <strong>{filteredProducts.length}</strong> รายการ
            {search && (
              <span>
                {" "}
                สำหรับ{" "}
                <mark className="bg-yellow-100 px-1">&quot;{search}&quot;</mark>
              </span>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={product.id === 1}
                  />
                </div>

                <div className="p-4 flex flex-col grow">
                  <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
                  </Link>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-blue-600">
                      ฿{product.price.toLocaleString()}
                    </p>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
