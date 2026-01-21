// app/page.tsx (Server Component โดย Default)
import MyCarousel from './components/client-carousel'

export default function Page() {
  return (
    <div>
      <h1>หน้าแรกของฉัน</h1>
      {/* ใช้งานได้ทันที ไม่เกิด Error บน Server */}
      <MyCarousel /> 
    </div>
  )
}