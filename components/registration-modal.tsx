'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check, Sparkles, X } from 'lucide-react'

type RegistrationModalProps = {
  onClose: () => void
}

export function RegistrationModal({ onClose }: RegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        className="relative my-auto w-full max-w-lg animate-[modal-scale-in_300ms_ease-out] rounded-[28px] border border-white/70 bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ đăng ký"
          className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <X size={17} />
        </button>

        {submitted ? (
          <div className="px-1 py-8 text-center" role="status" aria-live="polite">
            <div className="relative mx-auto grid size-24 place-items-center">
              <span aria-hidden="true" className="absolute left-1 top-3 size-2 rounded-full bg-amber-400" />
              <span aria-hidden="true" className="absolute right-1 top-5 size-2.5 rounded-full bg-cyan-400" />
              <span aria-hidden="true" className="absolute bottom-2 left-3 size-2.5 rounded-full bg-violet-400" />
              <span aria-hidden="true" className="absolute bottom-4 right-1 size-2 rounded-full bg-rose-400" />
              <span className="grid size-[68px] place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-xl shadow-emerald-500/25">
                <Check size={34} strokeWidth={3} />
              </span>
              <Sparkles aria-hidden="true" className="absolute -right-2 -top-1 text-amber-400" size={19} />
            </div>
            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[.2em] text-indigo-600">You&apos;re on your way</p>
            <h2 id="registration-title" className="mt-2 text-2xl font-black tracking-tight text-slate-900">Cảm ơn bạn đã đăng ký!</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">Tư vấn viên sẽ liên hệ trong 15 phút</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Hoàn tất
            </button>
          </div>
        ) : (
          <>
            <span className="grid size-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Sparkles size={21} />
            </span>
            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[.2em] text-indigo-600">Your bright start</p>
            <h2 id="registration-title" className="mt-2 text-2xl font-black tracking-tight text-slate-900">Đăng ký tư vấn miễn phí</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Để lại thông tin, Bright sẽ tư vấn lộ trình phù hợp nhất với bạn.</p>

            <form
              className="mt-6 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
              }}
            >
              <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                Họ và tên
                <input
                  autoFocus
                  required
                  name="fullName"
                  autoComplete="name"
                  placeholder="Tên của bạn"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                Số điện thoại
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern={'[0-9+ .\\(\\)\\-]{8,20}'}
                  title="Nhập số điện thoại hợp lệ từ 8 đến 20 ký tự."
                  placeholder="090 123 4567"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                Độ tuổi / khóa học quan tâm
                <select
                  required
                  name="course"
                  defaultValue=""
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="" disabled>Chọn chương trình phù hợp</option>
                  <option value="Mầm non">Mầm non</option>
                  <option value="Tiểu học">Tiểu học</option>
                  <option value="THCS">THCS</option>
                  <option value="IELTS">IELTS</option>
                  <option value="Giao tiếp">Giao tiếp</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                Cơ sở mong muốn
                <select
                  required
                  name="branch"
                  defaultValue=""
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="" disabled>Chọn cơ sở gần bạn</option>
                  <option value="Gò Vấp, TP.HCM">12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM</option>
                  <option value="Cầu Giấy, Hà Nội">28 Trần Thái Tông, Cầu Giấy, Hà Nội</option>
                </select>
              </label>
              <button className="mt-1 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
                Gửi đăng ký <ArrowRight className="ml-2 inline" size={15} />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
