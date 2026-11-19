'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import type { SceneId } from '@/components/scene-art'
import { saveLead } from '@/lib/lead'
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
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { RegistrationModal } from '@/components/registration-modal'
import { QuizModal } from '@/components/quiz-modal'

type Course = {
  title: string
  category: 'Mầm non' | 'Tiểu học' | 'THCS & IELTS' | 'Người đi làm'
  scene: SceneId
  badge?: string
  duration: string
  sessions: string
  price: string
  originalPrice?: string
  discountNote?: string
  description: string
  outcome: string
  targetAge: string
  classSize: string
}

const COURSES: Course[] = [
  {
    title: 'English Explorers',
    category: 'Mầm non',
    scene: 'explorers',
    duration: '8 tháng',
    sessions: '2 buổi/tuần',
    price: 'Từ 1.590.000đ/tháng',
    description: 'Học qua bài hát, trò chơi vận động và kể chuyện. Bé nghe và đáp lại trước khi học chữ.',
    outcome: 'Phản xạ chào hỏi, màu sắc, số đếm và kể một câu ngắn.',
    targetAge: '4–6 tuổi',
    classSize: '8–12 học viên',
  },
  {
    title: 'Bright Stars',
    category: 'Tiểu học',
    scene: 'stars',
    duration: '10 tháng',
    sessions: '2 buổi/tuần',
    price: 'Từ 1.790.000đ/tháng',
    description: 'Nền ngữ pháp và bốn kỹ năng nghe, nói, đọc, viết cho bậc tiểu học.',
    outcome: 'Đọc đoạn ngắn, viết câu đúng và nói về chủ đề quen thuộc.',
    targetAge: '6–11 tuổi',
    classSize: '8–12 học viên',
  },
  {
    title: 'Cambridge Champions',
    category: 'Tiểu học',
    scene: 'cambridge',
    duration: '8 tháng',
    sessions: '2 buổi/tuần',
    price: '1.690.000đ/tháng',
    originalPrice: '2.190.000đ/tháng',
    discountNote: 'Giảm 23%',
    description: 'Luyện Starters, Movers hoặc Flyers. Thang điểm Cambridge Young Learners tối đa 15 khiên; mục tiêu cụ thể được ghi trong hợp đồng sau bài test.',
    outcome: 'Làm quen dạng đề và từ vựng của cấp Starters, Movers hoặc Flyers đã chọn.',
    targetAge: '7–12 tuổi',
    classSize: '8–12 học viên',
  },
  {
    title: 'IELTS Breakthrough',
    category: 'THCS & IELTS',
    scene: 'ielts-base',
    duration: '6 tháng',
    sessions: '3 buổi/tuần',
    price: 'Từ 2.490.000đ/tháng',
    description: 'Bốn kỹ năng học thuật và cách làm từng dạng câu hỏi IELTS nền tảng.',
    outcome: 'Nắm cấu trúc đề và luyện band mục tiêu ghi trong hợp đồng nếu đăng ký cam kết.',
    targetAge: '12–17 tuổi',
    classSize: '8–12 học viên',
  },
  {
    title: 'IELTS Mastery 7.0+',
    category: 'THCS & IELTS',
    scene: 'ielts-high',
    badge: 'Ưu đãi tháng này',
    duration: '5 tháng',
    sessions: '3 buổi/tuần',
    price: '2.990.000đ/tháng',
    originalPrice: '4.600.000đ/tháng',
    discountNote: 'Giảm 35%',
    description: 'Luyện band cao hơn nền hiện tại. Mức cam kết, nếu có, được viết trong hợp đồng sau khi test trình độ.',
    outcome: 'Chiến lược viết và nói cho mục tiêu đã thống nhất với tư vấn viên.',
    targetAge: '15+ tuổi',
    classSize: '8–12 học viên',
  },
  {
    title: 'Speak with Confidence',
    category: 'Người đi làm',
    scene: 'speak',
    duration: '4 tháng',
    sessions: '2 buổi/tuần',
    price: 'Từ 1.990.000đ/tháng',
    description: 'Nói trong cuộc họp, viết email và thuyết trình ngắn.',
    outcome: 'Xử lý một tình huống công việc bằng tiếng Anh mà không đọc bài soạn.',
    targetAge: 'Sinh viên và người đi làm',
    classSize: '8–12 học viên',
  },
]

const AGE_PROGRAMS = [
  {
    id: 'kids',
    title: 'Mầm non',
    ages: '4–6 tuổi',
    detail: 'Khám phá đầu đời & phản xạ tự nhiên',
    filter: 'Mầm non' as const,
    scene: 'age-kids' as SceneId,
    coursesCount: '1 khóa chuyên sâu',
  },
  {
    id: 'primary',
    title: 'Tiểu học',
    ages: '6–11 tuổi',
    detail: 'Giao tiếp tự tin & chứng chỉ Cambridge',
    filter: 'Tiểu học' as const,
    scene: 'age-primary' as SceneId,
    coursesCount: '2 khóa học',
  },
  {
    id: 'secondary',
    title: 'THCS',
    ages: '12–15 tuổi',
    detail: 'Vững vàng học thuật & nền tảng IELTS',
    filter: 'THCS & IELTS' as const,
    scene: 'age-secondary' as SceneId,
    coursesCount: '2 lộ trình',
  },
  {
    id: 'ielts',
    title: 'THPT & IELTS',
    ages: '15+ tuổi',
    detail: 'Bứt phá 7.0+ & xét tuyển đại học',
    filter: 'THCS & IELTS' as const,
    scene: 'age-ielts' as SceneId,
    coursesCount: '2 lộ trình',
  },
  {
    id: 'adults',
    title: 'Người đi làm',
    ages: 'Sinh viên & Đi làm',
    detail: 'English at Work & đàm phán quốc tế',
    filter: 'Người đi làm' as const,
    scene: 'age-work' as SceneId,
    coursesCount: '1 khóa chuyên sâu',
  },
]

const TEACHERS = [
  {
    name: 'Nhóm mầm non',
    role: 'Dạy bằng trò chơi và kể chuyện',
    creds: 'Tiêu chuẩn tuyển: CELTA hoặc chứng chỉ dạy trẻ em',
    scene: 'role-young' as SceneId,
    experience: 'Chưa công bố hồ sơ từng giáo viên',
    quote: 'Tên và video giới thiệu sẽ được đăng khi trung tâm cung cấp hồ sơ thật.',
  },
  {
    name: 'Nhóm tiểu học',
    role: 'Ngữ pháp và bốn kỹ năng',
    creds: 'Tiêu chuẩn tuyển: CELTA hoặc TESOL',
    scene: 'role-academic' as SceneId,
    experience: 'Chưa công bố số năm kinh nghiệm cá nhân',
    quote: 'Minh họa vai trò giảng dạy, không phải chân dung một người có thật.',
  },
  {
    name: 'Nhóm IELTS',
    role: 'Luyện bốn kỹ năng thi',
    creds: 'Tiêu chuẩn tuyển: CELTA hoặc TESOL',
    scene: 'role-exam' as SceneId,
    experience: 'Mức band cam kết ghi trong hợp đồng sau bài test',
    quote: 'Không dùng danh hiệu cựu giám khảo khi chưa có giấy xác nhận.',
  },
  {
    name: 'Nhóm giao tiếp',
    role: 'Phát âm và nói trong công việc',
    creds: 'Tiêu chuẩn tuyển: CELTA hoặc TESOL',
    scene: 'role-speech' as SceneId,
    experience: 'Lịch lớp xác nhận khi đăng ký',
    quote: 'Video 30–60 giây của giáo viên sẽ thay minh họa này khi có bản ghi.',
  },
]

const CAMPUS_PHOTOS = [
  {
    id: 'space-class' as SceneId,
    alt: 'Minh họa phòng học nhóm',
    caption: 'Phòng học nhóm',
    sub: 'Minh họa. Ảnh chụp phòng thật sẽ thay khi trung tâm gửi.',
  },
  {
    id: 'space-books' as SceneId,
    alt: 'Minh họa góc sách',
    caption: 'Góc sách',
    sub: 'Số đầu sách chưa được công bố.',
  },
  {
    id: 'space-club' as SceneId,
    alt: 'Minh họa góc thảo luận',
    caption: 'Góc thảo luận',
    sub: 'Dùng cho hoạt động nói theo nhóm.',
  },
  {
    id: 'space-play' as SceneId,
    alt: 'Minh họa góc hoạt động cho trẻ',
    caption: 'Góc hoạt động',
    sub: 'Dành cho bài hát và trò chơi vận động.',
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

const ZALO_URL = 'https://zalo.me/19006868'

function FrameImage({
  id,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 40vw',
}: {
  id: SceneId
  alt: string
  width?: number
  priority?: boolean
  sizes?: string
  className?: string
}) {
  return (
    <Image
      src={`/images/${id}.jpg`}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  )
}

/**
 * Stat Counter: SSR displays the real target number immediately!
 * After mounting, if not prefers-reduced-motion, it counts up smoothly.
 */
function Stat({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const [n, setN] = useState(to)
  const ref = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || played.current) return
      played.current = true
      observer.disconnect()
      setN(0)
      const start = performance.now()
      const duration = 700
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setN(Math.round(to * eased))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [to])

  return (
    <div ref={ref} className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
      <p className="text-2xl sm:text-3xl font-black tabular-nums tracking-tight text-[#0A192F]">
        {String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{suffix}
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
  const [selectedCampus, setSelectedCampus] = useState('Gò Vấp, TP.HCM')
  const [detailCourse, setDetailCourse] = useState<Course | null>(null)
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

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('email')
    const field = input instanceof HTMLInputElement ? input : null
    const value = (field?.value || newsletterEmail).trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let message = ''
    if (!value) message = 'Vui lòng nhập địa chỉ email của bạn.'
    else if (!emailRegex.test(value)) message = 'Địa chỉ email chưa hợp lệ (ví dụ: name@gmail.com).'
    field?.setCustomValidity(message)
    if (message) {
      setNewsletterError(message)
      field?.reportValidity()
      return
    }
    setNewsletterError('')
    try {
      await saveLead({ kind: 'newsletter', email: value, consent: true })
      setNewsletterSuccess(true)
    } catch {
      setNewsletterError('Chưa lưu được email. Thử lại hoặc gọi 1900 6868.')
    }
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Announcement Bar - Promos & Direct Hotline */}
      <div className="bg-slate-900 text-slate-100 border-b border-slate-800 text-sm">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-300 ring-1 ring-inset ring-amber-400/30 shrink-0">
              <Percent size={12} className="text-amber-300" />
              Ưu đãi tháng này
            </span>
            <a href="#offers" className="truncate text-sm font-medium text-slate-200 hover:text-white">
              Tháng này: IELTS Mastery <strong className="font-extrabold text-white">giảm 35%</strong>, Cambridge Champions giảm 23%
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm shrink-0 text-slate-200 font-medium">
            <a
              href="tel:19006868"
              className="min-h-11 flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1"
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
              <span className="mt-0.5 hidden text-xs font-bold uppercase leading-none tracking-[0.14em] text-slate-500 xl:block">ACADEMY &amp; CAMBRIDGE</span>
            </div>
          </a>

          {/* Navigation - Clear readable 14px-15px font */}
          <nav className="hidden shrink-0 items-center gap-0.5 text-sm font-bold text-slate-700 lg:flex xl:gap-2 xl:text-[15px]" aria-label="Điều hướng chính">
            <a className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap px-2 transition-colors hover:text-indigo-600" href="#courses">
              Khóa học
            </a>
            <a className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap px-2 transition-colors hover:text-indigo-600" href="#who">
              Độ tuổi
            </a>
            <a className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap px-2 transition-colors hover:text-indigo-600" href="#teachers">
              Giáo viên
            </a>
            <a className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap px-2 transition-colors hover:text-indigo-600" href="#schedule">
              Lịch học
            </a>
            <a className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap px-2 transition-colors hover:text-indigo-600" href="#why">
              Về Bright
            </a>
            <a className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap px-2 transition-colors hover:text-indigo-600" href="#faq">
              FAQ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <button
              type="button"
              onClick={() => setModal('quiz')}
              className="hidden h-11 cursor-pointer items-center gap-1.5 rounded-xl border border-transparent px-3 text-sm font-bold text-slate-700 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-indigo-700 xl:inline-flex"
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
                ['Ưu đãi tháng này', '#offers'],
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
              <h1 className="hero-rise max-w-2xl text-balance text-[34px] font-extrabold leading-[1.15] tracking-tight text-[#0A192F] sm:text-5xl lg:text-[44px] xl:text-[56px]" style={{ animationDelay: '80ms' }}>
                Bứt phá tiếng Anh,<br />
                chinh phục{' '}
                <span className="whitespace-nowrap bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  tương lai
                </span>{' '}
                toàn cầu.
              </h1>
              
              <p className="hero-rise mt-4 max-w-xl text-base font-normal leading-relaxed text-slate-700 sm:text-lg lg:text-xl" style={{ animationDelay: '160ms' }}>
                Mỗi buổi học là một hoạt động nghe, nói và làm. Giáo viên được tuyển với CELTA hoặc TESOL. Sĩ số lớp 8–12 học viên.
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
              </div>

              <div className="hero-rise mt-8 flex flex-wrap gap-2" style={{ animationDelay: '320ms' }}>
                <span className="inline-flex min-h-11 items-center rounded-full bg-white px-3 text-sm font-bold text-slate-800 shadow-xs">Sĩ số 8–12</span>
                <span className="inline-flex min-h-11 items-center rounded-full bg-white px-3 text-sm font-bold text-slate-800 shadow-xs">4 ca mỗi ngày</span>
                <span className="inline-flex min-h-11 items-center rounded-full bg-white px-3 text-sm font-bold text-slate-800 shadow-xs">2 cơ sở</span>
              </div>
            </div>

            {/* Hero collage. Stats sit in the grid on small screens and overlay the frame from sm up. */}
            <div className="relative mx-auto w-full max-w-[540px] pt-2 lg:max-w-none">
              <div className="pointer-events-none absolute -left-6 bottom-16 size-40 rounded-full bg-violet-300/40 blur-3xl mesh-orb [animation-delay:-2s]" />
              <div className="relative grid h-[360px] grid-cols-[1.08fr_.92fr] grid-rows-[1.12fr_.88fr] gap-3 sm:h-[440px] md:h-[500px]">
                <div className="relative row-span-2 overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/15">
                  <FrameImage
                    id="hero-class"
                    alt="Minh họa buổi học nhóm"
                    width={900}
                    priority
                    sizes="(max-width: 1024px) 70vw, 360px"
                    className="media-pan object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-sm font-bold uppercase tracking-wider text-cyan-200">Learn with joy</p>
                    <p className="mt-1 text-xl font-extrabold sm:text-2xl">Học vui mỗi ngày</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/10">
                  <FrameImage
                    id="hero-talk"
                    alt="Minh họa hoạt động nói"
                    width={700}
                    sizes="180px"
                    className="media-pan object-cover [animation-delay:-6s]"
                  />
                </div>

                <div className="relative overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/10">
                  <FrameImage
                    id="hero-room"
                    alt="Minh họa phòng học"
                    width={700}
                    sizes="180px"
                    className="media-pan object-cover [animation-delay:-11s]"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:pointer-events-none sm:absolute sm:inset-0 sm:mt-0 sm:block">
                <div className="sm:pointer-events-auto sm:absolute sm:left-3 sm:top-6 sm:w-44">
                  <Stat to={12} label="Học viên tối đa mỗi lớp" />
                </div>
                <div className="sm:pointer-events-auto sm:absolute sm:bottom-6 sm:right-3 sm:w-44">
                  <Stat to={4} label="Ca học mỗi ngày" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stories" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0A192F] sm:text-3xl lg:text-4xl">
            Ví dụ lộ trình tư vấn
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Ba cách xếp lớp đang dùng. Minh họa này không gắn tên học viên hay điểm số.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { scene: 'path-play' as const, title: 'Mầm non', text: 'Hai buổi mỗi tuần với bài hát, trò chơi và một câu nói. Phụ huynh nhận nội dung buổi học.' },
              { scene: 'path-exam' as const, title: 'Luyện thi', text: 'Sau bài test, hợp đồng ghi mục tiêu Starters, Movers, Flyers hoặc IELTS. Mức điểm chỉ hứa khi đã biết trình độ.' },
              { scene: 'path-work' as const, title: 'Đi làm', text: 'Hai buổi tối: viết email, nói trong họp và một bài thuyết trình khoảng ba phút.' },
            ].map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
                <div className="relative h-40">
                  <FrameImage id={item.scene} alt={`Hình minh họa lộ trình ${item.title}`} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-[#0A192F]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{item.text}</p>
                </div>
              </article>
            ))}
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
                IELTS Mastery giảm 35% trong tháng này
              </h2>
              <p className="mt-2.5 max-w-md text-base leading-relaxed font-normal text-slate-600 sm:text-lg">
                Cambridge Champions giảm 23%, từ 2.190.000đ còn 1.690.000đ/tháng. Học phí niêm yết giống nhau ở cả hai cơ sở. Lịch khai giảng xác nhận khi gọi lại.
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

            <div className="motion-list grid gap-3.5">
              {COURSES.filter((course) => course.originalPrice).map((course, idx) => (
                <article
                  key={course.title}
                  className="list-enter group flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl shadow-sm sm:w-32">
                    <FrameImage
                      id={course.scene}
                      alt={`Minh họa khóa ${course.title}`}
                      width={320}
                      sizes="128px"
                      className="media-zoom object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-md bg-amber-200 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-950 sm:text-sm">
                      {course.discountNote}
                    </span>
                    <h3 className="mt-1 text-lg font-extrabold text-[#0A192F] sm:text-xl">{course.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-600 sm:text-base">
                      Tuổi {course.targetAge} · {course.duration} · {course.sessions}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-amber-900">{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-slate-600 line-through sm:text-base">{course.originalPrice}</span>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
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
                    <FrameImage
                      id={prog.scene}
                      alt={`Khóa học tiếng Anh cho ${prog.title}`}
                      width={350}
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="media-zoom object-cover"
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
              <h2 className="text-2xl font-black tracking-tight text-[#0A192F] sm:text-[28px] md:text-3xl lg:text-[36px] xl:text-[40px]">
                Các khóa học
              </h2>
              <p className="mt-2 max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
                Sĩ số 8–12 học viên. Giáo viên được tuyển với CELTA hoặc TESOL. Chọn cơ sở trước khi xem lịch.
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
          <div key={activeCategory} className="motion-list mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course, idx) => (
                <article
                  key={course.title}
                  className={`list-enter group flex flex-col justify-between overflow-hidden rounded-[26px] border bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 ${
                    course.badge ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
                  }`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <FrameImage
                        id={course.scene}
                        alt={`Minh họa khóa ${course.title}`}
                        width={700}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {course.badge && (
                        <span className="absolute left-4 top-4 rounded-md border border-amber-300 bg-amber-200 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-950 sm:text-sm">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-extrabold tracking-tight text-[#0A192F] sm:text-xl">
                        {course.title}
                      </h3>
                      <dl className="mt-3 grid grid-cols-3 gap-2 text-sm text-slate-700">
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Tuổi</dt>
                          <dd className="mt-1 font-semibold">{course.targetAge}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Thời lượng</dt>
                          <dd className="mt-1 font-semibold">{course.duration}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Sĩ số</dt>
                          <dd className="mt-1 font-semibold">{course.classSize}</dd>
                        </div>
                      </dl>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-2">
                        {course.description}
                      </p>

                    </div>
                  </div>

                  <div className="mt-auto border-t border-slate-100 px-5 pb-5 pt-4">
                    <span className="block text-xs font-medium text-slate-500 sm:text-sm">Học phí · {course.sessions}</span>
                    {course.originalPrice && (
                      <span className="mt-1 block text-sm text-slate-600 line-through">{course.originalPrice}</span>
                    )}
                    <span className="mt-1 block whitespace-nowrap text-xl font-black leading-none text-[#0A192F] sm:text-2xl">{course.price}</span>
                    {course.discountNote && <span className="mt-1 block text-sm font-bold text-amber-800">{course.discountNote}</span>}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDetailCourse(course)}
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-slate-800"
                      >
                        Chi tiết
                      </button>
                      <button
                        type="button"
                        onClick={() => openRegister(course.title, `Quan tâm khóa học ${course.title}. Cơ sở ${selectedCampus}.`)}
                        className="inline-flex h-11 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-indigo-50 px-2 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-600 hover:text-white"
                        aria-label={`Đăng ký tư vấn khóa học ${course.title}`}
                      >
                        Học thử
                        <ArrowUpRight aria-hidden="true" size={15} />
                      </button>
                    </div>
                  </div>
                </article>
            ))}
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
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0A192F] sm:text-3xl lg:text-4xl">
                Tiêu chuẩn giáo viên
              </h2>
              <p className="mt-2 max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
                Giáo viên đứng lớp cần CELTA hoặc TESOL. Trang này chưa đăng tên, ảnh và video thật.
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
                    <FrameImage
                      id={teacher.scene}
                      alt={`Minh họa ${teacher.name}`}
                      width={600}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="media-zoom object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-md border border-white/30 bg-black/60 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-200 sm:text-sm">
                      Minh họa
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0A192F] tracking-tight">{teacher.name}</h3>
                    <p className="text-sm sm:text-base font-bold text-indigo-700 mt-0.5">{teacher.role}</p>
                    <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">{teacher.creds} · {teacher.experience}</p>
                    <p className="mt-2.5 border-l-2 border-indigo-200 pl-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {teacher.quote}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 text-center">
                  <button
                    type="button"
                    onClick={() => openRegister('', `Xin lịch lớp cho ${teacher.name} tại ${selectedCampus}`)}
                    className="inline-flex min-h-11 cursor-pointer items-center justify-center text-sm font-bold text-indigo-600 hover:text-indigo-800 sm:text-base"
                  >
                    Xem lịch lớp →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SCHEDULE SECTION */}
        <section id="schedule" className="scroll-mt-24 bg-[#111B3C] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-wider text-amber-300">Một ngày tại {selectedCampus}</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                  Lịch học linh hoạt, phù hợp mọi lứa tuổi
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  Bốn ca từ 8:30 đến 21:00. Học bù trong tuần và bảo lưu học phí đến 6 tháng.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openRegister('', `Xin thời khóa biểu tại ${selectedCampus}`)}
                className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:bg-amber-300 sm:text-base"
              >
                Nhận thời khóa biểu <ArrowRight aria-hidden="true" size={16} />
              </button>
            </div>

            <ol className="relative mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              <span className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-white/25 lg:block" aria-hidden="true" />
              {[
                {
                  time: '8:30',
                  until: '10:30',
                  name: 'Ca sáng',
                  days: 'Thứ 7 và Chủ Nhật',
                  classes: ['English Explorers', 'Phản xạ hè', 'Người đi làm ca gãy'],
                  icon: Sparkles,
                  chip: 'bg-amber-400 text-slate-950',
                },
                {
                  time: '14:30',
                  until: '16:30',
                  name: 'Ca chiều',
                  days: 'T2, T4, T6 hoặc cuối tuần',
                  classes: ['Cambridge Starters–Flyers', 'CLB kể chuyện', 'Kịch nghệ'],
                  icon: BookOpen,
                  chip: 'bg-cyan-300 text-slate-950',
                },
                {
                  time: '17:45',
                  until: '19:15',
                  name: 'Tối sớm',
                  days: 'Tất cả các ngày',
                  classes: ['Bright Stars', 'Ngữ pháp THCS', 'Ôn lớp 10 chuyên Anh'],
                  icon: Clock3,
                  chip: 'bg-violet-300 text-slate-950',
                },
                {
                  time: '19:30',
                  until: '21:00',
                  name: 'Tối muộn',
                  days: 'T3, T5, T7 hoặc cuối tuần',
                  classes: ['IELTS Breakthrough', 'IELTS Mastery 7.0+', 'Giao tiếp công sở'],
                  icon: Target,
                  chip: 'bg-white text-slate-950',
                },
              ].map((slot) => {
                const Icon = slot.icon
                return (
                  <li key={slot.time} className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <span className={`relative z-10 grid size-12 place-items-center rounded-2xl ${slot.chip}`}>
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <p className="mt-5 text-4xl font-black tracking-tight">{slot.time}</p>
                    <p className="mt-1 text-sm font-bold text-slate-300">đến {slot.until} · {slot.name}</p>
                    <p className="mt-4 text-sm font-bold text-amber-200">{slot.days}</p>
                    <ul className="mt-3 flex flex-1 flex-col gap-1.5 text-sm text-slate-200">
                      {slot.classes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ol>

            <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              <CheckCircle2 aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-amber-300" />
              Bận một buổi thì học bù ở ca tương đương trong tuần. Ca cụ thể được xác nhận khi gọi lại.
            </p>
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
                  <CheckCircle2 size={16} /> Cam kết, nếu có, được ghi trong hợp đồng sau bài test.
                </div>
              </div>

              {/* Scrim-protected campus card for high text contrast */}
              <div className="group relative min-h-[260px] overflow-hidden rounded-[26px] md:col-span-2 shadow-md">
                <FrameImage
                  id="space-why"
                  alt="Minh họa không gian học"
                  width={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="media-zoom object-cover"
                />
                {/* Dark gradient scrim ensures contrast > 7:1 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <span className="rounded-md bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-300 border border-amber-300/30">
                    Minh họa, chưa phải ảnh cơ sở
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
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0A192F] sm:text-3xl lg:text-4xl">
                  Hai cơ sở
                </h2>
              </div>
              <a href="#start" className="inline-flex min-h-11 items-center text-sm sm:text-base font-bold text-indigo-800 hover:text-indigo-900">
                Ghé thăm trực tiếp cơ sở <ArrowRight aria-hidden="true" className="ml-1.5" size={16} />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Chọn cơ sở">
              {BRANCHES.map((branch) => {
                const campus = branch.name.includes('Hà Nội') ? 'Cầu Giấy, Hà Nội' : 'Gò Vấp, TP.HCM'
                const selected = selectedCampus === campus
                return (
                  <button
                    key={branch.name}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setSelectedCampus(campus)}
                    className={`h-11 rounded-full px-4 text-sm font-bold ${selected ? 'bg-[#0A192F] text-white' : 'border border-slate-200 bg-white text-slate-700'}`}
                  >
                    {campus}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Học phí niêm yết trên trang giống nhau ở hai cơ sở. Lịch khai giảng có thể khác và được xác nhận khi gọi lại. Video lớp học sẽ được nhúng khi trung tâm cung cấp bản ghi.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <iframe
                title={`Bản đồ ${selectedCampus}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(BRANCHES.find((branch) => branch.name.includes(selectedCampus.includes('Hà Nội') ? 'Hà Nội' : 'HCM'))?.address || '')}&z=16&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-8 grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:grid-cols-4">
              {CAMPUS_PHOTOS.map((item, i) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl shadow-sm ${
                    i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                  }`}
                >
                  <FrameImage
                    id={item.id}
                    alt={item.alt}
                    width={900}
                    sizes={i === 0 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
                    className={`${i === 0 ? 'media-pan' : 'media-zoom'} object-cover`}
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
            <div className="relative mt-6 h-44 overflow-hidden rounded-2xl sm:h-56">
              <FrameImage
                id="start-visit"
                alt="Minh họa ba bước bắt đầu"
                width={1200}
                sizes="(max-width: 1024px) 100vw, 1100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 text-base font-bold text-white sm:text-lg">
                Chọn khóa, làm bài test, rồi giữ lịch học thử.
              </p>
            </div>

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
                  className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-indigo-700 hover:text-indigo-900 sm:text-base"
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
                  className="mt-5 inline-flex min-h-11 cursor-pointer items-center text-left text-sm font-bold text-indigo-700 hover:text-indigo-900 sm:text-base"
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
                    Để lại khóa, độ tuổi, cơ sở và khung giờ gọi lại. Tư vấn viên xác nhận lịch học thử sau khi nhận yêu cầu.
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
                    className="mt-1 inline-flex min-h-11 items-center gap-1 pl-5 text-xs font-semibold text-indigo-600 hover:underline sm:text-sm"
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
              <a href="#home" className="inline-flex min-h-11 items-center gap-2.5">
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
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  Facebook Page
                </a>
                <a
                  href="https://zalo.me/19006868"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  Zalo OA
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">Khám phá</h4>
              <nav className="mt-4 flex flex-col gap-1 text-sm sm:text-base text-slate-400">
                <a className="inline-flex min-h-11 items-center hover:text-white transition-colors" href="#offers">
                  Ưu đãi học phí
                </a>
                <a className="inline-flex min-h-11 items-center hover:text-white transition-colors" href="#who">
                  Chương trình theo độ tuổi
                </a>
                <a className="inline-flex min-h-11 items-center hover:text-white transition-colors" href="#courses">
                  Danh sách khóa học
                </a>
                <a className="inline-flex min-h-11 items-center hover:text-white transition-colors" href="#teachers">
                  Đội ngũ giáo viên
                </a>
                <a className="inline-flex min-h-11 items-center hover:text-white transition-colors" href="#schedule">
                  Lịch học & ca học
                </a>
                <a className="inline-flex min-h-11 items-center hover:text-white transition-colors" href="#stories">
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
                      className="mt-0.5 inline-flex min-h-11 items-center gap-1 text-xs text-cyan-300 hover:underline sm:text-sm"
                    >
                      Xem bản đồ <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
                <a className="inline-flex min-h-11 items-center gap-2 hover:text-white text-sm sm:text-base text-slate-300 font-medium" href="tel:19006868">
                  <Phone aria-hidden="true" size={14} className="text-amber-400" /> Hotline: <strong className="text-white">1900 6868</strong>
                </a>
                <a className="inline-flex min-h-11 items-center gap-2 hover:text-white text-sm sm:text-base text-slate-300" href="mailto:hello@brightenglish.vn">
                  <Mail aria-hidden="true" size={14} className="text-indigo-400" /> hello@brightenglish.vn
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">Bí kíp học tiếng Anh</h4>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
                Một email mỗi tháng: một mẹo học ngắn và lịch khai giảng. Không có blog riêng trên trang này.
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
                      name="email"
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value)
                        e.currentTarget.setCustomValidity('')
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
      <div className="fixed right-4 z-40 flex flex-col gap-2.5 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] md:bottom-8 md:right-8">
        <a
          href="https://zalo.me/19006868"
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
      {detailCourse && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/60" role="presentation" onClick={() => setDetailCourse(null)}>
          <div className="flex min-h-full items-center justify-center p-4">
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="course-detail-title"
              className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="course-detail-title" className="pr-10 text-2xl font-black text-[#0A192F]">{detailCourse.title}</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="font-bold text-slate-500">Tuổi</dt><dd className="font-semibold">{detailCourse.targetAge}</dd></div>
                <div><dt className="font-bold text-slate-500">Thời lượng</dt><dd className="font-semibold">{detailCourse.duration}</dd></div>
                <div><dt className="font-bold text-slate-500">Nhịp học</dt><dd className="font-semibold">{detailCourse.sessions}</dd></div>
                <div><dt className="font-bold text-slate-500">Sĩ số</dt><dd className="font-semibold">{detailCourse.classSize}</dd></div>
              </dl>
              <p className="mt-4 text-base leading-relaxed text-slate-700">{detailCourse.description}</p>
              <p className="mt-2 text-base leading-relaxed text-slate-700"><strong>Đầu ra mô tả:</strong> {detailCourse.outcome}</p>
              <p className="mt-2 text-base font-bold text-[#0A192F]">Học phí: {detailCourse.price}{detailCourse.discountNote ? ` (${detailCourse.discountNote})` : ''}</p>
              <p className="mt-2 text-sm text-slate-600">Lịch theo ca sáng, chiều hoặc tối tại {selectedCampus}. Ca cụ thể gửi khi gọi lại.</p>
              <div className="mt-5 flex gap-2">
                <button type="button" onClick={() => setDetailCourse(null)} className="h-11 flex-1 rounded-xl border border-slate-200 font-bold">Đóng</button>
                <button
                  type="button"
                  onClick={() => {
                    const title = detailCourse.title
                    setDetailCourse(null)
                    openRegister(title, `Xem chi tiết khóa ${title} tại ${selectedCampus}`)
                  }}
                  className="h-11 flex-1 rounded-xl bg-indigo-600 font-bold text-white"
                >
                  Đăng ký học thử
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      {modal === 'register' && (
        <RegistrationModal
          onClose={() => setModal(null)}
          initialCourse={selectedCourse}
          initialNote={selectedNote}
          initialCampus={selectedCampus}
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
