'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Clock3, GraduationCap, Mail, MapPin, Menu, MessageCircle, Percent, Phone, Play, Quote, Sparkles, Star, Target, Users, X, Zap } from 'lucide-react'
import { RegistrationModal } from '@/components/registration-modal'

type Course = { title: string; level: string; category: string; image: string; badge: string; rating: string; duration: string; price: string; color: string }
const courses: Course[] = [
  { title: 'English Explorers', level: 'Mầm non · 4–6 tuổi', category: 'Mầm non', image: 'photo-1503454537195-1dcabb73ffb9', badge: 'Bé yêu thích', rating: '4.9', duration: '8 tháng', price: 'Từ 1.590.000đ/tháng', color: 'bg-amber-100 text-amber-800' },
  { title: 'Bright Stars', level: 'Tiểu học · 6–11 tuổi', category: 'Tiểu học', image: 'photo-1509062522246-3755977927d7', badge: 'Hot trend', rating: '5.0', duration: '10 tháng', price: 'Từ 1.790.000đ/tháng', color: 'bg-rose-100 text-rose-800' },
  { title: 'IELTS Breakthrough', level: 'IELTS Foundation · 12–17 tuổi', category: 'THCS & IELTS', image: 'photo-1523240795612-9a054b0db644', badge: 'Cam kết đầu ra', rating: '4.9', duration: '6 tháng', price: 'Từ 2.490.000đ/tháng', color: 'bg-violet-100 text-violet-800' },
  { title: 'IELTS Mastery 7.0+', level: 'IELTS Advanced · 15+ tuổi', category: 'THCS & IELTS', image: 'photo-1523580846011-d3a5bc25702b', badge: 'Giảm 35%', rating: '5.0', duration: '5 tháng', price: 'Từ 2.990.000đ/tháng', color: 'bg-amber-200 text-amber-950' },
  { title: 'Speak with Confidence', level: 'Giao tiếp · Người đi làm', category: 'Người đi làm', image: 'photo-1521737711867-e3b97375f902', badge: 'Lịch linh hoạt', rating: '4.8', duration: '4 tháng', price: 'Từ 1.990.000đ/tháng', color: 'bg-emerald-100 text-emerald-800' },
  { title: 'Cambridge Champions', level: 'Starters · Movers · Flyers', category: 'Tiểu học', image: 'photo-1503676260728-1c00da094a0b', badge: 'Ưu đãi tháng này', rating: '4.9', duration: '8 tháng', price: 'Từ 1.690.000đ/tháng', color: 'bg-amber-200 text-amber-950' },
]
const filters = ['Tất cả', 'Mầm non', 'Tiểu học', 'THCS & IELTS', 'Người đi làm']
const programs = [
  { title: 'Mầm non', detail: 'Khám phá đầu đời', ages: '4–6 tuổi', menuLabel: 'Mầm non · 4–6 tuổi', filter: 'Mầm non', courses: ['English Explorers'] },
  { title: 'Tiểu học', detail: 'Tự tin giao tiếp', ages: '6–11 tuổi', menuLabel: 'Tiểu học · 6–11 tuổi', filter: 'Tiểu học', courses: ['Bright Stars', 'Cambridge Champions'] },
  { title: 'THCS', detail: 'Vững vàng nền tảng', ages: '12–15 tuổi', menuLabel: 'THCS · 12–15 tuổi', filter: 'THCS & IELTS', courses: ['IELTS Breakthrough'] },
  { title: 'THPT & IELTS', detail: 'Bứt phá IELTS', ages: '15+ tuổi', menuLabel: 'THPT & IELTS · 15+ tuổi', filter: 'THCS & IELTS', courses: ['IELTS Breakthrough', 'IELTS Mastery 7.0+'] },
  { title: 'Người đi làm', detail: 'English at work', ages: 'Giao tiếp', menuLabel: 'Giao tiếp · Người đi làm', filter: 'Người đi làm', courses: ['Speak with Confidence'] },
]
const photos = [
  ['photo-1523580846011-d3a5bc25702b', 'Lớp học truyền cảm hứng'], ['photo-1523240795612-9a054b0db644', 'Cùng nhau tiến bộ'], ['photo-1509062522246-3755977927d7', 'Không gian sáng tạo'], ['photo-1529390079861-591de354faf5', 'Cộng đồng Bright'],
]
const offerCourses = courses.filter((course) => course.badge === 'Giảm 35%' || course.badge === 'Ưu đãi tháng này')
const branches = ['12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM', '28 Trần Thái Tông, Cầu Giấy, Hà Nội']

function image(id: string, width = 900) { return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85` }

function isOffer(course: Course) {
  return course.badge === 'Giảm 35%' || course.badge === 'Ưu đãi tháng này'
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = counterRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.35 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value)
      return
    }

    const start = performance.now()
    let frame = 0
    const animate = (now: number) => {
      const progress = Math.min((now - start) / 1400, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isVisible, value])

  return <span ref={counterRef} className={isVisible ? 'animate-[counter-enter_500ms_ease-out_both]' : 'opacity-0'}>{count.toLocaleString('vi-VN')}{suffix}</span>
}

export function EnglishCenter() {
  const [filter, setFilter] = useState('Tất cả')
  const [modal, setModal] = useState<'register' | 'quiz' | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openCourseGroup, setOpenCourseGroup] = useState<string | null>(null)
  const [newsletter, setNewsletter] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.scroll-reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    document.documentElement.classList.add('scroll-reveal-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('scroll-reveal-ready')
    }
  }, [])

  const visibleCourses = filter === 'Tất cả' ? courses : courses.filter(course => course.category === filter)
  const chooseProgram = (nextFilter: string) => {
    setFilter(nextFilter)
    setMenuOpen(false)
    setOpenCourseGroup(null)
  }

  return <main className="min-h-screen overflow-hidden bg-[#f8fafc] pb-24 text-[#0f172a] md:pb-0">
    <div className="bg-[#111b3c] px-4 py-2.5 text-center text-xs font-medium text-white sm:text-sm">
      <a href="#offers" className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-md">
        <Percent aria-hidden="true" size={15} className="text-amber-300" />
        <span>Tự tin tỏa sáng cùng tiếng Anh — ưu đãi học phí đến <span className="font-bold text-amber-300">35%</span> trong tháng này</span>
        <span className="font-bold text-amber-300 underline underline-offset-2">Xem ưu đãi</span>
      </a>
    </div>
    <header className="sticky top-0 z-40 border-b border-indigo-100/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5" aria-label="Bright English trang chủ"><span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"><Sparkles aria-hidden="true" size={21}/></span><span className="text-[17px] font-extrabold tracking-tight">Bright <span className="text-indigo-600">English</span><small className="block text-[9px] font-bold uppercase tracking-[.2em] text-slate-500">Learn · Play · Shine</small></span></a>
        <nav className="hidden items-center gap-4 text-[13px] font-semibold text-slate-700 lg:flex" aria-label="Điều hướng chính">
          <a className="inline-flex min-h-11 items-center rounded-md hover:text-indigo-700" href="#offers">Ưu đãi</a>
          <a className="inline-flex min-h-11 items-center rounded-md hover:text-indigo-700" href="#courses">Khóa học</a>
          <div className="group relative">
            <button type="button" className="flex min-h-11 items-center gap-1 rounded-md py-3 hover:text-indigo-700" aria-haspopup="true">Chương trình <ChevronDown aria-hidden="true" size={14}/></button>
            <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 rounded-3xl border border-indigo-100 bg-white p-5 opacity-0 shadow-2xl shadow-indigo-900/10 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-2">
                {programs.map((item) => <a key={item.menuLabel} href="#courses" onClick={() => chooseProgram(item.filter)} className="flex min-h-11 items-center gap-3 rounded-2xl p-3 hover:bg-indigo-50"><span className="grid size-9 place-items-center rounded-xl bg-indigo-100 text-indigo-700"><BookOpen aria-hidden="true" size={17}/></span><span><span className="block text-sm font-bold text-slate-800">{item.title}</span><span className="text-[11px] text-slate-600">{item.detail}</span></span></a>)}
              </div>
            </div>
          </div>
          <a className="hidden min-h-11 items-center rounded-md hover:text-indigo-700 xl:inline-flex" href="#who">Đối tượng</a>
          <a className="hidden min-h-11 items-center rounded-md hover:text-indigo-700 xl:inline-flex" href="#why">Về Bright</a>
          <a className="hidden min-h-11 items-center rounded-md hover:text-indigo-700 xl:inline-flex" href="#stories">Học viên</a>
          <a className="inline-flex min-h-11 items-center rounded-md hover:text-indigo-700" href="#start">Bắt đầu</a>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:19006868" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700"><Phone aria-hidden="true" size={14}/> 1900 6868</a>
          <button type="button" onClick={() => setModal('register')} className="inline-flex min-h-11 items-center rounded-full bg-[#D97706] px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-700/20 transition-colors duration-200 hover:bg-amber-500">Test miễn phí <ArrowRight aria-hidden="true" className="ml-1 inline" size={14}/></button>
        </div>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid size-11 place-items-center rounded-xl border border-slate-200 lg:hidden" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation-drawer">{menuOpen ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
      </div>
      {menuOpen && <div id="mobile-navigation-drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title" className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={(event) => { if (event.target === event.currentTarget) setMenuOpen(false) }}><div className="absolute inset-y-0 right-0 flex h-full w-full animate-[drawer-slide-in_300ms_cubic-bezier(0.16,1,0.3,1)] flex-col bg-white shadow-2xl sm:max-w-md"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><a href="#home" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5" aria-label="Bright English trang chủ"><span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white"><Sparkles aria-hidden="true" size={20}/></span><span className="text-base font-extrabold">Bright <span className="text-indigo-600">English</span></span></a><button type="button" autoFocus onClick={() => setMenuOpen(false)} aria-label="Đóng menu" className="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"><X aria-hidden="true"/></button></div><h2 id="mobile-navigation-title" className="sr-only">Điều hướng Bright English</h2><nav aria-label="Điều hướng chính" className="flex-1 overflow-y-auto px-5 py-4"><div className="grid gap-1 pb-4">{[['Ưu đãi tháng này','#offers'],['Cách bắt đầu','#start'],['Đối tượng học','#who']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 text-sm font-semibold text-indigo-800 hover:bg-amber-50">{label}</a>)}</div><p className="px-3 pb-3 text-[10px] font-extrabold uppercase tracking-[.2em] text-indigo-700">Chương trình theo độ tuổi</p><div className="grid gap-2">{programs.map((group, index) => { const isOpen = openCourseGroup === group.menuLabel; const panelId = `mobile-course-group-${index}`; return <section key={group.menuLabel} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenCourseGroup(isOpen ? null : group.menuLabel)} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-bold text-slate-800 transition-colors hover:bg-indigo-50/70"><span>{group.menuLabel}</span><ChevronDown aria-hidden="true" size={17} className={`shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}/></button><div id={panelId} className={`${isOpen ? 'grid' : 'hidden'} border-t border-slate-100 px-2 py-2`}><a href="#courses" onClick={() => chooseProgram(group.filter)} className="flex min-h-12 items-center justify-between rounded-xl px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">Xem tất cả khóa học <ArrowRight aria-hidden="true" size={15}/></a>{group.courses.map((course) => <a key={course} href="#courses" onClick={() => chooseProgram(group.filter)} className="flex min-h-12 items-center justify-between rounded-xl px-3 text-sm text-slate-700 hover:bg-slate-50"><span>{course}</span><ArrowUpRight aria-hidden="true" size={14} className="text-slate-500"/></a>)}</div></section> })}</div><div className="mt-5 grid gap-1 border-t border-slate-100 pt-4">{[['Về Bright','#why'],['Câu chuyện học viên','#stories'],['Cơ sở vật chất','#campus']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{label}</a>)}</div></nav><div className="border-t border-slate-100 p-5"><button type="button" onClick={() => { setModal('register'); setMenuOpen(false) }} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D97706] px-5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-700/20">Đăng ký test miễn phí <ArrowRight aria-hidden="true" size={16}/></button></div></div></div>}
    </header>

    <section id="home" className="relative scroll-mt-24 bg-[radial-gradient(ellipse_at_78%_5%,rgba(99,102,241,.13),transparent_35%),linear-gradient(135deg,#f8fafc_10%,#eef2ff_54%,#f8fafc_100%)]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-12 md:pb-16 md:pt-16 lg:grid-cols-[1.04fr_.96fr] lg:px-8 lg:pt-20">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3.5 py-2 text-[11px] font-bold text-indigo-800 shadow-sm"><span className="size-2 rounded-full bg-emerald-500"/> ENGLISH THAT OPENS WORLDS</p>
          <h1 className="max-w-2xl text-[42px] font-extrabold leading-[1.09] tracking-[-.045em] sm:text-6xl lg:text-[64px]">Bứt phá tiếng Anh,<br/>chinh phục <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">tương lai</span><br/>toàn cầu.</h1>
          <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-700 sm:text-base">Mỗi buổi học là một hành trình khám phá. Cùng giáo viên quốc tế và phương pháp học qua trải nghiệm, con tự tin dùng tiếng Anh mỗi ngày.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => setModal('register')} className="inline-flex min-h-12 items-center rounded-full bg-[#D97706] px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-800/15 transition-colors duration-200 hover:bg-amber-500">Đăng ký học thử <ArrowRight aria-hidden="true" className="ml-2 inline" size={16}/></button>
            <a href="#courses" className="inline-flex min-h-12 items-center rounded-full border border-indigo-200 bg-white px-6 py-3.5 text-sm font-bold text-indigo-800 transition-colors duration-200 hover:border-indigo-500 hover:bg-indigo-50"><Play aria-hidden="true" className="mr-2 inline fill-indigo-700" size={14}/> Khám phá khóa học</a>
          </div>
          <div className="mt-9 flex items-center gap-4">
            <div className="flex -space-x-3">{['photo-1534528741775-53994a69daeb','photo-1500648767791-00dcc994a43e','photo-1531123897727-8f129e1688ce','photo-1506794778202-cad84cf45f1d'].map(id => <img key={id} className="size-9 rounded-full border-[3px] border-white object-cover" src={image(id,100)} alt=""/>)}</div>
            <div>
              <div className="flex items-center gap-1 text-amber-600"><Star aria-hidden="true" size={13} fill="currentColor"/><Star aria-hidden="true" size={13} fill="currentColor"/><Star aria-hidden="true" size={13} fill="currentColor"/><Star aria-hidden="true" size={13} fill="currentColor"/><Star aria-hidden="true" size={13} fill="currentColor"/><span className="ml-1 text-xs font-extrabold text-slate-800">4.9/5</span></div>
              <p className="mt-0.5 text-[11px] text-slate-600">Được tin yêu bởi 15.000+ gia đình</p>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[550px] pb-5 pt-2">
          <div className="absolute -right-3 top-3 size-32 rounded-full bg-cyan-300/30 blur-3xl"/>
          <div className="absolute -left-8 bottom-10 size-40 rounded-full bg-violet-300/35 blur-3xl"/>
          <div className="relative grid h-[420px] grid-cols-[1.05fr_.95fr] grid-rows-[1.1fr_.9fr] gap-3 sm:h-[500px]">
            <div className="relative row-span-2 overflow-hidden rounded-[30px] shadow-xl shadow-indigo-900/10"><img className="h-full w-full object-cover" src={image('photo-1503454537195-1dcabb73ffb9',850)} alt="Học viên vui vẻ khám phá tiếng Anh"/><div className="absolute inset-0 bg-gradient-to-t from-[#101a35]/55 via-transparent to-transparent"/><div className="absolute bottom-5 left-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-100">Learn with joy</p><p className="mt-1 text-xl font-extrabold">Học vui mỗi ngày</p></div></div>
            <div className="relative overflow-hidden rounded-[30px] shadow-xl shadow-indigo-900/10"><img className="h-full w-full object-cover" src={image('photo-1523240795612-9a054b0db644',700)} alt="Nhóm bạn học cùng nhau"/></div>
            <div className="relative overflow-hidden rounded-[30px] shadow-xl shadow-indigo-900/10"><img className="h-full w-full object-cover" src={image('photo-1509062522246-3755977927d7',700)} alt="Phòng học hiện đại"/></div>
          </div>
          <div className="absolute -left-8 top-12 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-xl sm:flex"><span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-700"><Star aria-hidden="true" fill="currentColor" size={19}/></span><div><p className="text-sm font-extrabold"><AnimatedCounter value={98} suffix="%"/> đạt mục tiêu</p><p className="text-[10px] text-slate-600">Tiến bộ thấy rõ mỗi ngày</p></div></div>
          <div className="absolute -right-2 bottom-11 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-xl sm:-right-5"><span className="grid size-10 place-items-center rounded-xl bg-indigo-100 text-indigo-700"><Users aria-hidden="true" size={19}/></span><div><p className="text-sm font-extrabold"><AnimatedCounter value={15000} suffix="+"/></p><p className="text-[10px] text-slate-600">Học viên tỏa sáng</p></div></div>
        </div>
      </div>
    </section>

    <section id="offers" className="scroll-reveal scroll-mt-24 px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[28px] border border-amber-300 bg-white p-6 shadow-[0_18px_50px_rgba(217,119,6,0.12)] sm:p-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-950"><Percent aria-hidden="true" size={14}/> Ưu đãi trong tháng</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Học phí giảm đến 35%</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-700">Mức giảm đang gắn với IELTS Mastery 7.0+. Cambridge Champions có ưu đãi tháng này. Bài test trình độ vẫn 3 phút và miễn phí.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setModal('register')} className="inline-flex min-h-12 items-center rounded-full bg-[#D97706] px-5 py-3 text-sm font-bold text-slate-950 transition-colors duration-200 hover:bg-amber-500">Đăng ký giữ ưu đãi <ArrowRight aria-hidden="true" className="ml-2" size={16}/></button>
            <button type="button" onClick={() => setModal('quiz')} className="inline-flex min-h-12 items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-colors duration-200 hover:border-amber-600 hover:bg-amber-50">Test miễn phí · 3 phút</button>
          </div>
        </div>
        <div className="grid gap-3">
          {offerCourses.map((course, index) => (
            <article key={course.title} className="list-enter flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center" style={{ animationDelay: `${index * 60}ms` }}>
              <img src={image(course.image, 240)} alt="" className="h-20 w-full rounded-xl object-cover sm:w-28"/>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-extrabold uppercase tracking-wide text-amber-950">{course.badge}</p>
                <h3 className="mt-1 text-lg font-extrabold text-slate-950">{course.title}</h3>
                <p className="text-sm text-slate-700">{course.level} · {course.duration} · {course.price}</p>
              </div>
              <a href="#courses" onClick={() => chooseProgram(course.category)} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-indigo-800">Xem khóa</a>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="who" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-5 pb-4 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-700">Who it is for</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Chọn chương trình theo độ tuổi</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">Năm nhóm đang mở, từ mầm non đến người đi làm. Chọn một nhóm để lọc đúng khóa học.</p>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {programs.map((program, index) => (
          <a key={program.menuLabel} href="#courses" onClick={() => chooseProgram(program.filter)} className="list-enter flex min-h-36 flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors duration-200 hover:border-indigo-400 hover:bg-indigo-50" style={{ animationDelay: `${index * 60}ms` }}>
            <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-700">{program.ages}</span>
            <span className="mt-2 text-base font-extrabold text-slate-950">{program.title}</span>
            <span className="mt-1 text-sm text-slate-700">{program.detail}</span>
            <span className="mt-3 text-xs font-semibold text-slate-600">{program.courses.join(' · ')}</span>
          </a>
        ))}
      </div>
    </section>

    <section id="courses" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-700">Your next chapter starts here</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[42px]">Chọn lộ trình của bạn</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-700">Chương trình cá nhân hóa theo độ tuổi, mục tiêu và nhịp độ riêng của từng học viên.</p>
        </div>
        <button type="button" onClick={() => setModal('register')} className="inline-flex min-h-11 items-center text-left text-sm font-bold text-indigo-700 transition-colors hover:text-indigo-900">Nhận tư vấn <ArrowRight aria-hidden="true" className="ml-1 inline" size={15}/></button>
      </div>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Lọc khóa học">
        {filters.map(item => <button type="button" key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-colors duration-200 ${filter === item ? 'bg-[#111b3c] text-white shadow-lg shadow-slate-900/15' : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-800'}`}>{item}</button>)}
      </div>
      <div key={filter} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCourses.map((course, i) => <article key={course.title} className={`list-enter group overflow-hidden rounded-[24px] border bg-white shadow-[0_8px_34px_rgba(28,44,91,.055)] transition-shadow duration-200 hover:shadow-[0_22px_55px_rgba(52,65,145,.13)] ${isOffer(course) ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200'}`} style={{ animationDelay: `${i * 60}ms` }}>
          <div className="relative h-52 overflow-hidden">
            <img src={image(course.image,750)} alt={`${course.title} - lớp học tiếng Anh`} className="h-full w-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent"/>
            <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-extrabold ${course.color}`}>{course.badge}</span>
            <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-amber-800"><Star aria-hidden="true" size={12} fill="currentColor" className="mr-1 inline"/>{course.rating}</span>
          </div>
          <div className="p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">{course.level}</p>
            <h3 className="mt-2 text-lg font-extrabold tracking-tight">{course.title}</h3>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-600"><span><Clock3 aria-hidden="true" className="mr-1 inline" size={14}/>{course.duration}</span><span><Users aria-hidden="true" className="mr-1 inline" size={14}/>8–12 học viên</span></div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm font-extrabold text-slate-900">{course.price}</span>
              <button type="button" onClick={() => setModal('register')} className="grid size-11 place-items-center rounded-full bg-indigo-50 text-indigo-700 transition-colors duration-200 group-hover:bg-indigo-700 group-hover:text-white" aria-label={`Đăng ký ngay khóa học ${course.title}`}><ArrowUpRight aria-hidden="true" size={17}/></button>
            </div>
          </div>
        </article>)}
      </div>
      <div className="mt-7 text-center"><button type="button" onClick={() => setFilter(filter === 'Tất cả' ? 'THCS & IELTS' : 'Tất cả')} className="rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-800">{filter === 'Tất cả' ? 'Khám phá khóa học IELTS' : 'Xem tất cả khóa học'} <ArrowRight aria-hidden="true" className="ml-1 inline" size={14}/></button></div>
    </section>

    <section className="px-5 pb-16 lg:px-8 lg:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-r from-[#181d4c] via-indigo-700 to-[#5b50e7] px-7 py-10 text-white shadow-2xl shadow-indigo-700/20 sm:px-12 sm:py-14">
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"><Zap aria-hidden="true" size={13} className="text-amber-300"/> 3 phút · 100% miễn phí</div>
            <h2 className="mt-4 max-w-xl text-3xl font-extrabold tracking-tight sm:text-[40px]">Tiếng Anh của bạn đang ở level nào?</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100">Làm bài kiểm tra vui nhộn để nhận ngay lộ trình học được thiết kế riêng cho bạn.</p>
            <button type="button" onClick={() => setModal('quiz')} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#D97706] px-6 py-3.5 text-sm font-extrabold text-slate-950 transition-colors duration-200 hover:bg-amber-500">Bắt đầu bài test <ArrowRight aria-hidden="true" className="ml-2 inline" size={16}/></button>
          </div>
          <div className="relative mx-auto grid size-40 place-items-center rounded-full border border-white/20 bg-white/10 sm:size-48">
            <div className="grid size-28 place-items-center rounded-full bg-[#D97706] text-slate-950 shadow-[0_0_40px_rgba(217,119,6,.35)] sm:size-36"><Sparkles aria-hidden="true" size={42}/></div>
            <span className="absolute -right-5 top-4 rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-indigo-800 shadow-lg">Let&apos;s go!</span>
            <span className="absolute -bottom-2 -left-4 rounded-xl bg-cyan-200 px-3 py-2 text-[11px] font-extrabold text-slate-950">3 min challenge</span>
          </div>
        </div>
      </div>
    </section>

    <section id="why" className="scroll-reveal scroll-mt-24 bg-[#f1f5f9] px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-700">The bright difference</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[42px]">Học khác biệt. Tiến bộ thật.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">Môi trường nơi mỗi cá tính được tỏa sáng và mỗi bước tiến đều được ghi nhận.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2">
          <div className="rounded-[26px] border border-white/10 bg-[#181d43] p-7 text-white md:col-span-2">
            <span className="grid size-11 place-items-center rounded-2xl bg-indigo-400/20 text-indigo-100"><Target aria-hidden="true"/></span>
            <h3 className="mt-6 text-xl font-extrabold">Blended learning — học theo cách của bạn</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">Kết hợp lớp học tương tác, nền tảng số và thực hành đời thực — để tiếng Anh luôn sống động.</p>
            <div className="mt-6 flex gap-2">{['Learn','Practice','Shine'].map((text, i) => <span key={text} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold"><span className="mr-1.5 text-cyan-200">0{i+1}</span>{text}</span>)}</div>
          </div>
          <div className="rounded-[26px] border border-indigo-100 bg-white p-7 md:col-span-2">
            <span className="grid size-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-800"><GraduationCap aria-hidden="true"/></span>
            <h3 className="mt-5 text-lg font-extrabold">100% giáo viên quốc tế</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">Đội ngũ CELTA / TESOL giàu kinh nghiệm, truyền cảm hứng trong từng giờ học.</p>
            <div className="mt-5 flex items-center gap-3"><div className="flex -space-x-2">{['photo-1500648767791-00dcc994a43e','photo-1534528741775-53994a69daeb','photo-1506794778202-cad84cf45f1d'].map(id => <img key={id} className="size-8 rounded-full border-2 border-white object-cover" src={image(id,100)} alt=""/>)}</div><span className="text-[11px] font-bold text-slate-600">Meet your new favorite teacher</span></div>
          </div>
          <div className="group relative min-h-[250px] overflow-hidden rounded-[26px] md:col-span-2">
            <img className="absolute inset-0 size-full object-cover" src={image('photo-1498243691581-b145c3f54a5a',900)} alt="Thư viện hiện đại tại Bright English"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111b3c]/90 via-[#111b3c]/15 to-transparent"/>
            <div className="absolute bottom-0 p-6 text-white"><span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold">OUR CAMPUS</span><h3 className="mt-3 text-xl font-extrabold">Không gian học tập chuẩn 5 sao</h3><p className="mt-1 text-xs text-white/90">Đến lớp là một trải nghiệm đáng mong chờ.</p></div>
          </div>
          <div className="rounded-[26px] border border-amber-200 bg-amber-50 p-7 md:col-span-2">
            <span className="grid size-11 place-items-center rounded-2xl bg-amber-200 text-amber-950"><MessageCircle aria-hidden="true"/></span>
            <h3 className="mt-5 text-lg font-extrabold">Luôn có Bright đồng hành</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">Cố vấn học tập sát cánh, hỗ trợ định hướng và kết nối cơ hội học tập, nghề nghiệp.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="stories" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-700">Real people. Real progress.</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[42px]">Bright stories, bright futures.</h2>
        </div>
        <div className="flex items-center gap-2 text-amber-600"><Star aria-hidden="true" fill="currentColor" size={18}/><span className="text-sm font-extrabold text-slate-800">4.9/5</span><span className="text-xs text-slate-600">từ 2.400+ đánh giá</span></div>
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {[{name:'Minh Anh', school:'THPT chuyên Hà Nội – Amsterdam', score:'IELTS 8.0', image:'photo-1534528741775-53994a69daeb', quote:'Từ một cô bé sợ nói tiếng Anh, giờ mình tự tin thuyết trình và đạt IELTS 8.0. Thầy cô ở Bright luôn khiến mình muốn thử thêm một chút nữa.'},{name:'Hoàng Nam', school:'THCS Cầu Giấy', score:'IELTS 7.5', image:'photo-1500648767791-00dcc994a43e', quote:'Các hoạt động ở lớp thú vị hơn mình tưởng rất nhiều. Mỗi buổi học đều có điều mới và mình cảm nhận rõ là mình tiến bộ.'},{name:'Bảo Ngọc', school:'Học bổng 100% — Monash University', score:'Scholarship winner', image:'photo-1531123897727-8f129e1688ce', quote:'Bright giúp mình xây nền tảng tiếng Anh, nhưng quan trọng hơn là sự tự tin để kể câu chuyện của riêng mình.'}].map((student) => <article key={student.name} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_34px_rgba(28,44,91,.05)]">
          <div className="flex items-center justify-between"><span className="flex gap-0.5 text-amber-500">{[1,2,3,4,5].map(i => <Star key={i} aria-hidden="true" size={13} fill="currentColor"/>)}</span><Quote aria-hidden="true" size={21} className="text-indigo-200"/></div>
          <p className="mt-4 text-sm leading-6 text-slate-700">&ldquo;{student.quote}&rdquo;</p>
          <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5"><img src={image(student.image,120)} alt="" className="size-11 rounded-full object-cover"/><div className="min-w-0"><h3 className="text-sm font-extrabold">{student.name}</h3><p className="truncate text-[10px] text-slate-600">{student.school}</p></div><span className="ml-auto shrink-0 rounded-full bg-indigo-50 px-2.5 py-1.5 text-[10px] font-extrabold text-indigo-800">{student.score}</span></div>
        </article>)}
      </div>
    </section>

    <section id="start" className="scroll-reveal scroll-mt-24 px-5 pb-16 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-700">How to start</p>
        <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">Ba bước để bắt đầu</h2>
        <ol className="mt-8 grid gap-4 lg:grid-cols-3">
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-extrabold text-indigo-700">Bước 1</p>
            <h3 className="mt-2 text-lg font-extrabold">Chọn chương trình</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">Mầm non, tiểu học, THCS và IELTS, hoặc giao tiếp cho người đi làm.</p>
            <a href="#courses" className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-indigo-800">Xem khóa học <ArrowRight aria-hidden="true" className="ml-1" size={15}/></a>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-extrabold text-indigo-700">Bước 2</p>
            <h3 className="mt-2 text-lg font-extrabold">Làm bài test 3 phút</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">Bài kiểm tra miễn phí để nhận lộ trình học được thiết kế riêng.</p>
            <button type="button" onClick={() => setModal('quiz')} className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-indigo-800">Bắt đầu bài test <ArrowRight aria-hidden="true" className="ml-1" size={15}/></button>
          </li>
          <li className="rounded-2xl border border-amber-300 bg-amber-50 p-5">
            <p className="text-xs font-extrabold text-amber-950">Bước 3</p>
            <h3 className="mt-2 text-lg font-extrabold">Đăng ký tư vấn</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">Gửi form, tư vấn viên sẽ liên hệ trong 15 phút. Hoặc gọi hotline và gửi email.</p>
            <button type="button" onClick={() => setModal('register')} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#D97706] px-4 text-sm font-bold text-slate-950 transition-colors duration-200 hover:bg-amber-500">Đăng ký tư vấn miễn phí</button>
          </li>
        </ol>
        <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <a href="tel:19006868" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-slate-900"><Phone aria-hidden="true" size={16} className="text-indigo-700"/> 1900 6868</a>
          <a href="mailto:hello@brightenglish.vn" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-slate-900"><Mail aria-hidden="true" size={16} className="text-indigo-700"/> hello@brightenglish.vn</a>
          {branches.map((branch) => <p key={branch} className="flex min-h-11 items-start gap-2 text-sm text-slate-700"><MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-indigo-700"/>{branch}</p>)}
        </div>
      </div>
    </section>

    <section id="campus" className="scroll-reveal scroll-mt-24 bg-[#f1f5f9] px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-700">A place to belong</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[38px]">A little peek inside Bright.</h2>
          </div>
          <a href="#start" className="inline-flex min-h-11 items-center text-sm font-bold text-indigo-800">Ghé thăm cơ sở <ArrowRight aria-hidden="true" className="ml-1 inline" size={15}/></a>
        </div>
        <div className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[225px] sm:grid-cols-4">
          {photos.map(([id, alt], i) => <div key={id} className={`relative overflow-hidden rounded-3xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}><img className="size-full object-cover" src={image(id,800)} alt={alt}/><div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"/><span className="absolute bottom-4 left-4 text-sm font-bold text-white">{alt}</span></div>)}
        </div>
      </div>
    </section>

    <footer id="contact" className="bg-[#111a39] px-5 pb-7 pt-14 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_.7fr_.8fr_1.2fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5"><span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400"><Sparkles aria-hidden="true" size={20}/></span><span className="text-lg font-extrabold">Bright <span className="text-cyan-200">English</span></span></a>
            <p className="mt-4 max-w-xs text-xs leading-6 text-slate-300">Cùng thế hệ trẻ Việt Nam tự tin kết nối và chinh phục thế giới bằng tiếng Anh.</p>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">Khám phá</h3>
            <div className="mt-4 grid gap-3 text-xs text-slate-300"><a className="hover:text-white" href="#offers">Ưu đãi tháng này</a><a className="hover:text-white" href="#courses">Các khóa học</a><a className="hover:text-white" href="#who">Chương trình theo độ tuổi</a><a className="hover:text-white" href="#why">Phương pháp Bright</a><a className="hover:text-white" href="#stories">Câu chuyện học viên</a><a className="hover:text-white" href="#start">Cách bắt đầu</a></div>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">Liên hệ</h3>
            <div className="mt-4 grid gap-3 text-xs leading-5 text-slate-300">
              {branches.map((branch) => <span key={branch} className="flex gap-2"><MapPin aria-hidden="true" size={14} className="mt-0.5 shrink-0"/>{branch}</span>)}
              <a className="inline-flex items-center gap-2 hover:text-white" href="tel:19006868"><Phone aria-hidden="true" size={14}/> 1900 6868</a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="mailto:hello@brightenglish.vn"><Mail aria-hidden="true" size={14}/> hello@brightenglish.vn</a>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">Nhận tin từ Bright</h3>
            <p className="mt-3 text-xs leading-5 text-slate-300">Ưu đãi học tập và bí kíp tiếng Anh — gửi gọn vào inbox bạn.</p>
            {newsletter ? <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-300"><Check aria-hidden="true" size={17}/> Đăng ký thành công. Hẹn gặp bạn!</p> : <form onSubmit={(e) => { e.preventDefault(); setNewsletter(true) }} className="mt-4 flex rounded-full border border-white/15 bg-white/5 p-1"><label htmlFor="newsletter-email" className="sr-only">Email của bạn</label><input id="newsletter-email" required type="email" placeholder="Email của bạn" className="min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-slate-400"/><button aria-label="Đăng ký nhận tin" className="grid size-11 shrink-0 place-items-center rounded-full bg-indigo-500 text-white transition-colors hover:bg-indigo-400"><ArrowRight aria-hidden="true" size={16}/></button></form>}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-5 text-[10px] text-slate-400 sm:flex-row"><span>© 2025 Bright English Center. Học vui, tiến bộ thật.</span><span>Designed to help every learner shine</span></div>
      </div>
    </footer>

    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[0.88fr_1.12fr] gap-2 border-t border-slate-200 bg-white/95 px-3 pt-2 backdrop-blur-xl md:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <a href="tel:19006868" className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-2 text-slate-800">
        <Phone aria-hidden="true" size={17} className="shrink-0 text-indigo-700"/>
        <span className="text-center text-[11px] font-bold leading-tight sm:text-xs">Gọi hotline<span className="mt-0.5 block text-[10px] font-medium text-slate-600">1900 6868</span></span>
      </a>
      <button type="button" onClick={() => setModal('register')} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D97706] px-3 text-xs font-bold text-slate-950 sm:text-sm">Đăng ký tư vấn <ArrowRight aria-hidden="true" size={15}/></button>
    </div>

    {modal === 'register' && <RegistrationModal onClose={() => setModal(null)} />}
    {modal === 'quiz' && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm" onClick={(event) => { if (event.target === event.currentTarget) setModal(null) }}><div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl sm:p-9"><button type="button" onClick={() => setModal(null)} aria-label="Đóng" className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200"><X aria-hidden="true" size={17}/></button><QuizModal onClose={() => setModal(null)}/></div></div>}
  </main>
}

function QuizModal({ onClose }: { onClose: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null)
  const [step, setStep] = useState(0)
  const questions = [{ question: 'Choose the correct sentence:', options: ['She go to school every day.', 'She goes to school every day.', 'She going to school every day.'], correct: 1 }, { question: 'What does “brilliant” mean?', options: ['Very clever or impressive', 'A little bit tired', 'Extremely hungry'], correct: 0 }, { question: 'Complete: “If I ___ more time, I would travel.”', options: ['have', 'had', 'will have'], correct: 1 }]
  const done = step >= questions.length
  return <><span className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-800"><Zap aria-hidden="true"/></span><p className="mt-5 text-[10px] font-extrabold uppercase tracking-[.2em] text-indigo-700">Bright mini challenge · {done ? 'Done!' : `${step + 1} / ${questions.length}`}</p><h2 id="modal-title" className="mt-2 text-2xl font-extrabold">{done ? 'You did it!' : questions[step].question}</h2>{done ? <><p className="mt-3 text-sm leading-6 text-slate-600">Bạn đã hoàn thành thử thách! Hãy để Bright tư vấn lộ trình phù hợp với mình nhé.</p><button type="button" onClick={onClose} className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white">Tuyệt vời!</button></> : <><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-500 transition-all" style={{width: `${(step / questions.length) * 100}%`}}/></div><div className="mt-5 grid gap-2.5">{questions[step].options.map((option) => <button type="button" key={option} onClick={() => setAnswer(option)} className={`rounded-xl border p-3.5 text-left text-sm font-semibold transition-colors ${answer === option ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'}`}>{option}</button>)}</div><button type="button" disabled={!answer} onClick={() => { setStep(step + 1); setAnswer(null) }} className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40">{step === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} <ArrowRight aria-hidden="true" className="ml-2 inline" size={15}/></button></>}</>
}
