'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check, Sparkles, X, AlertCircle } from 'lucide-react'
import { saveLead } from '@/lib/lead'

const COURSE_OPTIONS = [
  'English Explorers',
  'Bright Stars',
  'Cambridge Champions',
  'IELTS Breakthrough',
  'IELTS Mastery 7.0+',
  'Speak with Confidence',
  'Chưa xác định',
] as const

const AGE_OPTIONS = ['4–6 tuổi', '6–11 tuổi', '12–15 tuổi', '15+ tuổi', 'Người đi làm', 'Phụ huynh đăng ký hộ']
const CALLBACK_OPTIONS = ['Sáng 8:00–11:00', 'Chiều 13:00–17:00', 'Tối 18:00–21:00']
const CAMPUS_OPTIONS = ['Gò Vấp, TP.HCM', 'Cầu Giấy, Hà Nội']

type RegistrationModalProps = {
  onClose: () => void
  initialCourse?: string
  initialNote?: string
  initialCampus?: string
}

export function RegistrationModal({
  onClose,
  initialCourse = '',
  initialNote = '',
  initialCampus = CAMPUS_OPTIONS[0],
}: RegistrationModalProps) {
  const matchedCourse = COURSE_OPTIONS.includes(initialCourse as (typeof COURSE_OPTIONS)[number]) ? initialCourse : ''
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState(matchedCourse)
  const [age, setAge] = useState('')
  const [callback, setCallback] = useState('')
  const [branch, setBranch] = useState(CAMPUS_OPTIONS.some((item) => item === initialCampus) ? initialCampus : CAMPUS_OPTIONS[0])
  const [note, setNote] = useState(initialNote || (initialCourse && !matchedCourse ? `Khóa quan tâm: ${initialCourse}` : ''))
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [delivered, setDelivered] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function validate(): boolean {
    const nextErrors: Record<string, string> = {}
    const trimmedName = fullName.trim()
    const cleanPhone = phone.replace(/[\s.-]/g, '')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!trimmedName || trimmedName.length < 2) {
      nextErrors.fullName = 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự).'
    }

    if (!cleanPhone) {
      nextErrors.phone = 'Vui lòng nhập số điện thoại.'
    } else if (!/^(0|\+?84)[1-9][0-9]{8}$/.test(cleanPhone)) {
      nextErrors.phone = 'Số điện thoại không hợp lệ (gồm 10 chữ số, ví dụ 090 123 4567).'
    }

    if (email.trim() && !emailRegex.test(email.trim())) {
      nextErrors.email = 'Địa chỉ email chưa đúng định dạng (ví dụ: yourname@gmail.com).'
    }

    if (!course) {
      nextErrors.course = 'Vui lòng chọn khóa học hoặc chương trình bạn quan tâm.'
    }

    if (!branch) {
      nextErrors.branch = 'Vui lòng chọn cơ sở học tập.'
    }
    if (!age) nextErrors.age = 'Vui lòng chọn độ tuổi.'
    if (!callback) nextErrors.callback = 'Vui lòng chọn khung giờ gọi lại.'
    if (!consent) nextErrors.consent = 'Cần đồng ý xử lý dữ liệu để tư vấn viên được gọi lại.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const result = await saveLead({
        kind: 'consultation',
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        course,
        campus: branch,
        age,
        callback,
        note: note.trim(),
        consent,
      })
      setDelivered(result.delivered)
      setSubmitted(true)
    } catch {
      setSubmitError('Chưa gửi được yêu cầu. Kiểm tra mạng rồi thử lại, hoặc gọi 1900 6868.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/60 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div
        className="flex min-h-full items-center justify-center p-4"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-title"
        className="relative my-auto w-full min-w-0 max-w-lg animate-[modal-scale-in_300ms_ease-out] rounded-[28px] border border-white/70 bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ đăng ký"
          className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="px-1 py-6 text-center" role="status" aria-live="polite">
            <div className="relative mx-auto grid size-24 place-items-center">
              <span aria-hidden="true" className="absolute left-1 top-3 size-2 rounded-full bg-amber-400" />
              <span aria-hidden="true" className="absolute right-1 top-5 size-2.5 rounded-full bg-cyan-400" />
              <span aria-hidden="true" className="absolute bottom-2 left-3 size-2.5 rounded-full bg-violet-400" />
              <span aria-hidden="true" className="absolute bottom-4 right-1 size-2 rounded-full bg-rose-400" />
              <span className="grid size-[68px] place-items-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25">
                <Check size={34} strokeWidth={3} />
              </span>
              <Sparkles aria-hidden="true" className="absolute -right-2 -top-1 text-amber-400" size={19} />
            </div>
            <p className="mt-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-700">Đăng ký thành công</p>
            <h2 id="registration-title" className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              Cảm ơn {fullName || 'bạn'}!
            </h2>
            <div className="mx-auto mt-3 max-w-sm rounded-2xl bg-indigo-50/70 p-4 text-sm text-slate-700">
              <p className="font-bold text-indigo-950">
                {delivered ? 'Đã chuyển yêu cầu cho tư vấn viên' : 'Đã lưu yêu cầu trên trình duyệt này'}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Khung giờ gọi lại: <strong className="text-slate-900">{callback}</strong>, số{' '}
                <strong className="text-slate-900">{phone}</strong>, cơ sở {branch}.
                {delivered ? '' : ' Môi trường này chưa nối máy chủ nhận lead — gọi 1900 6868 nếu cần xếp lịch ngay.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Hoàn tất
            </button>
          </div>
        ) : (
          <>
            <div className="flex min-w-0 items-start gap-3 pr-12">
              <span className="grid size-11 place-items-center rounded-xl bg-indigo-100 text-indigo-700 shadow-sm shrink-0">
                <Sparkles size={20} />
              </span>
              <div>
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-700">Bright English</p>
                <h2 id="registration-title" className="text-balance text-2xl font-black tracking-tight text-[#0A192F] sm:text-3xl">
                  Đăng ký tư vấn miễn phí
                </h2>
              </div>
            </div>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
              Chọn khóa, độ tuổi, cơ sở và khung giờ gọi lại. Học thử được xếp sau khi tư vấn viên xác nhận.
            </p>

            {Object.keys(errors).length > 0 && (
              <div role="alert" className="mt-3.5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs sm:text-sm font-semibold text-rose-800">
                <AlertCircle size={16} className="shrink-0 text-rose-600" />
                <span>Vui lòng kiểm tra lại các trường thông tin được đánh dấu bên dưới.</span>
              </div>
            )}

            <form className="mt-4 grid min-w-0 grid-cols-1 gap-3.5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-1">
                <label className="text-sm font-bold text-slate-800" htmlFor="reg-fullname">
                  Họ và tên học viên / phụ huynh <span className="text-rose-500">*</span>
                </label>
                <input
                  id="reg-fullname"
                  autoFocus
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }))
                  }}
                  autoComplete="name"
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                  className={`h-12 w-full min-w-0 rounded-xl border px-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 sm:text-base ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
                />
                {errors.fullName && <p className="text-xs sm:text-sm font-medium text-rose-600">{errors.fullName}</p>}
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-3">
                <div className="grid min-w-0 gap-1">
                  <label className="text-sm font-bold text-slate-800" htmlFor="reg-phone">
                    Số điện thoại liên hệ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    required
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                    }}
                    autoComplete="tel"
                    placeholder="Ví dụ: 090 123 4567"
                    className={`h-12 w-full min-w-0 rounded-xl border px-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 sm:text-base ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.phone && <p className="text-xs sm:text-sm font-medium text-rose-600">{errors.phone}</p>}
                </div>

                <div className="grid min-w-0 gap-1">
                  <label className="text-sm font-bold text-slate-800" htmlFor="reg-email">
                    Email nhận tài liệu
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                    }}
                    autoComplete="email"
                    placeholder="name@gmail.com"
                    className={`h-12 w-full min-w-0 rounded-xl border px-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 sm:text-base ${
                      errors.email ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.email && <p className="text-xs sm:text-sm font-medium text-rose-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-bold text-slate-800" htmlFor="reg-course">
                  Chương trình quan tâm <span className="text-rose-500">*</span>
                </label>
                <select
                  id="reg-course"
                  required
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value)
                    if (errors.course) setErrors(prev => ({ ...prev, course: '' }))
                  }}
                  className={`h-12 w-full min-w-0 rounded-xl border bg-white px-4 text-sm text-slate-800 outline-none transition focus:ring-2 sm:text-base ${
                    errors.course ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
                >
                  <option value="" disabled>Chọn khóa học</option>
                  {COURSE_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.course && <p className="text-xs sm:text-sm font-medium text-rose-600">{errors.course}</p>}
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-3">
                <div className="grid min-w-0 gap-1">
                  <label className="text-sm font-bold text-slate-800" htmlFor="reg-age">
                    Độ tuổi <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="reg-age"
                    required
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value)
                      if (errors.age) setErrors((prev) => ({ ...prev, age: '' }))
                    }}
                    className={`h-12 w-full min-w-0 rounded-xl border bg-white px-4 text-sm outline-none transition focus:ring-2 sm:text-base ${
                      errors.age ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  >
                    <option value="">Chọn độ tuổi</option>
                    {AGE_OPTIONS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.age && <p className="text-xs font-medium text-rose-600 sm:text-sm">{errors.age}</p>}
                </div>
                <div className="grid min-w-0 gap-1">
                  <label className="text-sm font-bold text-slate-800" htmlFor="reg-callback">
                    Khung giờ gọi lại <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="reg-callback"
                    required
                    value={callback}
                    onChange={(e) => {
                      setCallback(e.target.value)
                      if (errors.callback) setErrors((prev) => ({ ...prev, callback: '' }))
                    }}
                    className={`h-12 w-full min-w-0 rounded-xl border bg-white px-4 text-sm outline-none transition focus:ring-2 sm:text-base ${
                      errors.callback ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  >
                    <option value="">Chọn khung giờ</option>
                    {CALLBACK_OPTIONS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {errors.callback && <p className="text-xs font-medium text-rose-600 sm:text-sm">{errors.callback}</p>}
                </div>
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-bold text-slate-800" htmlFor="reg-branch">
                  Cơ sở <span className="text-rose-500">*</span>
                </label>
                <select
                  id="reg-branch"
                  required
                  value={branch}
                  onChange={(e) => {
                    setBranch(e.target.value)
                    if (errors.branch) setErrors(prev => ({ ...prev, branch: '' }))
                  }}
                  className="h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                >
                  {CAMPUS_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-bold text-slate-800" htmlFor="reg-note">
                  Mục tiêu học tập hoặc câu hỏi (nếu có)
                </label>
                <textarea
                  id="reg-note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Muốn luyện phát âm chuẩn, chuẩn bị thi IELTS hoặc tìm lớp học thử..."
                  className="w-full min-w-0 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                />
              </div>

              <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed text-slate-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked)
                    if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }))
                  }}
                  className="mt-1 size-4 shrink-0 accent-indigo-600"
                />
                <span>Tôi đồng ý để Bright English xử lý họ tên và số điện thoại nhằm gọi tư vấn khóa học, theo Nghị định 13/2023/NĐ-CP.</span>
              </label>
              {errors.consent && <p className="text-xs font-medium text-rose-600 sm:text-sm">{errors.consent}</p>}
              {submitError && (
                <p role="alert" className="text-sm font-semibold text-rose-700">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-sm sm:text-base font-bold text-slate-950 shadow-md shadow-amber-800/15 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Đang gửi...' : (
                  <>
                    Gửi đăng ký tư vấn <ArrowRight className="ml-2 inline" size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </section>
      </div>
    </div>
  )
}
