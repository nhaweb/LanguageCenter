import { ImageResponse } from 'next/og'

export const alt = 'Bright English — Học vui, tiến bộ thật'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#111B3C',
          color: '#FFFFFF',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: '#FBBF24' }}>BRIGHT ENGLISH</div>
        <div style={{ marginTop: 24, fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
          Học vui, tiến bộ thật
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: '#C7D2FE' }}>
          Giáo viên quốc tế · Cambridge & IELTS · TP.HCM và Hà Nội
        </div>
      </div>
    ),
    { ...size },
  )
}
