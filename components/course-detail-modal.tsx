'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GraduationCap,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from 'lucide-react'

export type CourseGalleryItem = {
  id: string
  caption: string
}

export type CourseDetailData = {
  title: string
  level: string
  category: 'Mầm non' | 'Tiểu học' | 'THCS & IELTS' | 'Người đi làm'
  ageGroupId: 'kids' | 'primary' | 'secondary' | 'ielts' | 'adults'
  image: string
  gallery: CourseGalleryItem[]
  badge: string
  rating: string
  duration: string
  price: string
  originalPrice?: string
  color: string
  description: string
  targetAge: string
  cefrLevel: string
  outcomes: string[]
  curriculum: string
  modules: { title: string; detail: string }[]
  classFormat: string
}

type CourseDetailModalProps = {
  course: CourseDetailData
  onClose: () => void
  onRegister: (courseTitle: string, note: string) => void
}

export function CourseDetailModal({ course, onClose, onRegister }: CourseDetailModalProps) {
  const photos = course.gallery && course.gallery.length > 0
    ? course.gallery
    : [{ id: course.image, caption: `Không gian lớp học ${course.title}` }]

  const [photoIdx, setPhotoIdx] = useState(0)
  const currentPhoto = photos[photoIdx] || photos[0]

  const prevPhoto = () => setPhotoIdx((p) => (p - 1 + photos.length) % photos.length)
  const nextPhoto = () => setPhotoIdx((p) => (p + 1) % photos.length)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') setPhotoIdx((p) => (p - 1 + photos.length) % photos.length)
      if (event.key === 'ArrowRight') setPhotoIdx((p) => (p + 1) % photos.length)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, photos.length])

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/65 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div
        className="flex min-h-full items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-detail-title"
          className="relative my-auto w-full max-w-2xl animate-[modal-scale-in_300ms_ease-out] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-2xl"
        >
          {/* Interactive Multi-Photo Header Carousel with Prev/Next Controls */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
            <Image
              key={currentPhoto.id}
              src={`https://images.unsplash.com/${currentPhoto.id}?auto=format&fit=crop&w=1000&q=85`}
              alt={`${course.title} - ${currentPhoto.caption}`}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="slide-fade-in object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/15" />

            {/* Top Left Photo Counter & Caption Pill */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-extrabold text-amber-300">
                <Camera aria-hidden="true" size={13} />
                <span>
                  Ảnh {photoIdx + 1}/{photos.length}: {currentPhoto.caption}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng chi tiết khóa học"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Prev / Next Navigation Buttons */}
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevPhoto}
                  aria-label="Xem ảnh lớp học trước"
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/20 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Xem ảnh lớp học tiếp theo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/20 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md border px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider ${course.color}`}>
                  {course.badge}
                </span>
                <span className="rounded-md bg-white/15 backdrop-blur-md px-2.5 py-0.5 text-xs font-bold text-cyan-200 border border-white/20">
                  Chuẩn {course.cefrLevel}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-300/30">
                  <Star aria-hidden="true" size={12} fill="currentColor" /> {course.rating}/5.0
                </span>
              </div>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2 id="course-detail-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {course.title}
                  </h2>
                  <p className="mt-0.5 text-sm sm:text-base font-medium text-slate-200">
                    {course.level} · Đối tượng: {course.targetAge}
                  </p>
                </div>

                {/* Clickable Dot/Thumb Indicators */}
                {photos.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {photos.map((p, i) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPhotoIdx(i)}
                        aria-label={`Chuyển tới ảnh ${i + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer min-h-0 ${
                          i === photoIdx ? 'w-7 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-base leading-relaxed text-slate-700">{course.description}</p>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <Clock3 aria-hidden="true" size={14} /> Thời lượng
                </div>
                <p className="mt-1 text-sm sm:text-base font-extrabold text-[#0A192F]">{course.duration}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <Users aria-hidden="true" size={14} /> Sĩ số lớp
                </div>
                <p className="mt-1 text-sm sm:text-base font-extrabold text-[#0A192F]">{course.classFormat}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <BookOpen aria-hidden="true" size={14} /> Giáo trình
                </div>
                <p className="mt-1 text-sm sm:text-base font-extrabold text-indigo-950">{course.curriculum}</p>
              </div>
            </div>

            {/* Learning Modules */}
            <div>
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-[#0A192F]">
                <Target aria-hidden="true" size={18} className="text-indigo-600" />
                Nội dung &amp; Cấu trúc lộ trình học
              </h3>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {course.modules.map((m, i) => (
                  <div key={m.title} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                    <span className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-xs font-extrabold text-indigo-900">
                      Học phần 0{i + 1}
                    </span>
                    <p className="mt-1.5 text-sm sm:text-base font-extrabold text-[#0A192F]">{m.title}</p>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed">{m.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guaranteed Outcomes */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <h3 className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-emerald-950">
                <GraduationCap aria-hidden="true" size={18} className="text-emerald-700" />
                Cam kết đầu ra &amp; Quyền lợi học viên
              </h3>
              <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {course.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-emerald-900">
                    <CheckCircle2 aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200 pt-5">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Học phí trọn gói theo tháng
                </span>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#0A192F]">{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm font-medium text-slate-400 line-through">{course.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onRegister(course.title, `Đăng ký học thử & nhận lộ trình chi tiết khóa ${course.title}`)
                  }}
                  className="btn-shimmer inline-flex h-12 flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-6 text-sm sm:text-base font-bold text-slate-950 shadow-md shadow-amber-500/20 transition cursor-pointer"
                >
                  <Sparkles aria-hidden="true" size={16} />
                  Đăng ký học thử miễn phí
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
