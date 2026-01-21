'use client' // บอกว่าเป็น Client Component เพราะมีการใช้ Hook และ Event

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProductSearchProps {
  initialQuery?: string
}

export default function ProductSearch({ initialQuery = '' }: ProductSearchProps) {
  const router = useRouter()
  
  // สร้าง State เพื่อเก็บสิ่งที่ User พิมพ์
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      // เปลี่ยน URL เป็น /products?search=...
      router.push(`/products?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/products')
    }
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาสินค้า..."
        className="w-full rounded-lg border border-slate-300 px-3 py-3 text-base"
      />
    </form>
  )
}