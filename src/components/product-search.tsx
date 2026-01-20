'use client' // บอกว่าเป็น Client Component เพราะมีการใช้ Hook และ Event

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ProductSearch({ initialQuery = '' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // สร้าง State เพื่อเก็บสิ่งที่ User พิมพ์
  const [query, setQuery] = useState(initialQuery)

  // ดักจับเวลา URL เปลี่ยน (เช่น กด Back/Forward) ให้ตัวหนังสือในช่องค้นหาเปลี่ยนตาม
  useEffect(() => {
    setQuery(searchParams.get('search') || '')
  }, [searchParams])

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