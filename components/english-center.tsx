'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Percent,
  Phone,
  Play,
  Quote,
  Sparkles,
  Star,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { RegistrationModal } from '@/components/registration-modal'
import { QuizModal } from '@/components/quiz-modal'

type Course = {
  title: string
  level: string
  category: 'Mầm non' | 'Tiểu học' | 'THCS & IELTS' | 'Người đi làm'
  image: string
  badge: string
  rating: string
  duration: string
  price: string
  originalPrice?: string
  color: string
  description: string
  targetAge: string
}

const COURSES: Course[] = [
  {
    title: 'English Explorers',
    level: 'Mầm non · 4–6 tuổi',
    category: 'Mầm non',
    image: 'photo-1587654780291-39c9404d746b',
    badge: 'Bé yêu thích',
    rating: '4.9',
    duration: '8 tháng (2 buổi/tuần)',
    price: 'Từ 1.590.000đ/tháng',
    color: 'bg-amber-100 text-amber-900 border-amber-200',
    description: 'Học tiếng Anh qua bài hát, trò chơi vận động và kể chuyện tương tác, giúp bé phản xạ tự nhiên như tiếng mẹ đẻ.',
    targetAge: '4–6 tuổi',
  },
  {
    title: 'Bright Stars',
    level: 'Tiểu học · 6–11 tuổi',
    category: 'Tiểu học',
    image: 'photo-1509062522246-3755977927d7',
    badge: 'Hot trend',
    rating: '5.0',
    duration: '10 tháng (2 buổi/tuần)',
    price: 'Từ 1.790.000đ/tháng',
    color: 'bg-rose-100 text-rose-900 border-rose-200',
    description: 'Xây dựng nền tảng ngữ pháp vững chắc kết hợp 4 kỹ năng Nghe - Nói - Đọc - Viết, tự tin dẫn đầu trên lớp.',
    targetAge: '6–11 tuổi',
  },
  {
    title: 'Cambridge Champions',
    level: 'Starters · Movers · Flyers',
    category: 'Tiểu học',
    image: 'photo-1503676260728-1c00da094a0b',
    badge: 'Ưu đãi tháng này',
    rating: '4.9',
    duration: '8 tháng (2 buổi/tuần)',
    price: 'Từ 1.690.000đ/tháng',
    originalPrice: '2.190.000đ/tháng',
    color: 'bg-amber-200 text-amber-950 border-amber-300',
    description: 'Luyện thi chứng chỉ quốc tế Cambridge chuẩn chuẩn hóa, cam kết 13–15 khiên tối đa cho từng cấp độ.',
    targetAge: '7–12 tuổi',
  },
  {
    title: 'IELTS Breakthrough',
    level: 'IELTS Foundation · 12–17 tuổi',
    category: 'THCS & IELTS',
    image: 'photo-1523240795612-9a054b0db644',
    badge: 'Cam kết đầu ra',
    rating: '4.9',
    duration: '6 tháng (3 buổi/tuần)',
    price: 'Từ 2.490.000đ/tháng',
    color: 'bg-violet-100 text-violet-900 border-violet-200',
    description: 'Xây nền tảng tư duy học thuật, chiến lược giải đề thực chiến và bứt phá band điểm từ 5.0 lên 6.5+.',
    targetAge: '12–17 tuổi',
  },
  {
    title: 'IELTS Mastery 7.0+',
    level: 'IELTS Advanced · 15+ tuổi',
    category: 'THCS & IELTS',
    image: 'photo-1434030216411-0b793f4b4173',
    badge: 'Giảm 35%',
    rating: '5.0',
    duration: '5 tháng (3 buổi/tuần)',
    price: 'Từ 2.990.000đ/tháng',
    originalPrice: '4.600.000đ/tháng',
    color: 'bg-amber-200 text-amber-950 border-amber-300',
    description: 'Chinh phục band điểm 7.0–8.0+ cùng cựu giám khảo chấm thi. Hỗ trợ săn học bổng du học và xét tuyển đại học top đầu.',
    targetAge: '15+ tuổi',
  },
  {
    title: 'Speak with Confidence',
    level: 'Giao tiếp · Người đi làm',
    category: 'Người đi làm',
    image: 'photo-1521737711867-e3b97375f902',
    badge: 'Lịch linh hoạt',
    rating: '4.8',
    duration: '4 tháng (2 buổi/tuần)',
    price: 'Từ 1.990.000đ/tháng',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    description: 'Luyện phản xạ nói trôi chảy, viết email công sở, thuyết trình tiếng Anh và tự tin trao đổi trong môi trường đa quốc gia.',
    targetAge: 'Người đi làm & SV',
  },
]

const AGE_PROGRAMS = [
  {
    id: 'kids',
    title: 'Mầm non',
    ages: '4–6 tuổi',
    detail: 'Khám phá đầu đời & phản xạ tự nhiên',
    filter: 'Mầm non' as const,
    image: 'photo-1587654780291-39c9404d746b',
    coursesCount: '1 khóa chuyên sâu',
  },
  {
    id: 'primary',
    title: 'Tiểu học',
    ages: '6–11 tuổi',
    detail: 'Giao tiếp tự tin & chứng chỉ Cambridge',
    filter: 'Tiểu học' as const,
    image: 'photo-1503676260728-1c00da094a0b',
    coursesCount: '2 khóa học',
  },
  {
    id: 'secondary',
    title: 'THCS',
    ages: '12–15 tuổi',
    detail: 'Vững vàng học thuật & nền tảng IELTS',
    filter: 'THCS & IELTS' as const,
    image: 'photo-1523240795612-9a054b0db644',
    coursesCount: '2 lộ trình',
  },
  {
    id: 'ielts',
    title: 'THPT & IELTS',
    ages: '15+ tuổi',
    detail: 'Bứt phá 7.0+ & xét tuyển đại học',
    filter: 'THCS & IELTS' as const,
    image: 'photo-1434030216411-0b793f4b4173',
    coursesCount: '2 lộ trình',
  },
  {
    id: 'adults',
    title: 'Người đi làm',
    ages: 'Sinh viên & Đi làm',
    detail: 'English at Work & đàm phán quốc tế',
    filter: 'Người đi làm' as const,
    image: 'photo-1522202176988-66273c2fd55f',
    coursesCount: '1 khóa chuyên sâu',
  },
]

const TEACHERS = [
  {
    name: 'Thầy Mark Wilson',
    role: 'Giám đốc Học thuật · Anh Quốc',
    creds: 'Thạc sĩ TESOL · CELTA Cambridge',
    image: 'photo-1560250097-0b93528c311a',
    experience: '11 năm giảng dạy quốc tế',
    quote: 'Tiếng Anh là chiếc cầu nối mở ra cánh cửa tri thức thế giới, chứ không đơn thuần là một bài kiểm tra trên giấy.',
    badge: 'Cựu giám khảo khảo thí',
  },
  {
    name: 'Cô Sarah Jenkins',
    role: 'Chuyên gia Mầm non & Tiểu học · Canada',
    creds: 'B.Ed Primary Education · TEYL Certified',
    image: 'photo-1573496359142-b8d87734a5a2',
    experience: '8 năm đào tạo trẻ em',
    quote: 'Mỗi đứa trẻ đều có nhịp học riêng. Khi việc học tràn ngập niềm vui, sự tiến bộ sẽ đến một cách diệu kỳ.',
    badge: 'Bé yêu thích nhất',
  },
  {
    name: 'Thầy Alex Miller',
    role: 'Chuyên gia Luyện thi IELTS 8.5+ · Úc',
    creds: 'IELTS 9.0 Overall · CELTA Cambridge',
    image: 'photo-1539571696357-5a69c17a67c6',
    experience: '9 năm chuyên luyện thi 7.0+',
    quote: 'Tư duy logic và phản xạ ngôn ngữ tự nhiên quan trọng hơn việc học vẹt từ vựng hay các mẹo làm bài rập khuôn.',
    badge: 'Đào tạo 500+ học viên 7.0+',
  },
  {
    name: 'Cô Emma Watson',
    role: 'Cố vấn Phát âm & Thuyết trình · Mỹ',
    creds: 'MA Applied Linguistics · Pronunciation Coach',
    image: 'photo-1580894732486-1e62688005ec',
    experience: '7 năm đào tạo giao tiếp',
    quote: 'Sự tự tin cất lời chính là vũ khí quyền lực nhất để bạn bước vào bất cứ môi trường đa quốc gia nào.',
    badge: 'Huấn luyện viên Accent',
  },
]

const CAMPUS_PHOTOS = [
  {
    id: 'photo-1509062522246-3755977927d7',
    alt: 'Phòng học tương tác thông minh tại Bright English',
    caption: 'Phòng học tương tác thông minh',
    sub: 'Trang bị bảng tương tác & thiết bị học chuẩn Cambridge',
  },
  {
    id: 'photo-1498243691581-b145c3f54a5a',
    alt: 'Thư viện mở chuẩn quốc tế tại Bright English',
    caption: 'Thư viện sách tiếng Anh chuẩn quốc tế',
    sub: 'Hơn 3.000 đầu sách phân cấp theo CEFR và độ tuổi',
  },
  {
    id: 'photo-1523240795612-9a054b0db644',
    alt: 'Khu tự học và thảo luận nhóm sôi nổi tại Bright',
    caption: 'Không gian thảo luận nhóm & CLB',
    sub: 'Môi trường 100% tiếng Anh rèn luyện phản xạ mỗi ngày',
  },
  {
    id: 'photo-1580582932707-520aed937b7b',
    alt: 'Khu vui chơi trải nghiệm sáng tạo cho học viên nhí',
    caption: 'Khu sáng tạo & trải nghiệm học viên',
    sub: 'Vui học khoa học, kịch nghệ và thuyết trình tiếng Anh',
  },
]

const FAQS = [
  {
    q: 'Học viên có được học thử trước khi quyết định đóng học phí không?',
    a: 'Hoàn toàn có! Bright tặng mỗi học viên 01 buổi trải nghiệm lớp học thực tế hoàn toàn miễn phí và bài kiểm tra trình độ 1-kèm-1 cùng giáo viên quốc tế để tư vấn đúng năng lực và lộ trình.',
  },
  {
    q: 'Sĩ số tối đa trong mỗi lớp học tại Bright là bao nhiêu bạn?',
    a: 'Để đảm bảo giáo viên quốc tế có thể tương tác trực tiếp, chỉnh sửa phát âm và theo sát từng học viên, mỗi lớp chỉ duy trì từ 8 đến tối đa 12 học viên, luôn có 01 giáo viên bản ngữ và 01 trợ giảng chuyên môn.',
  },
  {
    q: 'Trung tâm có cam kết chuẩn đầu ra bằng văn bản không?',
    a: 'Có. Đối với các khóa học Cambridge (Starters, Movers, Flyers) và IELTS, Bright ký cam kết chuẩn đầu ra bằng hợp đồng đào tạo. Trường hợp học viên tham gia đầy đủ buổi học nhưng chưa đạt mục tiêu sẽ được học lại hoàn toàn miễn phí.',
  },
  {
    q: 'Nếu học viên bận việc đột xuất hoặc ốm phải nghỉ học thì xử lý thế nào?',
    a: 'Bright có chính sách học bù linh hoạt: học viên có thể học bù tại các lớp tương đương trong tuần hoặc được trợ giảng bổ trợ 1-1 kiến thức bài nghỉ. Ngoài ra, trung tâm hỗ trợ bảo lưu học phí đến 6 tháng.',
  },
  {
    q: 'Chính sách học phí tại Bright có trả góp 0% hoặc ưu đãi gia đình không?',
    a: 'Bright hỗ trợ trả góp học phí 0% lãi suất linh hoạt qua thẻ tín dụng từ 3–12 tháng. Khi đăng ký cho anh chị em trong gia đình hoặc nhóm từ 2 học viên, bạn nhận thêm ưu đãi giảm 10% tổng học phí.',
  },
]

const BRANCHES = [
  {
    name: 'Cơ sở 1: Gò Vấp, TP.HCM',
    address: '12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí Minh',
    mapLink: 'https://maps.google.com/?q=12+Nguyen+Van+Bao+Go+Vap+Ho+Chi+Minh',
  },
  {
    name: 'Cơ sở 2: Cầu Giấy, Hà Nội',
    address: '28 Trần Thái Tông, Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội',
    mapLink: 'https://maps.google.com/?q=28+Tran+Thai+Tong+Cau+Giay+Ha+Noi',
  },
]

function image(id: string, width = 800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
}

/**
 * Stat Counter: SSR displays the real target number immediately!
 * After mounting, if not prefers-reduced-motion, it counts up smoothly.
 */
function Stat({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const [n, setN] = useState(to)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to)
      return
    }
    setN(0)
    const start = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [to])

  return (
    <div className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
      <p className="text-2xl sm:text-3xl font-black tabular-nums tracking-tight text-[#0A192F]">
        {n.toLocaleString('vi-VN')}{suffix}
      </p>
      <p className="text-sm font-bold text-slate-700 mt-1">{label}</p>
    </div>
  )
}

export function EnglishCenter() {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả')
  const [modal, setModal] = useState<'register' | 'quiz' | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedNote, setSelectedNote] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [scrolled, setScrolled] = useState(false)
  
  // Newsletter state with Vietnamese validation
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterError, setNewsletterError] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  // Track header scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock scroll on mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Scroll reveal setup
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.scroll-reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      sections.forEach((sec) => sec.classList.add('is-visible'))
      return
    }

    document.documentElement.classList.add('scroll-reveal-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('scroll-reveal-ready')
    }
  }, [])

  const filterCategories = ['Tất cả', 'Mầm non', 'Tiểu học', 'THCS & IELTS', 'Người đi làm']

  const visibleCourses = useMemo(() => {
    if (activeCategory === 'Tất cả') return COURSES
    return COURSES.filter((c) => c.category === activeCategory)
  }, [activeCategory])

  const openRegister = (courseName?: string, customNote?: string) => {
    setSelectedCourse(courseName || '')
    setSelectedNote(customNote || '')
    setModal('register')
  }

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!newsletterEmail.trim()) {
      setNewsletterError('Vui lòng nhập địa chỉ email của bạn.')
      return
    }
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Địa chỉ email chưa hợp lệ (ví dụ: name@gmail.com).')
      return
    }
    setNewsletterError('')
    setNewsletterSuccess(true)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Announcement Bar - Promos & Direct Hotline */}
      <div className="bg-slate-900 text-slate-100 border-b border-slate-800 text-sm">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-300 ring-1 ring-inset ring-amber-400/30 shrink-0">
              <Percent size={12} className="text-amber-300" />
              Ưu đãi tháng này
            </span>
            <span className="truncate text-slate-200 text-sm font-medium">
              Giảm đến <strong className="text-white font-extrabold">35% học phí</strong> IELTS & Cambridge
            </span>
            <a
              href="#offers"
              className="inline-flex items-center font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 underline-offset-2 shrink-0 ml-1 text-sm"
            >
              Nhận ngay →
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm shrink-0 text-slate-200 font-medium">
            <a
              href="tel:19006868"
              className="min-h-[36px] flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1"
            >
              <Phone aria-hidden="true" size={13} className="text-amber-400" />
              Hotline: <strong className="text-white font-extrabold">1900 6868</strong>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">8:00 - 21:30 (T2–CN)</span>
          </div>
        </div>
      </div>

      {/* Streamlined Sticky Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'border-slate-200 shadow-md py-2.5' : 'border-slate-100 py-3'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with clear typography */}
          <a href="#home" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg min-h-[44px] shrink-0" aria-label="Bright English trang chủ">
            <div className="size-11 rounded-xl bg-gradient-to-br from-[#0A192F] via-[#163265] to-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-indigo-900/15 group-hover:scale-105 transition-transform duration-200 border border-white/10 shrink-0">
              <Sparkles aria-hidden="true" size={21} className="text-amber-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0A192F] leading-none">BRIGHT</span>
                <span className="text-indigo-600 font-extrabold text-base sm:text-lg leading-none">ENGLISH</span>
              </div>
              <span className="text-xs font-bold tracking-[0.14em] text-slate-500 uppercase mt-0.5 leading-none">ACADEMY &amp; CAMBRIDGE</span>
            </div>
          </a>

          {/* Navigation - Clear readable 14px-15px font */}
          <nav className="hidden items-center gap-6 xl:gap-8 text-sm xl:text-[15px] font-bold text-slate-700 lg:flex shrink-0" aria-label="Điều hướng chính">
            <a className="min-h-[44px] flex items-center px-1 transition-colors hover:text-indigo-600 whitespace-nowrap" href="#courses">
              Khóa học
            </a>
            <a className="min-h-[44px] flex items-center px-1 transition-colors hover:text-indigo-600 whitespace-nowrap" href="#who">
              Độ tuổi
            </a>
            <a className="min-h-[44px] flex items-center px-1 transition-colors hover:text-indigo-600 whitespace-nowrap" href="#teachers">
              Giáo viên
            </a>
            <a className="min-h-[44px] flex items-center px-1 transition-colors hover:text-indigo-600 whitespace-nowrap" href="#schedule">
              Lịch học
            </a>
            <a className="min-h-[44px] flex items-center px-1 transition-colors hover:text-indigo-600 whitespace-nowrap" href="#why">
              Về Bright
            </a>
            <a className="min-h-[44px] flex items-center px-1 transition-colors hover:text-indigo-600 whitespace-nowrap" href="#faq">
              FAQ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <button
              type="button"
              onClick={() => setModal('quiz')}
              className="h-11 px-4 text-sm font-bold text-slate-700 hover:text-indigo-700 hover:bg-slate-50 rounded-xl transition-colors inline-flex items-center gap-1.5 border border-transparent hover:border-slate-200 cursor-pointer"
            >
              <Zap aria-hidden="true" size={15} className="text-amber-500" />
              <span>Test 3 phút</span>
            </button>
            <button
              type="button"
              onClick={() => openRegister()}
              className="h-11 inline-flex items-center gap-1.5 px-5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Đăng ký tư vấn</span>
              <ArrowRight aria-hidden="true" size={15} />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => openRegister()}
              className="h-11 px-3.5 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Tư vấn</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="size-11 min-h-[44px] min-w-[44px] rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="fixed inset-0 z-50 flex flex-col bg-white px-5 py-5 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/25">
                  <Sparkles aria-hidden="true" size={19} />
                </span>
                <span className="text-lg font-extrabold tracking-tight">
                  Bright <span className="text-indigo-600">English</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                aria-label="Đóng menu"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 py-4 border-b border-slate-100">
              {[
                ['Ưu đãi tháng này (Giảm 35%)', '#offers'],
                ['Danh sách khóa học', '#courses'],
                ['Chương trình theo độ tuổi', '#who'],
                ['Đội ngũ giáo viên', '#teachers'],
                ['Lịch ca học linh hoạt', '#schedule'],
                ['Tại sao chọn Bright English', '#why'],
                ['Câu chuyện học viên', '#stories'],
                ['Hỏi đáp thường gặp', '#faq'],
                ['Hệ thống cơ sở', '#campus'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-5 grid gap-3 pb-8">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  setModal('quiz')
                }}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 text-sm font-bold text-amber-900"
              >
                <Zap aria-hidden="true" size={16} className="text-amber-600" />
                Kiểm tra trình độ 3 phút miễn phí
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  openRegister()
                }}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D97706] px-4 text-sm sm:text-base font-bold text-slate-950 shadow-lg shadow-amber-800/15"
              >
                Đăng ký tư vấn & học thử <ArrowRight aria-hidden="true" size={16} />
              </button>
              <a
                href="tel:19006868"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700"
              >
                <Phone aria-hidden="true" size={16} className="text-indigo-600" />
                Hotline tư vấn: 1900 6868
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content (Notice: NO overflow-hidden on main!) */}
      <main className="pb-28 md:pb-0">
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative scroll-mt-24 overflow-hidden bg-[radial-gradient(ellipse_at_78%_5%,rgba(99,102,241,.16),transparent_38%),linear-gradient(135deg,#f8fafc_8%,#eef2ff_52%,#f8fafc_100%)]"
        >
          <div className="pointer-events-none absolute -left-16 top-10 size-72 rounded-full bg-indigo-300/30 blur-3xl mesh-orb" />
          <div className="pointer-events-none absolute right-[-4rem] top-24 size-80 rounded-full bg-cyan-300/25 blur-3xl mesh-orb [animation-delay:-5s]" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-12 lg:px-8 lg:pt-16">
            <div className="relative z-10 min-w-0">
              <div className="hero-rise mb-4 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs sm:text-sm">
                <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 sm:text-sm">Tuyển Sinh 2026 - 2027</span>
                <span className="text-slate-300" aria-hidden="true">|</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:text-sm">
                  <Sparkles aria-hidden="true" size={14} className="text-amber-500" />
                  Chuẩn Quốc Tế Cambridge &amp; IELTS
                </span>
              </div>
              
              {/* H1 with generous readable sizing */}
              <h1 className="hero-rise max-w-2xl text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0A192F] sm:text-5xl lg:text-[58px]" style={{ animationDelay: '80ms' }}>
                Bứt phá tiếng Anh,<br />
                chinh phục{' '}
                <span className="whitespace-nowrap bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  tương lai
                </span>{' '}
                toàn cầu.
              </h1>
              
              <p className="hero-rise mt-4 max-w-xl text-base font-normal leading-relaxed text-slate-700 sm:text-lg lg:text-xl" style={{ animationDelay: '160ms' }}>
                Mỗi buổi học là một hành trình vui khám phá. Cùng 100% giáo viên quốc tế và phương pháp học qua trải nghiệm, con tự tin làm chủ tiếng Anh mỗi ngày.
              </p>

              <div className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ animationDelay: '240ms' }}>
                <button
                  type="button"
                  onClick={() => openRegister()}
                  className="inline-flex h-12 min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 text-base font-bold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700"
                >
                  Đăng ký học thử <ArrowRight aria-hidden="true" size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setModal('quiz')}
                  className="inline-flex h-12 min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-base font-bold text-slate-800 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-600 hover:shadow"
                >
                  <Zap aria-hidden="true" size={17} className="text-amber-500" />
                  Test miễn phí · 3 phút
                </button>
                <a
                  href="#courses"
                  className="inline-flex h-12 min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-base font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <Play aria-hidden="true" className="fill-slate-700 text-slate-700" size={14} />
                  Khám phá khóa học
                </a>
              </div>

              {/* Social proof avatar stack */}
              <div className="hero-rise mt-8 flex items-center gap-3.5" style={{ animationDelay: '320ms' }}>
                <div className="flex -space-x-3">
                  {[
                    { id: 'photo-1534528741775-53994a69daeb', alt: 'Học viên Minh Anh - IELTS 8.0' },
                    { id: 'photo-1500648767791-00dcc994a43e', alt: 'Học viên Hoàng Nam - IELTS 7.5' },
                    { id: 'photo-1531123897727-8f129e1688ce', alt: 'Học viên Bảo Ngọc - Học bổng Monash' },
                    { id: 'photo-1506794778202-cad84cf45f1d', alt: 'Học viên Tuấn Kiệt - Cambridge Starters 15 khiên' },
                  ].map((item) => (
                    <img
                      key={item.id}
                      className="size-11 rounded-full border-[3px] border-white object-cover shadow-sm"
                      src={image(item.id, 120)}
                      alt={item.alt}
                      width={44}
                      height={44}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} aria-hidden="true" size={15} fill="currentColor" />
                    ))}
                    <span className="ml-1 text-base font-extrabold text-[#0A192F]">4.9/5</span>
                  </div>
                  <p className="mt-0.5 text-sm sm:text-base text-slate-600">Được tin yêu bởi 15.000+ gia đình phụ huynh</p>
                </div>
              </div>
            </div>

            {/* Hero collage. Stats sit in the grid on small screens and overlay the frame from sm up. */}
            <div className="relative mx-auto w-full max-w-[540px] pt-2 lg:max-w-none">
              <div className="pointer-events-none absolute -left-6 bottom-16 size-40 rounded-full bg-violet-300/40 blur-3xl mesh-orb [animation-delay:-2s]" />
              <div className="relative grid h-[360px] grid-cols-[1.08fr_.92fr] grid-rows-[1.12fr_.88fr] gap-3 sm:h-[440px] md:h-[500px]">
                <div className="relative row-span-2 overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/15">
                  <img
                    className="media-pan h-full w-full object-cover"
                    src={image('photo-1503454537195-1dcabb73ffb9', 900)}
                    alt="Học viên vui vẻ khám phá tiếng Anh"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-sm font-bold uppercase tracking-wider text-cyan-200">Learn with joy</p>
                    <p className="mt-1 text-xl font-extrabold sm:text-2xl">Học vui mỗi ngày</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/10">
                  <img
                    className="media-pan h-full w-full object-cover [animation-delay:-6s]"
                    src={image('photo-1523240795612-9a054b0db644', 700)}
                    alt="Nhóm học viên hào hứng trao đổi bài tập"
                    loading="lazy"
                  />
                </div>

                <div className="relative overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/10">
                  <img
                    className="media-pan h-full w-full object-cover [animation-delay:-11s]"
                    src={image('photo-1509062522246-3755977927d7', 700)}
                    alt="Phòng học tương tác thông minh tại Bright"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:pointer-events-none sm:absolute sm:inset-0 sm:mt-0 sm:block">
                <div className="sm:pointer-events-auto sm:absolute sm:left-3 sm:top-6 sm:w-44">
                  <Stat to={98} suffix="%" label="Đạt mục tiêu học tập" />
                </div>
                <div className="sm:pointer-events-auto sm:absolute sm:bottom-6 sm:right-3 sm:w-44">
                  <Stat to={15000} suffix="+" label="Học viên tỏa sáng" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFERS SECTION */}
        <section id="offers" className="scroll-reveal scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[28px] border border-amber-300 bg-white p-6 shadow-[0_18px_50px_rgba(217,119,6,0.12)] sm:p-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                <Percent aria-hidden="true" size={14} className="text-amber-700" /> Ưu đãi tuyển sinh tháng này
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                Học phí giảm đến 35%
              </h2>
              <p className="mt-2.5 max-w-md text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Ưu đãi áp dụng có giới hạn cho các khóa IELTS và Cambridge trong tuần này. Tặng kèm 01 buổi kiểm tra trình độ 1-kèm-1 và giáo trình độc quyền.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openRegister('IELTS Mastery 7.0+', 'Đăng ký nhận ưu đãi giảm 35%')}
                  className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/20 transition-all duration-200 cursor-pointer"
                >
                  Đăng ký giữ ưu đãi <ArrowRight aria-hidden="true" size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setModal('quiz')}
                  className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl text-sm sm:text-base font-bold text-slate-800 bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 shadow-xs transition-all duration-200 cursor-pointer"
                >
                  <Zap aria-hidden="true" size={16} className="text-amber-500" />
                  Test miễn phí · 3 phút
                </button>
              </div>
            </div>

            <div className="grid gap-3.5">
              {[
                COURSES.find((c) => c.badge === 'Giảm 35%')!,
                COURSES.find((c) => c.badge === 'Ưu đãi tháng này')!,
              ].map((course, idx) => (
                <article
                  key={course.title}
                  className="list-enter group flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl shadow-sm sm:w-32">
                    <img
                      src={image(course.image, 320)}
                      alt={`${course.title} - lớp học tiếng Anh`}
                      className="media-zoom h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-md bg-amber-200 px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-950">
                      {course.badge}
                    </span>
                    <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-[#0A192F]">{course.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-0.5">{course.level} · {course.duration}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-amber-900">{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm sm:text-base text-slate-400 line-through">{course.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openRegister(course.title, `Đăng ký giữ ưu đãi cho khóa ${course.title}`)}
                    className="inline-flex h-11 px-5 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm sm:text-base font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    Giữ chỗ ngay
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT IS FOR SECTION */}
        <section id="who" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
              Chương trình đào tạo
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
              Chọn chương trình theo độ tuổi
            </h2>
            <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Thiết kế cá nhân hóa từ mầm non đến người đi làm. Bấm vào một nhóm để lọc nhanh các khóa học tương ứng.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {AGE_PROGRAMS.map((prog, index) => (
              <a
                key={prog.id}
                href="#courses"
                onClick={() => setActiveCategory(prog.filter)}
                className={`list-enter group flex h-full flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  activeCategory === prog.filter
                    ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div>
                  <div className="relative h-28 overflow-hidden rounded-xl">
                    <img
                      src={image(prog.image, 350)}
                      alt={`Khóa học tiếng Anh cho ${prog.title}`}
                      className="media-zoom h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 rounded-md bg-white/95 px-2.5 py-0.5 text-xs sm:text-sm font-bold text-indigo-900 shadow-sm">
                      {prog.ages}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg sm:text-xl font-extrabold text-[#0A192F]">{prog.title}</h3>
                  <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-600">{prog.detail}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm sm:text-base font-bold text-indigo-700">
                  <span>{prog.coursesCount}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* COURSES CATALOG SECTION */}
        <section id="courses" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                Lộ trình học cá nhân hóa
              </p>
              <h2 className="mt-2 text-2xl sm:text-[28px] md:text-3xl lg:text-[36px] xl:text-[40px] font-black text-[#0A192F] tracking-tight leading-tight">
                Các Khóa Học Tại Bright English
              </h2>
              <p className="mt-2 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                Sĩ số vàng 8–12 học viên/lớp. 100% giáo viên quốc tế đồng hành sát sao cùng cố vấn học tập.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openRegister()}
              className="inline-flex min-h-11 items-center text-base sm:text-lg font-bold text-indigo-700 transition hover:text-indigo-900 cursor-pointer"
            >
              Nhận tư vấn lộ trình riêng <ArrowRight aria-hidden="true" className="ml-1.5" size={16} />
            </button>
          </div>

          {/* Filter Tablist - Exact PML Pill button styling */}
          <div className="mt-8 flex w-full max-w-full min-w-0 gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Lọc khóa học theo nhóm">
            {filterCategories.map((cat) => {
              const isSelected = activeCategory === cat
              return (
                <button
                  type="button"
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative h-11 px-5 rounded-full text-sm sm:text-base font-bold whitespace-nowrap transition-all duration-200 inline-flex items-center justify-center cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0A192F] to-indigo-950 text-white shadow-lg shadow-blue-950/20 ring-2 ring-indigo-500/30'
                      : 'bg-white text-slate-700 hover:text-indigo-600 hover:bg-slate-100 hover:border-indigo-300 border border-slate-200/90 shadow-2xs'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Courses Grid */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course, idx) => {
              const isPromo = course.badge.includes('Giảm') || course.badge.includes('Ưu đãi')
              return (
                <article
                  key={course.title}
                  className={`list-enter group flex flex-col justify-between overflow-hidden rounded-[26px] border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                    isPromo ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
                  }`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={image(course.image, 700)}
                        alt={`Khóa học ${course.title} - ${course.level}`}
                        className="media-zoom h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className={`absolute left-4 top-4 rounded-md border px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider ${course.color}`}>
                        {course.badge}
                      </span>
                      <span className="absolute bottom-3 right-4 rounded-full bg-white/95 px-3 py-1 text-xs sm:text-sm font-bold text-slate-800 shadow-sm flex items-center">
                        <Star aria-hidden="true" size={14} fill="currentColor" className="mr-1 inline text-amber-500" />
                        {course.rating}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-sm sm:text-base font-bold text-indigo-700">
                        <span>{course.level}</span>
                        <span className="text-slate-500 font-normal text-xs sm:text-sm">Độ tuổi: {course.targetAge}</span>
                      </div>
                      <h3 className="mt-2 text-lg sm:text-xl font-extrabold tracking-tight text-[#0A192F] group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug min-h-[52px] cursor-pointer">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="mt-4 flex items-center gap-4 text-sm sm:text-base font-medium text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 aria-hidden="true" size={15} className="text-indigo-600" />
                          {course.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users aria-hidden="true" size={15} className="text-indigo-600" />
                          8–12 học viên
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-slate-100 px-5 pb-5 pt-4">
                    <span className="block text-xs font-medium text-slate-500 sm:text-sm">Học phí</span>
                    <span className="mt-1 block whitespace-nowrap text-xl font-black leading-none text-[#0A192F] sm:text-2xl">{course.price}</span>
                    <button
                      type="button"
                      onClick={() => openRegister(course.title, `Quan tâm khóa học ${course.title}`)}
                      className="mt-3 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-indigo-50 px-4 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white"
                      aria-label={`Đăng ký tư vấn khóa học ${course.title}`}
                    >
                      Đăng ký học thử
                      <ArrowUpRight aria-hidden="true" size={15} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setActiveCategory(activeCategory === 'Tất cả' ? 'THCS & IELTS' : 'Tất cả')}
              className="inline-flex h-12 items-center rounded-xl border border-slate-200 bg-white px-6 text-sm sm:text-base font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              {activeCategory === 'Tất cả' ? 'Xem các khóa IELTS nâng cao' : 'Xem toàn bộ 6 khóa học'}
              <ArrowRight aria-hidden="true" className="ml-1.5" size={15} />
            </button>
          </div>
        </section>

        {/* QUICK LEVEL CHECK BANNER */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-r from-[#181D4C] via-indigo-700 to-[#5B50E7] px-6 py-10 text-white shadow-2xl shadow-indigo-900/20 sm:px-12 sm:py-14">
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                  <Zap aria-hidden="true" size={14} className="text-amber-300" /> 3 phút · 100% Miễn phí
                </div>
                <h2 className="mt-3 max-w-xl text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  Tiếng Anh của bạn đang ở level nào?
                </h2>
                <p className="mt-2.5 max-w-lg text-base sm:text-lg leading-relaxed text-indigo-100 font-normal">
                  Làm bài kiểm tra tương tác 3 phút để khám phá điểm mạnh, nhận ngay gợi ý lộ trình phù hợp và quà tặng buổi học thử 1-1 cùng giáo viên quốc tế.
                </p>
                <button
                  type="button"
                  onClick={() => setModal('quiz')}
                  className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-6 text-sm sm:text-base font-bold text-slate-950 shadow-lg shadow-amber-950/20 transition-all duration-200 cursor-pointer"
                >
                  Bắt đầu bài test ngay <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>

              <div className="relative mx-auto grid size-36 place-items-center rounded-full border border-white/20 bg-white/10 sm:size-48">
                <div className="grid size-24 place-items-center rounded-full bg-[#D97706] text-slate-950 shadow-[0_0_40px_rgba(217,119,6,.4)] sm:size-32">
                  <Sparkles aria-hidden="true" size={40} />
                </div>
                <span className="absolute right-0 top-3 rounded-xl bg-white px-2.5 py-1 text-xs sm:text-sm font-bold text-indigo-800 shadow-md">
                  Let&apos;s go!
                </span>
                <span className="absolute bottom-0 left-0 rounded-xl bg-cyan-200 px-2.5 py-1 text-xs sm:text-sm font-bold text-slate-950">
                  3 min challenge
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TEACHERS SECTION */}
        <section id="teachers" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                Đội ngũ quốc tế
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] tracking-tight">
                100% Giáo Viên Quốc Tế Tận Tâm
              </h2>
              <p className="mt-2 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                100% thầy cô sở hữu bằng cấp sư phạm quốc tế CELTA/TESOL, giàu kinh nghiệm truyền cảm hứng và yêu trẻ.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openRegister('', 'Muốn tìm hiểu thêm về đội ngũ giáo viên')}
              className="inline-flex min-h-11 items-center text-base sm:text-lg font-bold text-indigo-700 transition hover:text-indigo-900 cursor-pointer"
            >
              Học thử cùng giáo viên <ArrowRight aria-hidden="true" className="ml-1.5" size={16} />
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEACHERS.map((teacher, index) => (
              <article
                key={teacher.name}
                className="list-enter group flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div>
                  <div className="relative h-60 overflow-hidden rounded-2xl">
                    <img
                      src={image(teacher.image, 600)}
                      alt={`Chân dung ${teacher.name} - ${teacher.role}`}
                      className="media-zoom h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300 border border-amber-300/30">
                      {teacher.badge}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0A192F] tracking-tight">{teacher.name}</h3>
                    <p className="text-sm sm:text-base font-bold text-indigo-700 mt-0.5">{teacher.role}</p>
                    <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">{teacher.creds} · {teacher.experience}</p>
                    <p className="mt-2.5 text-sm sm:text-base italic leading-relaxed text-slate-600 border-l-2 border-indigo-200 pl-2.5">
                      &ldquo;{teacher.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 text-center">
                  <button
                    type="button"
                    onClick={() => openRegister('', `Đăng ký lớp học của ${teacher.name}`)}
                    className="inline-flex min-h-10 items-center justify-center text-sm sm:text-base font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Xem lịch lớp của thầy/cô →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SCHEDULE SECTION */}
        <section id="schedule" className="scroll-reveal scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                Khung giờ đào tạo
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                Lịch Học Linh Hoạt Phù Hợp Mọi Lứa Tuổi
              </h2>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                Ca học đa dạng các ngày trong tuần và cuối tuần. Chính sách học bù linh hoạt và bảo lưu học phí lên tới 6 tháng.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  shift: 'Ca Sáng (8:30 – 10:30)',
                  badge: 'Thứ 7 & Chủ Nhật',
                  desc: 'Mầm non English Explorers, Tiếng Anh phản xạ hè, Lớp nói người đi làm ca gãy.',
                  icon: Sparkles,
                },
                {
                  shift: 'Ca Chiều (14:30 – 16:30)',
                  badge: 'T2–T4–T6 hoặc Cuối tuần',
                  desc: 'Luyện thi Cambridge Starters/Movers/Flyers, CLB kể chuyện và kịch nghệ tiếng Anh.',
                  icon: BookOpen,
                },
                {
                  shift: 'Ca Tối sớm (17:45 – 19:15)',
                  badge: 'Tất cả các ngày',
                  desc: 'Bright Stars tiểu học, Ngữ pháp học thuật THCS, Ôn thi vào lớp 10 chuyên Anh.',
                  icon: Clock3,
                },
                {
                  shift: 'Ca Tối muộn (19:30 – 21:00)',
                  badge: 'T3–T5–T7 hoặc Cuối tuần',
                  desc: 'IELTS Breakthrough, IELTS Mastery 7.0+, Tiếng Anh giao tiếp công sở cho người đi làm.',
                  icon: Target,
                },
              ].map((s, index) => {
                const Icon = s.icon
                return (
                <div
                  key={s.shift}
                  className="list-enter flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex flex-col items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-indigo-700 shadow-sm">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold uppercase leading-tight tracking-wide text-indigo-900">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0A192F] sm:text-xl">{s.shift}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">{s.desc}</p>
                </div>
                )
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-sm sm:text-base text-amber-950">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-amber-700 shrink-0" />
                <span>
                  <strong>Học bù linh hoạt:</strong> Bận lịch đột xuất? Dễ dàng đặt lịch học bù tại ca tương đương trong tuần.
                </span>
              </div>
              <button
                type="button"
                onClick={() => openRegister('', 'Hỏi chi tiết về lịch học các ca')}
                className="inline-flex min-h-9 items-center font-bold text-amber-900 underline underline-offset-2 hover:text-amber-700 cursor-pointer"
              >
                Nhận thời khóa biểu chi tiết →
              </button>
            </div>
          </div>
        </section>

        {/* WHY BRIGHT SECTION */}
        <section id="why" className="scroll-reveal scroll-mt-24 bg-[#F1F5F9] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                Điểm khác biệt của Bright
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                Học Khác Biệt. Tiến Bộ Thật.
              </h2>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                Môi trường nơi mỗi cá tính được tôn trọng và mỗi bước tiến đều được ghi nhận bằng lộ trình rõ ràng.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-4 md:grid-rows-2">
              <div className="rounded-[26px] border border-white/10 bg-[#181D43] p-7 text-white md:col-span-2 shadow-lg">
                <span className="grid size-11 place-items-center rounded-2xl bg-indigo-400/20 text-indigo-200">
                  <Target aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-5 text-xl sm:text-2xl font-extrabold">Blended Learning — Học tập đa trải nghiệm</h3>
                <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                  Kết hợp giữa lớp học tương tác trực tiếp, ứng dụng luyện tập trí tuệ nhân tạo và các buổi dã ngoại thực tế giúp tiếng Anh trở thành một phần cuộc sống.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Learn with Joy', 'Practice Everyday', 'Shine Globally'].map((text, i) => (
                    <span key={text} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-sm sm:text-base font-bold">
                      <span className="mr-1.5 text-cyan-300">0{i + 1}</span>
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-indigo-100 bg-white p-7 md:col-span-2 shadow-sm">
                <span className="grid size-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-800">
                  <GraduationCap aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#0A192F]">Cam kết chuẩn đầu ra bằng văn bản</h3>
                <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                  Hợp đồng đào tạo rõ ràng cho từng lộ trình Cambridge và IELTS. Được học lại miễn phí nếu chưa đạt band điểm cam kết.
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-700 bg-emerald-50 p-3.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 size={16} /> 100% học viên an tâm tuyệt đối về chất lượng
                </div>
              </div>

              {/* Scrim-protected campus card for high text contrast */}
              <div className="group relative min-h-[260px] overflow-hidden rounded-[26px] md:col-span-2 shadow-md">
                <img
                  className="media-zoom absolute inset-0 size-full object-cover"
                  src={image('photo-1498243691581-b145c3f54a5a', 800)}
                  alt="Thư viện hiện đại tại Bright English"
                  loading="lazy"
                />
                {/* Dark gradient scrim ensures contrast > 7:1 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <span className="rounded-md bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300 border border-amber-300/30">
                    Cơ sở vật chất 5 sao
                  </span>
                  <h3 className="mt-2.5 text-xl sm:text-2xl font-extrabold">Không gian truyền cảm hứng học tập</h3>
                  <p className="mt-1 text-sm sm:text-base text-slate-200">
                    Phòng học đa phương tiện, bảng tương tác thông minh và thư viện mở chuẩn quốc tế.
                  </p>
                </div>
              </div>

              <div className="rounded-[26px] border border-amber-200 bg-amber-50 p-7 md:col-span-2 shadow-sm">
                <span className="grid size-11 place-items-center rounded-2xl bg-amber-200 text-amber-950">
                  <MessageCircle aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#0A192F]">Cố vấn học tập 1-kèm-1 sát sao</h3>
                <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                  Báo cáo tiến bộ hàng tuần gửi thẳng về điện thoại phụ huynh. Gia sư trợ giảng sẵn sàng hỗ trợ bài tập và sửa phát âm bất cứ khi nào bạn cần.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STORIES SECTION */}
        <section id="stories" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                Người thật · Thành quả thật
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                Câu Chuyện Tiến Bộ Từ Học Viên Bright
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} aria-hidden="true" size={16} fill="currentColor" />
              ))}
              <span className="text-sm sm:text-base font-extrabold text-[#0A192F] ml-1">4.9/5</span>
              <span className="text-sm sm:text-base text-slate-500">(2.400+ đánh giá phụ huynh)</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Minh Anh',
                school: 'THPT chuyên Hà Nội – Amsterdam',
                score: 'IELTS 8.0 Overall',
                image: 'photo-1534528741775-53994a69daeb',
                quote: 'Từ một cô bé sợ nói tiếng Anh trước đám đông, giờ mình đã tự tin thuyết trình và đạt 8.0 IELTS. Thầy cô ở Bright luôn cổ vũ mình khám phá phiên bản tốt nhất của bản thân.',
              },
              {
                name: 'Hoàng Nam',
                school: 'THCS Cầu Giấy, Hà Nội',
                score: 'IELTS 7.5 (Lớp 9)',
                image: 'photo-1500648767791-00dcc994a43e',
                quote: 'Các buổi học ở lớp thú vị hơn nhiều so với việc chỉ giải đề. Mình được tranh luận các chủ đề khoa học, xã hội và cảm nhận sự tiến bộ rõ rệt qua từng tháng.',
              },
              {
                name: 'Bảo Ngọc',
                school: 'Học bổng 100% — Monash University',
                score: 'Du học sinh Úc',
                image: 'photo-1531123897727-8f129e1688ce',
                quote: 'Bright không chỉ rèn luyện tiếng Anh mà còn giúp mình xây dựng tư duy phản biện và sự tự tin để viết bài luận săn học bổng thành công.',
              },
            ].map((student, index) => (
              <article
                key={student.name}
                className="list-enter flex h-full flex-col justify-between rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} aria-hidden="true" size={14} fill="currentColor" />
                      ))}
                    </span>
                    <Quote aria-hidden="true" size={22} className="text-indigo-200" />
                  </div>
                  <p className="mt-3.5 text-sm sm:text-base text-slate-700 leading-relaxed italic">&ldquo;{student.quote}&rdquo;</p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <img
                    src={image(student.image, 140)}
                    alt={`Học viên ${student.name} - ${student.school}`}
                    className="size-11 rounded-full object-cover border-2 border-indigo-100"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0A192F]">{student.name}</h3>
                    <p className="truncate text-xs sm:text-sm text-slate-500 mt-0.5">{student.school}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-center text-xs font-bold leading-tight text-indigo-700 sm:text-sm">
                    {student.score}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="scroll-reveal scroll-mt-24 bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 border-t border-slate-200/70">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                Hỏi đáp thường gặp
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                Những Câu Hỏi Phụ Huynh Quan Tâm Nhất
              </h2>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                Mọi thông tin về học phí, cam kết đầu ra và hình thức học thử tại Bright English.
              </p>
            </div>

            <div className="mt-10 grid gap-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex min-h-12 w-full items-center justify-between gap-4 p-5 text-left text-base sm:text-lg font-bold text-[#0A192F] hover:bg-slate-50 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle size={20} className="text-indigo-600 shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className="border-t border-slate-100 bg-slate-50/50 p-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CAMPUS FACILITIES SECTION (With high-contrast scrim) */}
        <section id="campus" className="scroll-reveal scroll-mt-24 bg-[#F1F5F9] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                  Không gian trải nghiệm
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                  Cơ Sở Vật Chất Hiện Đại Chuẩn 5 Sao
                </h2>
              </div>
              <a href="#start" className="inline-flex min-h-11 items-center text-sm sm:text-base font-bold text-indigo-800 hover:text-indigo-900">
                Ghé thăm trực tiếp cơ sở <ArrowRight aria-hidden="true" className="ml-1.5" size={16} />
              </a>
            </div>

            <div className="mt-8 grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:grid-cols-4">
              {CAMPUS_PHOTOS.map((item, i) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl shadow-sm ${
                    i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                  }`}
                >
                  <img
                    className={`${i === 0 ? 'media-pan' : 'media-zoom'} size-full object-cover`}
                    src={image(item.id, 900)}
                    alt={item.alt}
                    loading="lazy"
                  />
                  {/* Scrim: Dark gradient to ensure high contrast for text (>=7:1) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-base sm:text-lg font-bold">{item.caption}</p>
                    <p className="mt-0.5 text-sm sm:text-base text-slate-200">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW TO START SECTION */}
        <section id="start" className="scroll-reveal scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
              Lộ trình đăng ký
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
              Ba Bước Đơn Giản Để Bắt Đầu Cùng Bright
            </h2>

            <ol className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
              <li className="list-enter flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div>
                  <span className="inline-block rounded-md bg-indigo-100 px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-900">
                    Bước 1
                  </span>
                  <h3 className="mt-2.5 text-lg sm:text-xl font-extrabold text-[#0A192F]">Chọn chương trình học</h3>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-600">
                    Khám phá các khóa học phù hợp độ tuổi từ mầm non, tiểu học, THCS & IELTS tới giao tiếp người đi làm.
                  </p>
                </div>
                <a
                  href="#courses"
                  className="mt-5 inline-flex min-h-10 items-center text-sm sm:text-base font-bold text-indigo-700 hover:text-indigo-900"
                >
                  Xem danh sách khóa học <ArrowRight size={15} className="ml-1.5" />
                </a>
              </li>

              <li className="list-enter flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6" style={{ animationDelay: '60ms' }}>
                <div>
                  <span className="inline-block rounded-md bg-indigo-100 px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-900">
                    Bước 2
                  </span>
                  <h3 className="mt-2.5 text-lg sm:text-xl font-extrabold text-[#0A192F]">Làm bài test 3 phút</h3>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-600">
                    Kiểm tra nhanh trình độ trực tuyến để nhận kết quả phân loại CEFR và đề xuất khóa học phù hợp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModal('quiz')}
                  className="mt-5 inline-flex min-h-10 items-center text-sm sm:text-base font-bold text-indigo-700 hover:text-indigo-900 text-left cursor-pointer"
                >
                  Bắt đầu bài test ngay <ArrowRight size={15} className="ml-1.5" />
                </button>
              </li>

              <li className="list-enter flex h-full flex-col justify-between rounded-2xl border border-amber-300 bg-amber-50/80 p-6" style={{ animationDelay: '120ms' }}>
                <div>
                  <span className="inline-block rounded-md bg-amber-200 px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-950">
                    Bước 3
                  </span>
                  <h3 className="mt-2.5 text-lg sm:text-xl font-extrabold text-[#0A192F]">Đăng ký tư vấn & học thử</h3>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-700">
                    Để lại thông tin, tư vấn viên sẽ gọi điện xác nhận trong 15 phút và gửi lịch học thử miễn phí.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openRegister()}
                  className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-6 text-sm sm:text-base font-bold text-slate-950 transition shadow-sm cursor-pointer"
                >
                  Đăng ký tư vấn miễn phí
                </button>
              </li>
            </ol>

            {/* Campus Address & Contacts */}
            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 lg:grid-cols-4 text-sm sm:text-base">
              <a
                href="tel:19006868"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-slate-900 hover:text-indigo-600"
              >
                <Phone aria-hidden="true" size={16} className="text-indigo-600 shrink-0" />
                Hotline: 1900 6868
              </a>
              <a
                href="mailto:hello@brightenglish.vn"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-slate-900 hover:text-indigo-600"
              >
                <Mail aria-hidden="true" size={16} className="text-indigo-600 shrink-0" />
                hello@brightenglish.vn
              </a>
              {BRANCHES.map((b) => (
                <div key={b.name} className="flex flex-col justify-center">
                  <p className="flex items-start gap-1.5 text-sm sm:text-base text-slate-700">
                    <MapPin aria-hidden="true" size={15} className="mt-0.5 text-indigo-600 shrink-0" />
                    <span>{b.address}</span>
                  </p>
                  <a
                    href={b.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 hover:underline pl-5"
                  >
                    Xem chỉ đường trên Google Maps <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-slate-800 bg-[#0A192F] px-4 pb-8 pt-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-slate-800 pb-12 md:grid-cols-[1.2fr_.8fr_.9fr_1.1fr]">
            <div>
              <a href="#home" className="flex items-center gap-2.5">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-md shadow-indigo-900/20">
                  <Sparkles aria-hidden="true" size={20} />
                </span>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Bright <span className="text-cyan-300">English</span>
                </span>
              </a>
              <p className="mt-3.5 max-w-xs text-sm sm:text-base leading-relaxed text-slate-400">
                Đồng hành cùng thế hệ trẻ Việt Nam tự tin làm chủ tiếng Anh, khai phóng tiềm năng và vươn ra thế giới.
              </p>
              <div className="mt-5 flex items-center gap-2.5">
                <a
                  href="https://facebook.com/brightenglish.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 px-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  Facebook Page
                </a>
                <a
                  href="https://zalo.me/0901234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 px-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  Zalo OA
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">Khám phá</h4>
              <nav className="mt-4 flex flex-col gap-1 text-sm sm:text-base text-slate-400">
                <a className="inline-flex min-h-[38px] items-center hover:text-white transition-colors" href="#offers">
                  Ưu đãi học phí
                </a>
                <a className="inline-flex min-h-[38px] items-center hover:text-white transition-colors" href="#who">
                  Chương trình theo độ tuổi
                </a>
                <a className="inline-flex min-h-[38px] items-center hover:text-white transition-colors" href="#courses">
                  Danh sách khóa học
                </a>
                <a className="inline-flex min-h-[38px] items-center hover:text-white transition-colors" href="#teachers">
                  Đội ngũ giáo viên
                </a>
                <a className="inline-flex min-h-[38px] items-center hover:text-white transition-colors" href="#schedule">
                  Lịch học & ca học
                </a>
                <a className="inline-flex min-h-[38px] items-center hover:text-white transition-colors" href="#stories">
                  Câu chuyện thành công
                </a>
              </nav>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">Hệ thống cơ sở</h4>
              <div className="mt-4 flex flex-col gap-3 text-sm sm:text-base text-slate-400">
                {BRANCHES.map((b) => (
                  <div key={b.name} className="flex flex-col gap-0.5">
                    <span className="font-bold text-white text-sm sm:text-base">{b.name}</span>
                    <span className="leading-relaxed">{b.address}</span>
                    <a
                      href={b.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm text-cyan-300 hover:underline mt-0.5"
                    >
                      Xem bản đồ <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
                <a className="inline-flex min-h-[36px] items-center gap-2 hover:text-white text-sm sm:text-base text-slate-300 font-medium" href="tel:19006868">
                  <Phone aria-hidden="true" size={14} className="text-amber-400" /> Hotline: <strong className="text-white">1900 6868</strong>
                </a>
                <a className="inline-flex min-h-[36px] items-center gap-2 hover:text-white text-sm sm:text-base text-slate-300" href="mailto:hello@brightenglish.vn">
                  <Mail aria-hidden="true" size={14} className="text-indigo-400" /> hello@brightenglish.vn
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">Bí kíp học tiếng Anh</h4>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
                Nhận tài liệu ngữ pháp, đề thi thử IELTS và thông tin học bổng gửi định kỳ vào hộp thư của bạn.
              </p>

              {newsletterSuccess ? (
                <div role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/20 p-3 text-sm font-semibold text-emerald-300 border border-emerald-500/30">
                  <Check aria-hidden="true" size={16} /> Đăng ký thành công! Hãy kiểm tra hộp thư bạn nhé.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-4" noValidate>
                  <div className="flex rounded-xl border border-slate-700 bg-slate-900/60 p-1 focus-within:border-indigo-400">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email nhận bản tin
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value)
                        if (newsletterError) setNewsletterError('')
                      }}
                      placeholder="Nhập email của bạn..."
                      className="min-w-0 flex-1 bg-transparent px-3.5 text-sm sm:text-base text-white outline-none placeholder:text-slate-500"
                    />
                    <button
                      type="submit"
                      aria-label="Đăng ký nhận bản tin"
                      className="grid size-11 shrink-0 place-items-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-500 cursor-pointer"
                    >
                      <ArrowRight aria-hidden="true" size={16} />
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="mt-1.5 text-sm font-medium text-rose-300" role="alert">
                      {newsletterError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-6 text-xs sm:text-sm text-slate-400 sm:flex-row">
            <span>© 2026 Bright English Center. Học vui, tiến bộ thật. Bảo lưu mọi quyền.</span>
            <span>Chính sách bảo mật · Điều khoản dịch vụ</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS (Zalo + Hotline) - Placed safely above mobile dock */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-2.5 md:bottom-8 md:right-8">
        <a
          href="https://zalo.me/0901234567"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo cùng tư vấn viên Bright"
          className="grid size-12 place-items-center rounded-full bg-[#0068FF] text-white shadow-xl shadow-blue-600/30 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <MessageCircle size={22} />
        </a>
        <a
          href="tel:19006868"
          aria-label="Gọi tổng đài tư vấn 1900 6868"
          className="grid size-12 place-items-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <Phone size={20} />
        </a>
      </div>

      {/* MOBILE BOTTOM DOCK */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[0.88fr_1.12fr] gap-2 border-t border-slate-200 bg-white/95 px-3 pt-2 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href="tel:19006868"
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-2 text-slate-800"
        >
          <Phone aria-hidden="true" size={16} className="shrink-0 text-indigo-600" />
          <span className="text-center text-xs sm:text-sm font-bold leading-tight">
            Gọi hotline
            <span className="mt-0.5 block text-xs font-semibold text-slate-500">1900 6868</span>
          </span>
        </a>
        <button
          type="button"
          onClick={() => openRegister()}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-xs sm:text-sm font-bold text-slate-950 shadow-md cursor-pointer"
        >
          Đăng ký tư vấn <ArrowRight aria-hidden="true" size={14} />
        </button>
      </div>

      {/* MODALS */}
      {modal === 'register' && (
        <RegistrationModal
          onClose={() => setModal(null)}
          initialCourse={selectedCourse}
          initialNote={selectedNote}
        />
      )}

      {modal === 'quiz' && (
        <QuizModal
          onClose={() => setModal(null)}
          onOpenLead={(course, note) => {
            setSelectedCourse(course)
            setSelectedNote(note)
            setModal('register')
          }}
        />
      )}
    </div>
  )
}
