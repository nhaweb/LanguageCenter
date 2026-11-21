'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  CalendarCheck,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  GraduationCap,
  Headphones,
  HelpCircle,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Percent,
  Phone,
  Play,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { RegistrationModal, COURSE_OPTIONS } from '@/components/registration-modal'
import { QuizModal } from '@/components/quiz-modal'
import { CourseDetailModal, type CourseDetailData } from '@/components/course-detail-modal'

const COURSES: CourseDetailData[] = [
  {
    title: 'English Explorers',
    level: 'Mầm non · 4–6 tuổi',
    category: 'Mầm non',
    ageGroupId: 'kids',
    image: 'photo-1587654780291-39c9404d746b',
    gallery: [
      { id: 'photo-1587654780291-39c9404d746b', caption: 'Lớp học vận động Phonics & TPR' },
      { id: 'photo-1503454537195-1dcabb73ffb9', caption: 'Sân khấu kể chuyện Storytelling' },
      { id: 'photo-1580582932707-520aed937b7b', caption: 'Góc sáng tạo STEAM tiếng Anh' },
    ],
    badge: 'Bé yêu thích',
    rating: '4.9',
    duration: '8 tháng (2 buổi/tuần)',
    price: 'Từ 1.590.000đ/tháng',
    color: 'bg-amber-100 text-amber-900 border-amber-200',
    description:
      'Học tiếng Anh qua bài hát, trò chơi vận động và kể chuyện tương tác, giúp bé phản xạ tự nhiên như tiếng mẹ đẻ.',
    targetAge: '4–6 tuổi',
    cefrLevel: 'Pre-A1 Phonics',
    curriculum: 'National Geographic Look & Phonics',
    classFormat: '8–10 bé + 1 GV bản ngữ + 1 Trợ giảng',
    outcomes: [
      'Phát âm chuẩn 44 âm Phonics cơ bản qua vận động và bài hát',
      'Nắm vững 350+ từ vựng chủ đề gia đình, màu sắc, động vật, thế giới quanh bé',
      'Phản xạ hỏi đáp câu ngắn tự nhiên với giáo viên bản ngữ không rụt rè',
      'Báo cáo video phát âm của bé gửi phụ huynh sau mỗi tuần học',
    ],
    modules: [
      {
        title: 'Phonics & Sounds Adventure',
        detail: 'Làm quen âm vần tiếng Anh qua vận động TPR, thẻ hình trực quan và bài hát sinh động.',
      },
      {
        title: 'Storytelling & Show Time',
        detail: 'Đóng kịch, kể chuyện tranh và tập thuyết trình mini trước lớp để rèn sự dạn dĩ.',
      },
    ],
  },
  {
    title: 'Bright Stars',
    level: 'Tiểu học · 6–11 tuổi',
    category: 'Tiểu học',
    ageGroupId: 'primary',
    image: 'photo-1509062522246-3755977927d7',
    gallery: [
      { id: 'photo-1509062522246-3755977927d7', caption: 'Phòng học Smartboard 4K tương tác' },
      { id: 'photo-1577896851231-70ef18881754', caption: 'Thảo luận nhóm & Dự án khoa học' },
      { id: 'photo-1544717302-de2939b7ef71', caption: 'Thực hành thuyết trình cùng GV bản ngữ' },
    ],
    badge: 'Hot trend',
    rating: '5.0',
    duration: '10 tháng (2 buổi/tuần)',
    price: 'Từ 1.790.000đ/tháng',
    color: 'bg-rose-100 text-rose-900 border-rose-200',
    description:
      'Xây dựng nền tảng ngữ pháp vững chắc kết hợp 4 kỹ năng Nghe - Nói - Đọc - Viết, tự tin dẫn đầu trên lớp.',
    targetAge: '6–11 tuổi',
    cefrLevel: 'CEFR A1–A2',
    curriculum: 'Cambridge Global English & Oxford Discover',
    classFormat: '10–12 học viên/lớp',
    outcomes: [
      'Toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết và ngữ pháp theo khung Bộ GD&ĐT & Quốc tế',
      'Tự tin thuyết trình chủ đề khoa học, xã hội dài 3–5 phút bằng tiếng Anh',
      'Đạt điểm 9–10 môn tiếng Anh tại trường phổ thông và sẵn sàng thi Cambridge',
      'Kèm bổ trợ 1-1 miễn phí với trợ giảng nếu con cần ôn tập trước kỳ thi học kỳ',
    ],
    modules: [
      {
        title: 'Core Grammar & Reading Skills',
        detail: 'Hệ thống hóa ngữ pháp trực quan qua sơ đồ tư duy Mindmap và đọc hiểu văn bản đa chủ đề.',
      },
      {
        title: 'Project-Based Speaking',
        detail: 'Thực hiện dự án nhóm, thuyết trình và phản biện giúp con dùng tiếng Anh linh hoạt.',
      },
    ],
  },
  {
    title: 'Cambridge Champions',
    level: 'Starters · Movers · Flyers',
    category: 'Tiểu học',
    ageGroupId: 'primary',
    image: 'photo-1503676260728-1c00da094a0b',
    gallery: [
      { id: 'photo-1503676260728-1c00da094a0b', caption: 'Luyện chuẩn 15 khiên Cambridge YLE' },
      { id: 'photo-1588072432836-e10032774350', caption: 'Phỏng vấn Speaking 1-1 cùng Giám khảo' },
      { id: 'photo-1498243691581-b145c3f54a5a', caption: 'Thư viện 3.000+ sách đọc phân cấp CEFR' },
    ],
    badge: 'Ưu đãi tháng này',
    rating: '4.9',
    duration: '8 tháng (2 buổi/tuần)',
    price: 'Từ 1.690.000đ/tháng',
    originalPrice: '2.190.000đ/tháng',
    color: 'bg-amber-200 text-amber-950 border-amber-300',
    description:
      'Luyện thi chứng chỉ quốc tế Cambridge chuẩn hóa, cam kết 13–15 khiên tối đa cho từng cấp độ.',
    targetAge: '7–12 tuổi',
    cefrLevel: 'Cambridge YLE (A1–A2+)',
    curriculum: 'Cambridge Official Exam Preparation',
    classFormat: '8–12 học viên/lớp',
    outcomes: [
      'Cam kết đầu ra 13–15 khiên tối đa cho từng cấp độ Starters, Movers, Flyers bằng hợp đồng',
      'Thi thử phòng máy và phỏng vấn Speaking 1-1 định kỳ hàng tháng cùng giám khảo quốc tế',
      'Tạo hồ sơ năng lực ưu thế vượt trội khi xét tuyển vào các trường THCS Chất lượng cao / Song ngữ',
      'Học lại hoàn toàn miễn phí nếu chưa đạt số khiên cam kết',
    ],
    modules: [
      {
        title: 'Cambridge Listening & Reading Mastery',
        detail: 'Nắm trọn từ vựng, cấu trúc bẫy thường gặp và chiến thuật phân bổ thời gian làm bài.',
      },
      {
        title: '1-on-1 Speaking Mock Tests',
        detail: 'Thực hành phỏng vấn trực tiếp theo đúng quy chuẩn phòng thi Hội đồng Anh & Cambridge.',
      },
    ],
  },
  {
    title: 'IELTS Breakthrough',
    level: 'IELTS Foundation · 12–17 tuổi',
    category: 'THCS & IELTS',
    ageGroupId: 'secondary',
    image: 'photo-1523240795612-9a054b0db644',
    gallery: [
      { id: 'photo-1523240795612-9a054b0db644', caption: 'Tranh biện học thuật & Critical Thinking' },
      { id: 'photo-1524995997946-a1c2e315a42f', caption: 'Chấm chữa Writing 1-kèm-1 hàng tuần' },
      { id: 'photo-1521587760476-6c12a4b040da', caption: 'Kho học liệu Mindset for IELTS chuẩn hóa' },
    ],
    badge: 'Cam kết đầu ra',
    rating: '4.9',
    duration: '6 tháng (3 buổi/tuần)',
    price: 'Từ 2.490.000đ/tháng',
    color: 'bg-violet-100 text-violet-900 border-violet-200',
    description:
      'Xây nền tảng tư duy học thuật, chiến lược giải đề thực chiến và bứt phá band điểm từ 4.5 lên 6.5+.',
    targetAge: '12–17 tuổi',
    cefrLevel: 'CEFR B1–B2 (IELTS 6.0–6.5+)',
    curriculum: 'Mindset for IELTS (Cambridge) & Academic Bank',
    classFormat: '8–12 học viên/lớp',
    outcomes: [
      'Cam kết đầu ra IELTS 6.0–6.5+ bằng văn bản, miễn thi và quy đổi điểm 10 tiếng Anh THPT',
      'Chấm chữa chi tiết từng bài Writing Task 1 & Task 2 theo 4 tiêu chí chấm thi IDP/BC',
      'Rèn tư duy Critical Thinking để trả lời Speaking Part 2 & Part 3 tự nhiên, không học vẹt',
      'Bổ trợ song song kiến thức ôn thi vào lớp 10 chuyên Anh và học sinh giỏi cấp Thành phố',
    ],
    modules: [
      {
        title: 'Academic Vocabulary & Listening/Reading Tactics',
        detail: 'Xây dựng vốn từ học thuật theo 12 chủ đề trọng tâm và kỹ thuật Skimming/Scanning tốc độ cao.',
      },
      {
        title: 'Writing & Speaking Intensive Clinic',
        detail: 'Sửa lỗi phát âm, ngữ điệu và cấu trúc bài luận học thuật 1-kèm-1 hàng tuần.',
      },
    ],
  },
  {
    title: 'IELTS Mastery 7.0+',
    level: 'IELTS Advanced · 15+ tuổi',
    category: 'THCS & IELTS',
    ageGroupId: 'ielts',
    image: 'photo-1434030216411-0b793f4b4173',
    gallery: [
      { id: 'photo-1434030216411-0b793f4b4173', caption: 'Chiến thuật giải đề 7.5–8.5+ thực chiến' },
      { id: 'photo-1524178232363-1fb2b075b655', caption: 'Cố vấn 1-1 cùng Cựu giám khảo chấm thi' },
      { id: 'photo-1517245386807-bb43f82c33c4', caption: 'Hội thảo săn học bổng du học toàn phần' },
    ],
    badge: 'Giảm 35%',
    rating: '5.0',
    duration: '5 tháng (3 buổi/tuần)',
    price: 'Từ 2.990.000đ/tháng',
    originalPrice: '4.600.000đ/tháng',
    color: 'bg-amber-200 text-amber-950 border-amber-300',
    description:
      'Chinh phục band điểm 7.0–8.0+ cùng cựu giám khảo chấm thi. Hỗ trợ săn học bổng du học và xét tuyển đại học top đầu.',
    targetAge: '15+ tuổi',
    cefrLevel: 'CEFR C1 (IELTS 7.0–8.0+)',
    curriculum: 'Cambridge IELTS Intensive & Examiner Rubric',
    classFormat: '8–10 học viên/lớp',
    outcomes: [
      'Cam kết đầu ra IELTS Overall 7.0–8.0+ (không kỹ năng nào dưới 6.5) bằng hợp đồng đào tạo',
      'Trực tiếp cựu giám khảo chấm thi sửa bài Speaking & Writing chuyên sâu hàng tuần',
      'Tặng gói tư vấn sửa bài luận Personal Statement săn học bổng du học & xét tuyển ĐH Top đầu',
      'Truy cập không giới hạn phòng thi thử IELTS trên máy tính (Computer-delivered IELTS)',
    ],
    modules: [
      {
        title: 'Band 8.0+ Writing & Lexical Resource',
        detail: 'Nâng cấp collocations học thuật, cấu trúc câu phức và lập luận sắc bén đạt chuẩn C1–C2.',
      },
      {
        title: 'Examiner Mock Interviews & Full Tests',
        detail: 'Luyện đề sát thực tế 100% và phân tích chiến thuật nâng band điểm trực tiếp với chuyên gia.',
      },
    ],
  },
  {
    title: 'Speak with Confidence',
    level: 'Giao tiếp · Người đi làm',
    category: 'Người đi làm',
    ageGroupId: 'adults',
    image: 'photo-1521737711867-e3b97375f902',
    gallery: [
      { id: 'photo-1521737711867-e3b97375f902', caption: 'Thực hành thuyết trình & Đàm phán quốc tế' },
      { id: 'photo-1522202176988-66273c2fd55f', caption: 'Thảo luận Case-study doanh nghiệp thực tế' },
      { id: 'photo-1531482615713-2afd69097998', caption: 'Coaching 1-1 chuẩn hóa ngữ điệu & Email' },
    ],
    badge: 'Lịch linh hoạt',
    rating: '4.8',
    duration: '4 tháng (2 buổi/tuần)',
    price: 'Từ 1.990.000đ/tháng',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    description:
      'Luyện phản xạ nói trôi chảy, viết email công sở, thuyết trình tiếng Anh và tự tin trao đổi trong môi trường đa quốc gia.',
    targetAge: 'Người đi làm & SV',
    cefrLevel: 'CEFR B1–B2 Business',
    curriculum: ' Harvard Business Communication & Keynote',
    classFormat: '8–10 học viên/lớp (Linh hoạt ca học)',
    outcomes: [
      'Phản xạ giao tiếp tiếng Anh trôi chảy trong họp hành, phỏng vấn và tiếp khách quốc tế',
      'Làm chủ kỹ năng viết Email thương mại, báo cáo và thuyết trình dự án chuyên nghiệp',
      'Chính sách đặt lịch và học bù linh hoạt 100% cho người đi làm bận rộn, không lo mất buổi',
      'Tham gia miễn phí CLB Business Networking cuối tuần cùng chuyên gia nước ngoài',
    ],
    modules: [
      {
        title: 'Pronunciation & Workplace Fluency',
        detail: 'Chuẩn hóa ngữ điệu, nối âm và thực hành phản xạ qua 40+ tình huống công sở thực tế.',
      },
      {
        title: 'Pitching, Negotiation & Business Writing',
        detail: 'Thực hành thuyết trình, đàm phán hợp đồng và viết email chuyên nghiệp chuẩn quốc tế.',
      },
    ],
  },
]

const HERO_SLIDES = [
  {
    id: 'slide-joy',
    tag: 'Learn with Joy · Mầm non & Tiểu học',
    title: 'Học vui phản xạ tự nhiên mỗi ngày',
    sub: '100% giáo viên bản ngữ khơi dậy niềm say mê ngôn ngữ qua vận động TPR và kể chuyện',
    mainImage: 'photo-1503454537195-1dcabb73ffb9',
    topRightImage: 'photo-1587654780291-39c9404d746b',
    bottomRightImage: 'photo-1509062522246-3755977927d7',
  },
  {
    id: 'slide-ielts',
    tag: 'IELTS Mastery 8.0+ · Học thuật Chuyên sâu',
    title: 'Bứt phá band điểm cùng Cựu giám khảo',
    sub: 'Chấm chữa 1-kèm-1 từng bài luận Writing và phỏng vấn Speaking theo chuẩn IDP & BC',
    mainImage: 'photo-1523240795612-9a054b0db644',
    topRightImage: 'photo-1434030216411-0b793f4b4173',
    bottomRightImage: 'photo-1524178232363-1fb2b075b655',
  },
  {
    id: 'slide-cambridge',
    tag: 'Cambridge Champions · 15/15 Khiên',
    title: 'Chinh phục chứng chỉ quốc tế từ sớm',
    sub: 'Cam kết đầu ra Starters, Movers, Flyers bằng hợp đồng đào tạo minh bạch',
    mainImage: 'photo-1503676260728-1c00da094a0b',
    topRightImage: 'photo-1577896851231-70ef18881754',
    bottomRightImage: 'photo-1588072432836-e10032774350',
  },
  {
    id: 'slide-business',
    tag: 'Executive English · Sinh viên & Đi làm',
    title: 'Tự tin thuyết trình & Đàm phán toàn cầu',
    sub: 'Thực hành 40+ tình huống công sở thực chiến và giao lưu CLB Business cuối tuần',
    mainImage: 'photo-1521737711867-e3b97375f902',
    topRightImage: 'photo-1522202176988-66273c2fd55f',
    bottomRightImage: 'photo-1517245386807-bb43f82c33c4',
  },
]

const AGE_PROGRAMS = [
  {
    id: 'kids' as const,
    step: '01',
    title: 'Mầm non',
    ages: '4–6 tuổi',
    cefr: 'Pre-A1 · Phonics',
    detail: 'Khám phá âm vần Phonics & phản xạ nghe nói tự nhiên qua vận động TPR',
    highlight: 'Phát âm chuẩn bản xứ từ đầu đời',
    filter: 'Mầm non' as const,
    image: 'photo-1587654780291-39c9404d746b',
    coursesCount: '1 khóa chuyên sâu',
  },
  {
    id: 'primary' as const,
    step: '02',
    title: 'Tiểu học',
    ages: '6–11 tuổi',
    cefr: 'CEFR A1–A2 · YLE',
    detail: 'Giao tiếp tự tin, vững ngữ pháp & chinh phục 15 khiên Cambridge',
    highlight: 'Starters · Movers · Flyers',
    filter: 'Tiểu học' as const,
    image: 'photo-1503676260728-1c00da094a0b',
    coursesCount: '2 khóa học',
  },
  {
    id: 'secondary' as const,
    step: '03',
    title: 'THCS Học thuật',
    ages: '12–15 tuổi',
    cefr: 'CEFR B1–B2 · IELTS',
    detail: 'Tư duy phản biện học thuật, viết luận & nền tảng IELTS 6.0–6.5+',
    highlight: 'Ôn chuyên Anh & IELTS Foundation',
    filter: 'THCS & IELTS' as const,
    image: 'photo-1523240795612-9a054b0db644',
    coursesCount: '2 lộ trình IELTS',
  },
  {
    id: 'ielts' as const,
    step: '04',
    title: 'THPT & IELTS',
    ages: '15+ tuổi',
    cefr: 'CEFR C1 · IELTS 7.5+',
    detail: 'Thực chiến đề thi cùng cựu giám khảo, săn học bổng & xét tuyển ĐH',
    highlight: 'Cam kết đầu ra 7.0–8.0+',
    filter: 'THCS & IELTS' as const,
    image: 'photo-1434030216411-0b793f4b4173',
    coursesCount: '2 lộ trình IELTS',
  },
  {
    id: 'adults' as const,
    step: '05',
    title: 'Người đi làm',
    ages: 'Sinh viên & Đi làm',
    cefr: 'CEFR B1–C1 · Business',
    detail: 'Thuyết trình, viết email thương mại & đàm phán trong môi trường quốc tế',
    highlight: '100% Tình huống công sở thực tế',
    filter: 'Người đi làm' as const,
    image: 'photo-1522202176988-66273c2fd55f',
    coursesCount: '1 khóa chuyên sâu',
  },
]

type TeacherProfile = {
  id: string
  name: string
  nationality: string
  role: string
  creds: string
  image: string
  rating: string
  teachingHours: string
  experience: string
  badge: string
  methodology: string
  studentValues: string[]
  specialties: string[]
  quote: string
  coursesTaught: string[]
}

const TEACHERS: TeacherProfile[] = [
  {
    id: 'mark-wilson',
    name: 'Thầy Mark Wilson',
    nationality: 'Anh Quốc (UK)',
    role: 'Giám đốc Học thuật & Chuyên gia Khảo thí IELTS',
    creds: 'Thạc sĩ TESOL (ĐH Manchester) · CELTA Cambridge · Cựu Giám khảo Speaking',
    image: 'photo-1560250097-0b93528c311a',
    rating: '4.99',
    teachingHours: '12.500+ Giờ Giảng Dạy',
    experience: '12+ năm dẫn dắt học thuật & chấm thi chuẩn Cambridge tại châu Á',
    badge: 'Cựu giám khảo khảo thí',
    methodology:
      'Ứng dụng phương pháp Tư duy Học thuật Phản biện (Critical Academic Thinking), giúp học viên hiểu sâu bản chất tiêu chí chấm thi của giám khảo để nâng 1.5–2.0 band điểm thực chất.',
    studentValues: [
      'Trực tiếp chấm chữa 1-1 cấu trúc luận Writing Task 2 & phản xạ Speaking Part 3',
      'Xây dựng lập luận sắc bén để chinh phục IELTS 7.5–8.5+ & săn học bổng du học',
      'Khắc phục triệt để lỗi dịch từng từ (word-by-word) từ tiếng Việt sang tiếng Anh',
    ],
    specialties: ['IELTS Writing & Speaking 8.0+', 'Tư duy Phản biện', 'Sửa luận Học bổng'],
    quote:
      'Tiếng Anh là chiếc cầu nối mở ra cánh cửa tri thức thế giới, chứ không đơn thuần là một bài kiểm tra trên giấy.',
    coursesTaught: ['IELTS Mastery 7.0+', 'IELTS Breakthrough'],
  },
  {
    id: 'sarah-jenkins',
    name: 'Cô Sarah Jenkins',
    nationality: 'Canada',
    role: 'Trưởng ban Đào tạo Mầm non & Tiểu học Cambridge',
    creds: 'Cử nhân Sư phạm Tiểu học (B.Ed) · TEYL Quốc tế · Chuyên gia Tâm lý Trẻ em',
    image: 'photo-1573496359142-b8d87734a5a2',
    rating: '5.0',
    teachingHours: '8.400+ Giờ Đào Tạo Trẻ Em',
    experience: '9+ năm khơi dậy phản xạ tự nhiên và luyện thi 15 khiên Cambridge',
    badge: 'Bé yêu thích nhất',
    methodology:
      'Kết hợp phương pháp Phản xạ Vận động Toàn diện (TPR) và Kể chuyện Tương tác (Interactive Storytelling), biến mỗi giờ học thành không gian khám phá giúp trẻ yêu thích tiếng Anh tự nhiên.',
    studentValues: [
      'Chuẩn hóa 44 âm vị Phonics giúp con phát âm tự nhiên như trẻ bản xứ từ nhỏ',
      'Khai mở sự dạn dĩ cho các bé rụt rè, tự tin thuyết trình tiếng Anh sau 8 tuần',
      'Đào tạo hơn 600+ học viên nhí đạt tối đa 14–15 khiên Starters, Movers, Flyers',
    ],
    specialties: ['Phonics & TPR Mầm non', 'Cambridge 15 Khiên', 'Thuyết trình Nhí'],
    quote:
      'Mỗi đứa trẻ đều có nhịp học riêng. Khi việc học tràn ngập niềm vui và sự khích lệ, sự tiến bộ sẽ đến một cách diệu kỳ.',
    coursesTaught: ['English Explorers', 'Bright Stars', 'Cambridge Champions'],
  },
  {
    id: 'alex-miller',
    name: 'Thầy Alex Miller',
    nationality: 'Úc (Australia)',
    role: 'Chuyên gia Chiến lược IELTS 8.0+ & Học thuật THCS/THPT',
    creds: 'IELTS 9.0 Overall · CELTA Cambridge · Thạc sĩ Ngôn ngữ học Ứng dụng',
    image: 'photo-1556157382-97eda2d62296',
    rating: '4.98',
    teachingHours: '10.200+ Giờ Luyện Thi IELTS',
    experience: '10+ năm chuyên sâu bứt phá band điểm 7.0–8.5+ cho học sinh Việt Nam',
    badge: 'Đào tạo 500+ học viên 7.0+',
    methodology:
      'Chuyên sâu phương pháp Lexical Approach & Mindmap Học thuật, giúp học sinh cấp 2–3 làm chủ hệ thống từ vựng C1–C2 và giải quyết các dạng đề Reading/Listening hóc búa trong thời gian ngắn nhất.',
    studentValues: [
      'Nâng điểm Reading & Listening lên 8.0–9.0 nhờ kỹ thuật phân tích bẫy logic',
      'Hệ thống hóa từ vựng học thuật theo chủ đề giúp nhớ sâu ngay tại lớp không cần học vẹt',
      'Đã đồng hành cùng 500+ học sinh đạt IELTS 7.0–8.0+ xét tuyển thẳng Đại học Top đầu',
    ],
    specialties: ['Chiến thuật IELTS 8.0+', 'Lexical Approach', 'Academic Reading/Listening'],
    quote:
      'Tư duy logic và phản xạ ngôn ngữ tự nhiên quan trọng hơn việc học vẹt từ vựng hay các mẹo làm bài rập khuôn.',
    coursesTaught: ['IELTS Breakthrough', 'IELTS Mastery 7.0+'],
  },
  {
    id: 'emma-reynolds',
    name: 'Cô Emma Reynolds',
    nationality: 'Hoa Kỳ (USA)',
    role: 'Chuyên gia Giao tiếp Doanh nghiệp & Huấn luyện Phát âm',
    creds: 'MA Applied Linguistics (UCLA) · TESOL · Executive Communication Coach',
    image: 'photo-1573497019940-1c28c88b4f3e',
    rating: '4.98',
    teachingHours: '7.800+ Giờ Huấn Luyện Giao Tiếp',
    experience: '8+ năm chuẩn hóa ngữ điệu Mỹ & đào tạo thuyết trình đa quốc gia',
    badge: 'Huấn luyện viên Accent',
    methodology:
      'Áp dụng mô hình Khai vấn Ngôn ngữ (Language Coaching) kết hợp tình huống thực chiến công sở (Case-study Roleplay), giúp người đi làm xóa bỏ tâm lý ngập ngừng và làm chủ ngữ điệu thuyết phục.',
    studentValues: [
      'Chỉnh sửa tận gốc khẩu hình, trọng âm câu và kỹ thuật nối âm chuẩn giọng Mỹ (American Accent)',
      'Thực hành đàm phán, chủ trì cuộc họp và thuyết trình dự án với đối tác nước ngoài',
      'Nâng cấp văn phong viết Email thương mại & báo cáo chuyên nghiệp chỉ sau 1 khóa học',
    ],
    specialties: ['Chuẩn hóa IPA & Ngữ điệu Mỹ', 'Business Pitching', 'Phản xạ Công sở'],
    quote:
      'Sự tự tin cất lời cùng ngữ điệu truyền cảm chính là vũ khí quyền lực nhất để bạn tỏa sáng trong mọi môi trường quốc tế.',
    coursesTaught: ['Speak with Confidence', 'IELTS Mastery 7.0+'],
  },
]

type CampusPhotoItem = {
  id: string
  title: string
  tag: string
  desc: string
}

type CampusTopic = {
  id: string
  topicKey: string
  badge: string
  alt: string
  caption: string
  sub: string
  description: string
  highlights: string[]
  album: CampusPhotoItem[]
}

const CAMPUS_PHOTOS: CampusTopic[] = [
  {
    id: 'photo-1509062522246-3755977927d7',
    topicKey: 'smart-classroom',
    badge: 'Chuẩn Cambridge & IELTS',
    alt: 'Phòng học tương tác thông minh tại PML English',
    caption: 'Phòng học tương tác thông minh',
    sub: 'Trang bị bảng tương tác 4K & thiết bị học chuẩn Cambridge',
    description:
      '100% phòng học được thiết kế theo tiêu chuẩn quốc tế với ánh sáng tự nhiên, cách âm tiêu chuẩn và hệ thống bảng tương tác thông minh giúp bài giảng trực quan, sinh động.',
    highlights: [
      'Bảng tương tác cảm ứng 4K 75-inch & hệ thống âm thanh vòm chuẩn Listening',
      'Sĩ số giới hạn 8–12 học viên/phòng với bàn ghế công thái học xoay nhóm 360°',
      'Hệ thống điều hòa lọc khí tươi & ánh sáng chống cận thị đạt chuẩn học đường',
    ],
    album: [
      {
        id: 'photo-1509062522246-3755977927d7',
        title: 'Phòng học Smartboard Tương tác Đa điểm',
        tag: 'Khu Học Thuật · Tầng 2',
        desc: 'Không gian lớp học tiêu chuẩn 8–12 học viên với bảng cảm ứng thông minh hỗ trợ các hoạt động tương tác trực tiếp cùng giáo viên bản ngữ.',
      },
      {
        id: 'photo-1577896851231-70ef18881754',
        title: 'Không gian Lớp học Thảo luận Sáng tạo',
        tag: 'Phòng Cambridge · Tầng 2',
        desc: 'Thiết kế bàn học mô-đun linh hoạt giúp học viên dễ dàng chuyển đổi từ làm việc cá nhân sang thảo luận nhóm và thuyết trình dự án.',
      },
      {
        id: 'photo-1588072432836-e10032774350',
        title: 'Lớp học Thực hành Phản xạ Nghe – Nói',
        tag: 'Phòng Speaking · Tầng 3',
        desc: 'Trang bị hệ thống tiêu âm và học cụ trực quan giúp từng học viên tự tin phát âm, đóng vai tình huống và được giáo viên sửa lỗi tại chỗ.',
      },
      {
        id: 'photo-1524178232363-1fb2b075b655',
        title: 'Phòng Seminar & Luyện Thi IELTS Chuyên sâu',
        tag: 'Khu IELTS · Tầng 4',
        desc: 'Không gian học thuật yên tĩnh dành riêng cho học viên THCS, THPT và người đi làm rèn luyện kỹ năng Writing & Speaking cường độ cao.',
      },
    ],
  },
  {
    id: 'photo-1498243691581-b145c3f54a5a',
    topicKey: 'library-hub',
    badge: '3.000+ Đầu sách & Lab',
    alt: 'Thư viện mở chuẩn quốc tế tại PML English',
    caption: 'Thư viện sách & Phòng Lab khảo thí',
    sub: 'Hơn 3.000 đầu sách phân cấp theo CEFR & khu thi thử máy tính',
    description:
      'Thư viện mở quy tụ hơn 3.000 đầu sách ngoại văn nhập khẩu từ Oxford, Cambridge, National Geographic cùng khu máy tính thi thử Computer-delivered IELTS miễn phí.',
    highlights: [
      '3.000+ sách truyện, từ điển học thuật và tài liệu Cambridge phân cấp từ Pre-A1 đến C2',
      'Khu Computer Lab mô phỏng 100% giao diện thi IELTS trên máy tính của IDP & BC',
      'Luôn có Trợ giảng học thuật (Teaching Assistant) trực hỗ trợ giải đáp bài tập 1-1',
    ],
    album: [
      {
        id: 'photo-1498243691581-b145c3f54a5a',
        title: 'Thư viện Mở Chuẩn Quốc tế (Open Library)',
        tag: 'Tầng 1 · Khu Học Liệu',
        desc: 'Không gian đọc sách yên tĩnh, ngập tràn ánh sáng với hàng ngàn đầu sách tiếng Anh phân loại theo từng cấp độ CEFR.',
      },
      {
        id: 'photo-1521587760476-6c12a4b040da',
        title: 'Kệ Sách Học Thuật Oxford & Cambridge',
        tag: 'Kho Học Liệu Quốc Tế',
        desc: 'Tuyển tập giáo trình, sách luyện đề IELTS, truyện tranh song ngữ và bách khoa toàn thư giúp học viên mở rộng vốn từ mỗi ngày.',
      },
      {
        id: 'photo-1481627834876-b7833e8f5570',
        title: 'Góc Đọc Sách & Tra Cứu Cá Nhân',
        tag: 'Khu Tự Học · Tầng 1',
        desc: 'Học viên có thể mượn sách về nhà hoặc ngồi ôn luyện trước giờ lên lớp trong không gian yên tĩnh, truyền cảm hứng.',
      },
      {
        id: 'photo-1524995997946-a1c2e315a42f',
        title: 'Khu Kèm Bổ Trợ 1-1 Cùng Trợ Giảng',
        tag: 'Academic Support Desk',
        desc: 'Nơi học viên được cố vấn học tập và trợ giảng IELTS 7.5+ kèm riêng miễn phí để củng cố ngữ pháp và sửa bài viết hàng tuần.',
      },
    ],
  },
  {
    id: 'photo-1523240795612-9a054b0db644',
    topicKey: 'speaking-lounge',
    badge: '100% English Zone',
    alt: 'Khu tự học và thảo luận nhóm sôi nổi tại PML English',
    caption: 'Không gian thảo luận nhóm & CLB',
    sub: 'Môi trường 100% tiếng Anh rèn luyện phản xạ mỗi ngày',
    description:
      'Khu vực Co-learning & English Lounge được thiết kế mở, nơi diễn ra các buổi sinh hoạt CLB tiếng Anh cuối tuần, Debate Club và giao lưu tự do cùng giáo viên bản ngữ.',
    highlights: [
      'Môi trường giao tiếp 100% tiếng Anh (English-Only Zone) giúp xóa bỏ phản xạ dịch ngầm',
      'Tổ chức định kỳ CLB Thuyết trình, Debate học thuật và Business Networking mỗi cuối tuần',
      'Trang bị màn hình trình chiếu, bảng viết ý tưởng và quầy nước tự phục vụ cho học viên',
    ],
    album: [
      {
        id: 'photo-1523240795612-9a054b0db644',
        title: 'Khu Thảo Luận Nhóm & Co-Learning Space',
        tag: 'English Lounge · Tầng 3',
        desc: 'Không gian mở năng động để học viên cùng nhau chuẩn bị bài thuyết trình, làm dự án nhóm và thực hành giao tiếp tiếng Anh.',
      },
      {
        id: 'photo-1522202176988-66273c2fd55f',
        title: 'CLB Phản Biện & Giao Tiếp Cuối Tuần',
        tag: 'Speaking Club · Thứ 7 & CN',
        desc: 'Các buổi thảo luận chuyên đề theo nhóm nhỏ dưới sự dẫn dắt của giáo viên nước ngoài giúp học viên bứt phá sự tự tin.',
      },
      {
        id: 'photo-1517245386807-bb43f82c33c4',
        title: 'Không Gian Thuyết Trình & Workshop Học Thuật',
        tag: 'Hội Trường Mini · Tầng 4',
        desc: 'Sân khấu thu nhỏ nơi học viên rèn luyện kỹ năng Public Speaking, bảo vệ dự án cuối khóa và tham gia hội thảo săn học bổng.',
      },
      {
        id: 'photo-1531482615713-2afd69097998',
        title: 'Góc Kết Nối Học Viên & Cố Vấn 1-1',
        tag: 'Student Hub · Tầng 1',
        desc: 'Khu vực tiếp đón phụ huynh và tư vấn lộ trình cá nhân hóa cùng đội ngũ chuyên gia học thuật tại trung tâm.',
      },
    ],
  },
  {
    id: 'photo-1580582932707-520aed937b7b',
    topicKey: 'creative-kids-zone',
    badge: 'STEAM & Storytelling',
    alt: 'Khu vui chơi trải nghiệm sáng tạo cho học viên nhí',
    caption: 'Khu sáng tạo & trải nghiệm học viên',
    sub: 'Vui học khoa học, kịch nghệ và thuyết trình tiếng Anh',
    description:
      'Thiết kế an toàn, rực rỡ sắc màu dành riêng cho học viên Mầm non & Tiểu học với sàn chống trượt, sân khấu kịch nghệ mini và góc trải nghiệm STEAM bằng tiếng Anh.',
    highlights: [
      'Nội thất bo tròn an toàn tuyệt đối, thảm sàn kháng khuẩn đạt chuẩn trường quốc tế',
      'Sân khấu Mini-Stage cho các hoạt động đóng kịch, kể chuyện (Storytelling) và Show & Tell',
      'Học cụ trực quan, bộ thẻ Flashcard Phonics và góc thủ công sáng tạo bằng tiếng Anh',
    ],
    album: [
      {
        id: 'photo-1580582932707-520aed937b7b',
        title: 'Phòng Học Trải Nghiệm Sáng Tạo Cho Bé',
        tag: 'Kids Zone · Tầng 1',
        desc: 'Không gian rực rỡ, thân thiện giúp các bé 4–11 tuổi luôn hào hứng mỗi khi đến lớp và tiếp thu ngôn ngữ một cách tự nhiên.',
      },
      {
        id: 'photo-1587654780291-39c9404d746b',
        title: 'Góc Thực Hành STEAM & Mỹ Thuật Tiếng Anh',
        tag: 'Creative Corner · Tầng 1',
        desc: 'Bé vừa học từ vựng và mẫu câu tiếng Anh qua các hoạt động vẽ tranh, lắp ráp khoa học và trò chơi tương tác đội nhóm.',
      },
      {
        id: 'photo-1503454537195-1dcabb73ffb9',
        title: 'Sân Khấu Kịch Nghệ & Storytelling Mini',
        tag: 'Show & Tell Stage',
        desc: 'Nơi mỗi học viên nhí được hóa thân vào các nhân vật câu chuyện tiếng Anh, rèn luyện ngữ điệu tự nhiên và phong thái dạn dĩ.',
      },
      {
        id: 'photo-1544717302-de2939b7ef71',
        title: 'Lớp Học Tương Tác Nhóm Nhỏ Cùng Giáo Viên Bản Ngữ',
        tag: 'Phonics Room · Tầng 2',
        desc: 'Giáo viên quốc tế và trợ giảng theo sát từng bé, uốn nắn phát âm Phonics và khích lệ con giao tiếp trọn câu.',
      },
    ],
  },
]

const FAQS = [
  {
    category: 'Học thử & Kiểm tra',
    q: 'Học viên có được học thử trước khi quyết định đóng học phí không?',
    a: 'Hoàn toàn có! PML English tặng mỗi học viên 01 buổi trải nghiệm lớp học thực tế hoàn toàn miễn phí và bài kiểm tra trình độ 1-kèm-1 cùng giáo viên quốc tế để tư vấn đúng năng lực và lộ trình.',
  },
  {
    category: 'Sĩ số & Giáo viên',
    q: 'Sĩ số tối đa trong mỗi lớp học tại trung tâm là bao nhiêu học viên?',
    a: 'Để đảm bảo giáo viên quốc tế có thể tương tác trực tiếp, chỉnh sửa phát âm IPA và theo sát từng học viên, mỗi lớp chỉ duy trì sĩ số vàng từ 8 đến tối đa 12 học viên, luôn có 01 giáo viên bản ngữ và 01 trợ giảng chuyên môn.',
  },
  {
    category: 'Cam kết đầu ra',
    q: 'Trung tâm có cam kết chuẩn đầu ra bằng văn bản hợp đồng không?',
    a: 'Có. Đối với toàn bộ các lộ trình Cambridge (Starters, Movers, Flyers) và IELTS, PML English ký cam kết chuẩn đầu ra bằng hợp đồng đào tạo. Trường hợp học viên tham gia đầy đủ buổi học nhưng chưa đạt mục tiêu sẽ được đào tạo lại hoàn toàn miễn phí.',
  },
  {
    category: 'Học bù & Bảo lưu',
    q: 'Nếu học viên bận việc đột xuất hoặc ốm phải nghỉ học thì xử lý thế nào?',
    a: 'Trung tâm có chính sách học bù 0đ linh hoạt: học viên có thể đặt lịch học bù tại các lớp tương đương trong tuần hoặc được trợ giảng bổ trợ 1-1 kiến thức bài nghỉ. Ngoài ra, trung tâm hỗ trợ bảo lưu học phí lên đến 06 tháng.',
  },
  {
    category: 'Học phí & Trả góp 0%',
    q: 'Chính sách học phí có hỗ trợ trả góp 0% hoặc ưu đãi gia đình không?',
    a: 'PML English hỗ trợ trả góp học phí 0% lãi suất linh hoạt hàng tháng hoặc qua thẻ tín dụng từ 3–12 tháng. Khi đăng ký cho anh chị em trong gia đình hoặc nhóm từ 2 học viên, bạn nhận thêm ưu đãi giảm 10% tổng học phí.',
  },
]

const BRANCHES = [
  {
    name: 'Trụ sở chính: Tân Bình, TP.HCM',
    address: '208 Trường Chinh, Phường Tân Bình, TP. Hồ Chí Minh',
    mapLink: 'https://maps.google.com/?q=208+Truong+Chinh+Tan+Binh+Ho+Chi+Minh',
  },
  {
    name: 'Cơ sở 2: Gò Vấp, TP.HCM',
    address: '12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí Minh',
    mapLink: 'https://maps.google.com/?q=12+Nguyen+Van+Bao+Go+Vap+Ho+Chi+Minh',
  },
]

const TRUST_PARTNERS = [
  {
    title: 'Cambridge English',
    subtitle: 'Chuẩn đào tạo Starters · Movers · Flyers',
  },
  {
    title: 'IDP & British Council',
    subtitle: 'Đối tác đăng ký & luyện thi IELTS chính thức',
  },
  {
    title: '100% CELTA / TESOL',
    subtitle: 'Giáo viên quốc tế có chứng chỉ sư phạm toàn cầu',
  },
  {
    title: 'Oxford & NatGeo',
    subtitle: 'Giáo trình chuẩn khung tham chiếu châu Âu CEFR',
  },
]

function image(id: string, width = 800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
}

/**
 * Stat Counter: Renders the real target value immediately for SSR,
 * then smoothly animates from 0 to target over 1.75s when scrolled into view (once).
 */
function Stat({
  to,
  suffix = '',
  label,
  sublabel,
  variant = 'hero',
}: {
  to: number
  suffix?: string
  label: string
  sublabel?: string
  variant?: 'hero' | 'strip'
}) {
  const [n, setN] = useState(to)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || hasAnimatedRef.current) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setN(to)
      hasAnimatedRef.current = true
      return
    }

    let rafId = 0
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            observer.unobserve(el)

            const duration = 1750
            const start = performance.now()
            setN(0)

            const tick = (now: number) => {
              const progress = Math.min(1, (now - start) / duration)
              // Quartic ease-out for smooth deceleration
              const eased = 1 - Math.pow(1 - progress, 4)
              setN(Math.round(to * eased))
              if (progress < 1) {
                rafId = requestAnimationFrame(tick)
              } else {
                setN(to)
              }
            }
            rafId = requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [to])

  if (variant === 'strip') {
    return (
      <div
        ref={containerRef}
        className="stagger-item rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
      >
        <p className="text-3xl sm:text-4xl font-black tabular-nums tracking-tight bg-gradient-to-r from-[#0A192F] via-blue-800 to-indigo-600 bg-clip-text text-transparent">
          {n.toLocaleString('vi-VN')}
          {suffix}
        </p>
        <p className="mt-1 text-sm sm:text-base font-extrabold text-[#0A192F]">{label}</p>
        {sublabel && <p className="mt-0.5 text-xs sm:text-sm text-slate-500">{sublabel}</p>}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
    >
      <p className="text-2xl sm:text-3xl font-black tabular-nums tracking-tight text-[#0A192F]">
        {n.toLocaleString('vi-VN')}
        {suffix}
      </p>
      <p className="text-sm font-bold text-slate-700 mt-1">{label}</p>
    </div>
  )
}

export function EnglishCenter() {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả')
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState<string | null>(null)
  const [modal, setModal] = useState<'register' | 'quiz' | null>(null)
  const [detailCourse, setDetailCourse] = useState<CourseDetailData | null>(null)
  const [detailTeacher, setDetailTeacher] = useState<TeacherProfile | null>(null)
  const [activeCampusTopicIndex, setActiveCampusTopicIndex] = useState<number | null>(null)
  const [activeAlbumPhotoIndex, setActiveAlbumPhotoIndex] = useState<number>(0)
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [selectedNote, setSelectedNote] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [heroSlideIdx, setHeroSlideIdx] = useState<number>(0)
  const [coursePhotoMap, setCoursePhotoMap] = useState<Record<string, number>>({})
  const [whyPhotoIdx, setWhyPhotoIdx] = useState<number>(0)
  const [storyPhotoMap, setStoryPhotoMap] = useState<Record<string, number>>({})
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'weekday' | 'weekend' | 'evening'>('all')
  const [whyTab, setWhyTab] = useState<'inclass' | 'ecosystem'>('inclass')
  const [activeMethodStep, setActiveMethodStep] = useState<number>(0)
  const [storyFilter, setStoryFilter] = useState<'all' | 'ielts' | 'cambridge' | 'adults'>('all')
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // High-performance GPU refs for 60fps scroll progress, ring & parallax
  const progressBarRef = useRef<HTMLDivElement>(null)
  const progressCircleRef = useRef<SVGCircleElement>(null)
  const blobLeftRef = useRef<HTMLDivElement>(null)
  const blobRightRef = useRef<HTMLDivElement>(null)
  const blobCenterRef = useRef<HTMLDivElement>(null)
  const heroCollageRef = useRef<HTMLDivElement>(null)
  const lastScrollYRef = useRef(0)

  // Inline Quick Consultation Form State (#start section)
  const [inlineName, setInlineName] = useState('')
  const [inlinePhone, setInlinePhone] = useState('')
  const [inlineCourse, setInlineCourse] = useState(COURSE_OPTIONS[0].value)
  const [inlineBranch, setInlineBranch] = useState('208 Trường Chinh, Phường Tân Bình, TP.HCM')
  const [inlineErrors, setInlineErrors] = useState<Record<string, string>>({})
  const [inlineSuccess, setInlineSuccess] = useState(false)
  const inlineErrorRef = useRef<HTMLDivElement>(null)

  // Newsletter state with Vietnamese validation
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterError, setNewsletterError] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  // Unified 60fps requestAnimationFrame Scroll Engine (Progress Bar, Smart Navbar, Parallax, Back to Top)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 20 // r=20 -> ~125.66

    let ticking = false

    const updateScrollMetrics = () => {
      const y = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0

      // 1. Update top 3px Scroll Progress Bar via GPU scaleX
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${ratio})`
      }

      // 2. Update Back to Top circular SVG ring strokeDashoffset
      if (progressCircleRef.current) {
        const offset = CIRCLE_CIRCUMFERENCE * (1 - ratio)
        progressCircleRef.current.style.strokeDashoffset = `${offset}`
      }

      // 3. Smart Sticky Navbar (> 80px glassmorphism; hide on fast downward scroll, show on upward scroll)
      const isScrolledPast80 = y > 80
      setScrolled((prev) => (prev !== isScrolledPast80 ? isScrolledPast80 : prev))

      const delta = y - lastScrollYRef.current
      if (y <= 120) {
        setNavHidden((prev) => (prev ? false : prev))
      } else if (delta > 12 && y > 220) {
        // Fast scroll down -> hide navbar
        setNavHidden((prev) => (!prev ? true : prev))
      } else if (delta < -6) {
        // Scroll up -> immediately reveal navbar
        setNavHidden((prev) => (prev ? false : prev))
      }
      lastScrollYRef.current = y

      // 4. Show Back to Top button when scrolled past 40% of page
      const shouldShowTop = ratio >= 0.4
      setShowBackToTop((prev) => (prev !== shouldShowTop ? shouldShowTop : prev))

      // 5. Lightweight GPU Parallax for Hero decorative blobs & collage (only when in Hero viewport range & motion allowed)
      if (!prefersReducedMotion && y < 1100) {
        if (blobLeftRef.current) {
          blobLeftRef.current.style.transform = `translate3d(0, ${(y * 0.16).toFixed(1)}px, 0)`
        }
        if (blobRightRef.current) {
          blobRightRef.current.style.transform = `translate3d(0, ${(y * -0.12).toFixed(1)}px, 0)`
        }
        if (blobCenterRef.current) {
          blobCenterRef.current.style.transform = `translate3d(0, ${(y * 0.1).toFixed(1)}px, 0)`
        }
        if (heroCollageRef.current) {
          heroCollageRef.current.style.transform = `translate3d(0, ${(y * -0.05).toFixed(1)}px, 0)`
        }
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollMetrics)
        ticking = true
      }
    }

    updateScrollMetrics()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
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
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
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

  const handleSelectCategory = (cat: string, ageId?: string) => {
    setActiveCategory(cat)
    setSelectedAgeGroupId(ageId || null)
  }

  const handleInlineSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    const cleanPhone = inlinePhone.replace(/[\s.-]/g, '')
    if (!inlineName.trim() || inlineName.trim().length < 2) {
      errs.name = 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự).'
    }
    if (!cleanPhone) {
      errs.phone = 'Vui lòng nhập số điện thoại liên hệ.'
    } else if (!/^(0|\+?84)[1-9][0-9]{8}$/.test(cleanPhone)) {
      errs.phone = 'Số điện thoại gồm 10 chữ số (ví dụ: 090 123 4567).'
    }
    setInlineErrors(errs)
    if (Object.keys(errs).length > 0) {
      requestAnimationFrame(() => {
        inlineErrorRef.current?.focus()
      })
      return
    }
    setInlineSuccess(true)
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
      {/* 1. Fixed 3px Top Scroll Progress Bar (GPU-accelerated scaleX) */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 pointer-events-none"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />

      {/* Top Announcement Bar - Identical to pmlacademy.vercel.app */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
              <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
              ICF &amp; CAMBRIDGE ACCREDITED
            </span>
            <span className="text-[11.5px] text-slate-300 font-medium whitespace-nowrap">
              Tuyển sinh 2026 - 2027 · Ưu đãi Early-Bird 35%
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11.5px] font-semibold text-slate-300">
            <a
              href="https://zalo.me/0789780167"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[36px] flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1"
            >
              <MessageCircle aria-hidden="true" size={13} className="text-blue-400" />
              Zalo: 0789 780 167
            </a>
            <span className="text-slate-600" aria-hidden="true">
              |
            </span>
            <a
              href="tel:0789780167"
              className="min-h-[36px] flex items-center gap-1.5 hover:text-amber-300 transition-colors py-1"
            >
              <Phone aria-hidden="true" size={13} className="text-amber-400" />
              Hotline: 0789 780 167
            </a>
          </div>
        </div>
      </div>

      {/* Streamlined Sticky Smart Navbar - Matched to pmlacademy.vercel.app */}
      <header
        className={`sticky top-0 z-40 w-full border-b transition-[transform,background-color,padding,box-shadow,border-color] duration-300 ease-out will-change-transform ${
          scrolled
            ? 'border-slate-200/90 bg-white/90 backdrop-blur-md shadow-md py-2'
            : 'border-slate-100/80 bg-white/75 backdrop-blur-xs py-3'
        } ${navHidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with PML Vietnam & Bright English identity */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg min-h-[44px] shrink-0"
            aria-label="PML Vietnam - Bright English Trang chủ"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-[#0A192F] via-[#163265] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform duration-200 border border-white/10 shrink-0">
              <Sparkles aria-hidden="true" size={19} className="text-amber-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#0A192F] leading-none">
                  PML
                </span>
                <span className="text-blue-600 font-extrabold text-sm sm:text-base leading-none">
                  ENGLISH
                </span>
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5 leading-none">
                ACADEMY &amp; CAMBRIDGE
              </span>
            </div>
          </a>

          {/* Navigation - Matched to pmlacademy.vercel.app */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-semibold text-slate-700 shrink-0"
            aria-label="Điều hướng chính"
          >
            <a
              className="transition-colors hover:text-blue-600 min-h-[44px] flex items-center px-1 whitespace-nowrap"
              href="#courses"
            >
              Khóa học
            </a>
            <a
              className="transition-colors hover:text-blue-600 min-h-[44px] flex items-center px-1 whitespace-nowrap"
              href="#who"
            >
              Độ tuổi
            </a>
            <a
              className="transition-colors hover:text-blue-600 min-h-[44px] flex items-center px-1 whitespace-nowrap"
              href="#why"
            >
              Phương pháp
            </a>
            <a
              className="transition-colors hover:text-blue-600 min-h-[44px] flex items-center px-1 whitespace-nowrap"
              href="#teachers"
            >
              Đội ngũ GV
            </a>
            <a
              className="transition-colors hover:text-blue-600 min-h-[44px] flex items-center px-1 whitespace-nowrap"
              href="#stories"
            >
              Câu chuyện
            </a>
            <a
              className="transition-colors hover:text-blue-600 min-h-[44px] flex items-center px-1 whitespace-nowrap"
              href="#faq"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop Actions - Cổng học viên / Test 3 phút + Đăng ký tư vấn */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setModal('quiz')}
              className="h-11 px-3.5 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-50 rounded-xl transition-colors inline-flex items-center gap-1.5 border border-transparent hover:border-slate-200 cursor-pointer"
            >
              <UserCheck aria-hidden="true" size={15} className="text-slate-500" />
              <span>Test năng lực · 3 phút</span>
            </button>
            <button
              type="button"
              onClick={() => openRegister()}
              className="h-11 inline-flex items-center gap-1.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Đăng ký tư vấn</span>
              <ArrowRight aria-hidden="true" size={14} />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => openRegister()}
              className="h-11 px-3 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1 shadow-xs cursor-pointer"
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
                <div className="size-10 rounded-xl bg-gradient-to-br from-[#0A192F] via-[#163265] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-900/15 border border-white/10 shrink-0">
                  <Sparkles aria-hidden="true" size={19} className="text-amber-300" />
                </div>
                <div className="flex flex-col">
                  <span id="mobile-navigation-title" className="text-base font-extrabold tracking-tight text-[#0A192F] leading-none">
                    PML <span className="text-blue-600">ENGLISH</span>
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-0.5 leading-none">
                    ACADEMY &amp; CAMBRIDGE
                  </span>
                </div>
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

            <nav className="flex flex-col gap-1 py-4 border-b border-slate-100" aria-label="Menu di động">
              {[
                ['Ưu đãi tuyển sinh (Giảm 35%)', '#offers'],
                ['Danh sách khóa học', '#courses'],
                ['Chương trình theo độ tuổi', '#who'],
                ['Phương pháp đào tạo', '#why'],
                ['Đội ngũ giáo viên quốc tế', '#teachers'],
                ['Lịch ca học linh hoạt', '#schedule'],
                ['Câu chuyện học viên', '#stories'],
                ['Hỏi đáp thường gặp (FAQ)', '#faq'],
                ['Hệ thống cơ sở', '#campus'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
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
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 text-sm font-bold text-amber-900"
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
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-600/20"
              >
                Đăng ký tư vấn &amp; học thử <ArrowRight aria-hidden="true" size={16} />
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://zalo.me/0789780167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700"
                >
                  <MessageCircle aria-hidden="true" size={16} className="text-blue-600" />
                  Zalo: 0789 780 167
                </a>
                <a
                  href="tel:0789780167"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700"
                >
                  <Phone aria-hidden="true" size={16} className="text-amber-500" />
                  0789 780 167
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pb-28 md:pb-0">
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative scroll-mt-24 overflow-hidden bg-[radial-gradient(ellipse_at_78%_5%,rgba(99,102,241,.16),transparent_38%),linear-gradient(135deg,#f8fafc_8%,#eef2ff_52%,#f8fafc_100%)]"
        >
          <div
            ref={blobLeftRef}
            aria-hidden="true"
            className="parallax-layer pointer-events-none absolute -left-16 top-10 will-change-transform"
          >
            <div className="size-72 rounded-full bg-indigo-300/30 blur-3xl mesh-orb" />
          </div>
          <div
            ref={blobRightRef}
            aria-hidden="true"
            className="parallax-layer pointer-events-none absolute right-[-4rem] top-24 will-change-transform"
          >
            <div className="size-80 rounded-full bg-cyan-300/25 blur-3xl mesh-orb [animation-delay:-5s]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-12 lg:px-8 lg:pt-16">
            <div className="relative z-10 min-w-0">
              <div className="hero-rise mb-4 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs sm:text-sm">
                <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 sm:text-sm">
                  Tuyển Sinh 2026 - 2027
                </span>
                <span className="text-slate-300" aria-hidden="true">
                  |
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-700 sm:text-sm">
                  <Sparkles aria-hidden="true" size={14} className="text-amber-500" />
                  Chuẩn Quốc Tế Cambridge &amp; IELTS
                </span>
              </div>

              <h1
                className="hero-rise max-w-2xl text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0A192F] sm:text-5xl lg:text-[58px]"
                style={{ animationDelay: '80ms' }}
              >
                Bứt phá tiếng Anh,
                <br />
                chinh phục{' '}
                <span className="whitespace-nowrap bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  tương lai
                </span>{' '}
                toàn cầu.
              </h1>

              <p
                className="hero-rise mt-4 max-w-xl text-base font-normal leading-relaxed text-slate-700 sm:text-lg lg:text-xl"
                style={{ animationDelay: '160ms' }}
              >
                Mỗi buổi học là một hành trình vui khám phá. Cùng 100% giáo viên quốc tế và phương pháp học qua trải nghiệm, con tự tin làm chủ tiếng Anh mỗi ngày.
              </p>

              <div
                className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                style={{ animationDelay: '240ms' }}
              >
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
                    <Image
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
                  <p className="mt-0.5 text-sm sm:text-base text-slate-600">
                    Được tin yêu bởi 15.000+ gia đình phụ huynh
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive 4-Slide Hero Visual Showcase with Prev/Next Controls */}
            <div className="relative mx-auto w-full max-w-[540px] pt-2 lg:max-w-none">
              <div
                ref={blobCenterRef}
                aria-hidden="true"
                className="parallax-layer pointer-events-none absolute -left-6 bottom-16 will-change-transform"
              >
                <div className="size-40 rounded-full bg-violet-300/40 blur-3xl mesh-orb [animation-delay:-2s]" />
              </div>

              {(() => {
                const activeHero = HERO_SLIDES[heroSlideIdx] || HERO_SLIDES[0]
                const prevHero = () =>
                  setHeroSlideIdx((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                const nextHero = () =>
                  setHeroSlideIdx((p) => (p + 1) % HERO_SLIDES.length)

                return (
                  <>
                    <div
                      ref={heroCollageRef}
                      className="parallax-layer relative grid h-[370px] grid-cols-[1.12fr_.88fr] grid-rows-[1.1fr_.9fr] gap-3 sm:h-[450px] md:h-[505px] will-change-transform"
                    >
                      {/* Main Featured Scene with Prev/Next Buttons */}
                      <div className="group relative row-span-2 overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/15 bg-slate-900">
                        <Image
                          key={activeHero.mainImage}
                          className="slide-fade-in media-pan h-full w-full object-cover"
                          src={image(activeHero.mainImage, 900)}
                          alt={activeHero.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 55vw, 340px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/15" />

                        {/* Slide Index Pill & Prev/Next Controls on Main Frame */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                          <span className="rounded-full bg-black/55 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[11px] font-extrabold text-amber-300">
                            0{heroSlideIdx + 1} / 0{HERO_SLIDES.length}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={prevHero}
                              aria-label=" Cảnh lớp học trước"
                              className="grid size-9 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/25 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={nextHero}
                              aria-label="Cảnh lớp học tiếp theo"
                              className="grid size-9 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/25 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 text-white">
                          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                            {activeHero.tag}
                          </p>
                          <p className="mt-1 text-lg font-extrabold sm:text-2xl leading-snug">
                            {activeHero.title}
                          </p>
                          <p className="mt-1 hidden sm:block text-xs text-slate-200 leading-relaxed line-clamp-2">
                            {activeHero.sub}
                          </p>
                        </div>
                      </div>

                      {/* Top-Right Supporting Scene */}
                      <div
                        onClick={nextHero}
                        className="group relative overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/10 bg-slate-900 cursor-pointer"
                        title="Bấm để chuyển ảnh tiếp theo"
                      >
                        <Image
                          key={activeHero.topRightImage}
                          className="slide-fade-in media-pan h-full w-full object-cover [animation-delay:-6s]"
                          src={image(activeHero.topRightImage, 700)}
                          alt="Không gian tương tác nhóm nhỏ tại lớp"
                          fill
                          sizes="(max-width: 768px) 45vw, 260px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Bottom-Right Supporting Scene */}
                      <div
                        onClick={nextHero}
                        className="group relative overflow-hidden rounded-[28px] shadow-xl shadow-indigo-950/10 bg-slate-900 cursor-pointer"
                        title="Bấm để chuyển ảnh tiếp theo"
                      >
                        <Image
                          key={activeHero.bottomRightImage}
                          className="slide-fade-in media-pan h-full w-full object-cover [animation-delay:-11s]"
                          src={image(activeHero.bottomRightImage, 700)}
                          alt="Phòng học tương tác thông minh chuẩn quốc tế"
                          fill
                          sizes="(max-width: 768px) 45vw, 260px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Interactive Scene Selector Dots */}
                    <div className="mt-3 flex items-center justify-center gap-2">
                      {HERO_SLIDES.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setHeroSlideIdx(idx)}
                          aria-label={`Xem cảnh ${idx + 1}: ${s.title}`}
                          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer min-h-0 ${
                            idx === heroSlideIdx
                              ? 'w-8 bg-blue-600 shadow-xs'
                              : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )
              })()}

              <div className="mt-3 grid grid-cols-2 gap-3 sm:pointer-events-none sm:absolute sm:inset-0 sm:mt-0 sm:block">
                <div className="sm:pointer-events-auto sm:absolute sm:left-3 sm:top-16 sm:w-44">
                  <Stat to={98} suffix="%" label="Đạt mục tiêu học tập" />
                </div>
                <div className="sm:pointer-events-auto sm:absolute sm:bottom-12 sm:right-3 sm:w-44">
                  <Stat to={15000} suffix="+" label="Học viên tỏa sáng" />
                </div>
              </div>
            </div>
          </div>

          {/* INTERNATIONAL ACCREDITATION & ANIMATED ACHIEVEMENTS BAR */}
          <div className="scroll-reveal border-y border-slate-200/80 bg-white/90 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-5">
              {/* Animated Achievement Counters (0 -> target over 1.75s when scrolled into view) */}
              <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
                {[
                  {
                    to: 15000,
                    suffix: '+',
                    label: 'Học viên tự tin tỏa sáng',
                    sublabel: 'Từ Mầm non đến IELTS & Đi làm',
                  },
                  {
                    to: 98,
                    suffix: '%',
                    label: 'Đạt & vượt chuẩn đầu ra',
                    sublabel: 'Cam kết bằng hợp đồng đào tạo',
                  },
                  {
                    to: 12,
                    suffix: '+ năm',
                    label: 'Kinh nghiệm học thuật quốc tế',
                    sublabel: 'Chuẩn Cambridge & Khai vấn ICF',
                  },
                  {
                    to: 100,
                    suffix: '%',
                    label: 'Giáo viên chứng chỉ toàn cầu',
                    sublabel: 'Sở hữu bằng CELTA / TESOL / TEYL',
                  },
                ].map((stat, idx) => (
                  <div
                    key={stat.label}
                    style={{ '--stagger-delay': `${idx * 100}ms` } as React.CSSProperties}
                  >
                    <Stat
                      to={stat.to}
                      suffix={stat.suffix}
                      label={stat.label}
                      sublabel={stat.sublabel}
                      variant="strip"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 pt-2 border-t border-slate-100">
                {TRUST_PARTNERS.map((partner, idx) => (
                  <div
                    key={partner.title}
                    style={{ '--stagger-delay': `${idx * 100}ms` } as React.CSSProperties}
                    className="stagger-item flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-700">
                      <ShieldCheck aria-hidden="true" size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-extrabold text-[#0A192F] leading-snug">
                        {partner.title}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-snug">
                        {partner.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OFFERS SECTION */}
        <section id="offers" className="scroll-reveal scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[28px] border border-amber-300 bg-white p-6 shadow-[0_18px_50px_rgba(217,119,6,0.12)] sm:p-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xs">
                  <Percent aria-hidden="true" size={14} className="text-amber-700" /> Ưu đãi tuyển sinh tháng 11
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs sm:text-sm font-extrabold text-rose-900 border border-rose-200">
                  <span className="size-2 rounded-full bg-rose-600" /> Chỉ còn 08 suất học bổng tuần này
                </span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                Học phí giảm đến 35%
              </h2>
              <p className="mt-2.5 max-w-md text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Ưu đãi áp dụng có giới hạn cho các khóa IELTS và Cambridge đăng ký trước Chủ Nhật tuần này. Tặng kèm 01 buổi kiểm tra trình độ 1-kèm-1 và trọn bộ giáo trình quốc tế.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2.5 max-w-md text-xs sm:text-sm font-bold text-slate-800">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/80 px-3 py-2">
                  <CheckCircle2 aria-hidden="true" size={16} className="text-emerald-600 shrink-0" />
                  <span>Tặng bộ giáo trình 1.200.000đ</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/80 px-3 py-2">
                  <CheckCircle2 aria-hidden="true" size={16} className="text-emerald-600 shrink-0" />
                  <span>Trả góp 0% lãi suất 3–12 tháng</span>
                </div>
              </div>

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
                  className="stagger-item list-enter group flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center"
                  style={{ '--stagger-delay': `${idx * 100}ms`, animationDelay: `${idx * 100}ms` } as React.CSSProperties}
                >
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl shadow-sm sm:w-32">
                    <Image
                      src={image(course.image, 320)}
                      alt={`${course.title} - lớp học tiếng Anh`}
                      fill
                      sizes="(max-width: 640px) 100vw, 128px"
                      className="media-zoom object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-md bg-amber-200 px-2.5 py-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-950">
                      {course.badge}
                    </span>
                    <h3 className="mt-1 text-lg sm:text-xl font-extrabold text-[#0A192F]">
                      <button
                        type="button"
                        onClick={() => setDetailCourse(course)}
                        className="text-left hover:text-indigo-700 transition-colors cursor-pointer min-h-0"
                      >
                        {course.title}
                      </button>
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-0.5">
                      {course.level} · {course.duration}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-amber-900">{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm sm:text-base text-slate-400 line-through">
                          {course.originalPrice}
                        </span>
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

        {/* WHO IT IS FOR SECTION - Interactive CEFR & Cambridge Stepping-Stone Roadmap */}
        <section id="who" className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                <GraduationCap aria-hidden="true" size={14} className="text-blue-600" />
                Lộ trình đào tạo liên thông chuẩn quốc tế
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                Chọn Chương Trình Theo Độ Tuổi &amp; Mục Tiêu
              </h2>
              <p className="mt-2 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 font-normal">
                Hệ thống lộ trình 5 bậc liên thông theo Khung Tham chiếu Châu Âu (CEFR). Bấm vào một bậc học để lọc ngay khóa học và chuẩn đầu ra tương ứng.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModal('quiz')}
              className="self-start md:self-auto inline-flex h-11 items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 text-xs sm:text-sm font-bold text-amber-950 hover:bg-amber-100 transition cursor-pointer shrink-0"
            >
              <Zap aria-hidden="true" size={15} className="text-amber-600" />
              <span>Chưa rõ trình độ? Test nhanh 3 phút</span>
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {AGE_PROGRAMS.map((prog, index) => {
              const isCardActive =
                selectedAgeGroupId !== null
                  ? selectedAgeGroupId === prog.id
                  : activeCategory === prog.filter && prog.id !== 'ielts'
              return (
                <a
                  key={prog.id}
                  href="#courses"
                  onClick={() => handleSelectCategory(prog.filter, prog.id)}
                  className={`stagger-item list-enter group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    isCardActive
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/25 shadow-lg'
                      : 'border-slate-200/90 bg-white hover:border-blue-300 shadow-sm'
                  }`}
                  style={{ '--stagger-delay': `${index * 100}ms`, animationDelay: `${index * 100}ms` } as React.CSSProperties}
                >
                  <div>
                    <div className="relative h-36 overflow-hidden rounded-xl bg-slate-200">
                      <Image
                        src={image(prog.image, 400)}
                        alt={`Khóa học tiếng Anh cho ${prog.title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                        className="media-zoom object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-black/20 to-transparent" />
                      <span className="absolute top-2.5 left-2.5 rounded-md bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-xs font-extrabold text-[#0A192F] shadow-sm">
                        {prog.ages}
                      </span>
                      <span className="absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-full bg-blue-600 text-[11px] font-black text-white shadow-sm">
                        {prog.step}
                      </span>
                      <span className="absolute bottom-2.5 left-2.5 right-2.5 truncate rounded-md bg-black/65 backdrop-blur-md border border-amber-300/35 px-2 py-0.5 text-[11px] font-extrabold text-amber-300">
                        {prog.cefr}
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-lg font-extrabold text-[#0A192F] group-hover:text-blue-600 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {prog.detail}
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                      <CheckCircle2 aria-hidden="true" size={12} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{prog.highlight}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs sm:text-sm font-extrabold text-blue-700">
                    <span>{prog.coursesCount}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Xem khóa <ArrowRight aria-hidden="true" size={13} />
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* COURSES CATALOG SECTION */}
        <section
          id="courses"
          className="scroll-reveal scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
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

          {/* Filter Tablist */}
          <div
            className="mt-8 flex w-full max-w-full min-w-0 gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Lọc khóa học theo nhóm"
          >
            {filterCategories.map((cat) => {
              const isSelected = activeCategory === cat
              return (
                <button
                  type="button"
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="courses-tabpanel"
                  onClick={() => handleSelectCategory(cat)}
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

          {/* Courses Grid with Interactive Multi-Photo Mini-Carousel on Every Card */}
          <div
            id="courses-tabpanel"
            role="tabpanel"
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleCourses.map((course, idx) => {
              const isPromo = course.badge.includes('Giảm') || course.badge.includes('Ưu đãi')
              const isHighlightedAge = selectedAgeGroupId === course.ageGroupId
              const gallery = course.gallery && course.gallery.length > 0
                ? course.gallery
                : [{ id: course.image, caption: course.level }]
              const currentSlideIdx = coursePhotoMap[course.title] ?? 0
              const activeSlide = gallery[currentSlideIdx] || gallery[0]

              const handlePrevCoursePhoto = (e: React.MouseEvent) => {
                e.stopPropagation()
                setCoursePhotoMap((prev) => ({
                  ...prev,
                  [course.title]: ((prev[course.title] ?? 0) - 1 + gallery.length) % gallery.length,
                }))
              }

              const handleNextCoursePhoto = (e: React.MouseEvent) => {
                e.stopPropagation()
                setCoursePhotoMap((prev) => ({
                  ...prev,
                  [course.title]: ((prev[course.title] ?? 0) + 1) % gallery.length,
                }))
              }

              return (
                <article
                  key={course.title}
                  className={`stagger-item list-enter group flex flex-col justify-between overflow-hidden rounded-[26px] border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                    isHighlightedAge
                      ? 'border-indigo-600 ring-2 ring-indigo-500/25'
                      : isPromo
                      ? 'border-amber-300 ring-2 ring-amber-100'
                      : 'border-slate-200'
                  }`}
                  style={{ '--stagger-delay': `${idx * 100}ms`, animationDelay: `${idx * 100}ms` } as React.CSSProperties}
                >
                  <div>
                    <div
                      onClick={() => setDetailCourse(course)}
                      className="relative h-56 overflow-hidden bg-slate-900 cursor-pointer"
                    >
                      <Image
                        key={activeSlide.id}
                        src={image(activeSlide.id, 700)}
                        alt={`Khóa học ${course.title} - ${activeSlide.caption}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                        className="slide-fade-in media-zoom object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                      {/* Top Badges */}
                      <span
                        className={`absolute left-4 top-4 rounded-md border px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider shadow-xs ${course.color}`}
                      >
                        {course.badge}
                      </span>
                      <span className="absolute right-4 top-4 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-extrabold text-slate-800 shadow-sm flex items-center">
                        <Star
                          aria-hidden="true"
                          size={13}
                          fill="currentColor"
                          className="mr-1 inline text-amber-500"
                        />
                        {course.rating}
                      </span>

                      {/* Prev / Next Image Controls on Card Hover/Touch */}
                      <button
                        type="button"
                        onClick={handlePrevCoursePhoto}
                        aria-label={`Ảnh trước của khóa ${course.title}`}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 grid size-8 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/25 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-blue-600 hover:scale-110 cursor-pointer z-10"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextCoursePhoto}
                        aria-label={`Ảnh tiếp theo của khóa ${course.title}`}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 grid size-8 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/25 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-blue-600 hover:scale-110 cursor-pointer z-10"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Bottom Caption & Slide Dots */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                        <span className="truncate rounded-md bg-black/65 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-cyan-200 border border-white/15">
                          {activeSlide.caption}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {gallery.map((g, gIdx) => (
                            <span
                              key={g.id}
                              className={`h-1.5 rounded-full transition-all ${
                                gIdx === currentSlideIdx ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-sm sm:text-base font-bold text-indigo-700">
                        <span>{course.level}</span>
                        <span className="text-slate-500 font-normal text-xs sm:text-sm">
                          Độ tuổi: {course.targetAge}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg sm:text-xl font-extrabold tracking-tight text-[#0A192F] leading-snug">
                        <button
                          type="button"
                          onClick={() => setDetailCourse(course)}
                          className="text-left group-hover:text-indigo-600 transition-colors cursor-pointer min-h-0"
                        >
                          {course.title}
                        </button>
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
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <span className="block text-xs font-medium text-slate-500 sm:text-sm">Học phí</span>
                        <span className="mt-0.5 block whitespace-nowrap text-xl font-black leading-none text-[#0A192F] sm:text-2xl">
                          {course.price}
                        </span>
                      </div>
                      {course.originalPrice && (
                        <span className="text-xs sm:text-sm font-medium text-slate-400 line-through">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="mt-3.5 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDetailCourse(course)}
                        className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs sm:text-sm font-bold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-700"
                      >
                        Xem lộ trình
                      </button>
                      <button
                        type="button"
                        onClick={() => openRegister(course.title, `Quan tâm khóa học ${course.title}`)}
                        className="inline-flex h-11 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-indigo-600 px-3 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-indigo-700"
                        aria-label={`Đăng ký tư vấn khóa học ${course.title}`}
                      >
                        Đăng ký thử
                        <ArrowUpRight aria-hidden="true" size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() =>
                handleSelectCategory(activeCategory === 'Tất cả' ? 'THCS & IELTS' : 'Tất cả')
              }
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
                  Làm bài kiểm tra tương tác 3 phút theo đúng độ tuổi để khám phá điểm mạnh, nhận giải thích đáp án trực tiếp và quà tặng buổi học thử 1-1 cùng giáo viên quốc tế.
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

        {/* TEACHERS SECTION - Deep Pedagogical Value & High-Trust Profiles */}
        <section
          id="teachers"
          className="scroll-reveal scroll-mt-24 py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Award aria-hidden="true" size={14} className="text-amber-500" />
                  PEOPLE MAKE THE DIFFERENCE · HỘI ĐỒNG SƯ PHẠM QUỐC TẾ
                </div>
                <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] tracking-tight">
                  100% Giáo Viên Quốc Tế Tận Tâm &amp; Chuyên Sâu
                </h2>
                <p className="mt-2 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 font-normal">
                  Người thầy giỏi không chỉ truyền đạt kiến thức mà còn đánh thức tư duy ngôn ngữ và sự tự tin. 100% giảng viên tại PML English sở hữu chứng chỉ sư phạm toàn cầu CELTA / TESOL và trực tiếp đồng hành sửa từng lỗi nhỏ cho học viên.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openRegister('', 'Đăng ký kiểm tra trình độ & học thử 1-1 cùng Giáo viên quốc tế')}
                className="self-start md:self-auto h-11 inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-blue-600 hover:text-blue-800 transition-colors py-2 cursor-pointer shrink-0"
              >
                <span>Đặt lịch kiểm tra 1-1 cùng Chuyên gia</span>
                <ArrowRight aria-hidden="true" size={16} />
              </button>
            </div>

            {/* 3-Pillar Pedagogical Standards Bar (Why our teachers make the difference) */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  badge: 'Chuẩn tuyển chọn < 5%',
                  title: '5 Vòng Thẩm Định Sư Phạm Quốc Tế',
                  desc: '100% thầy cô phải vượt qua vòng kiểm tra bằng cấp đại học, chứng chỉ CELTA/TESOL và giảng dạy thực nghiệm trước Hội đồng Học thuật.',
                  icon: ShieldCheck,
                },
                {
                  badge: 'Cá nhân hóa từng học viên',
                  title: 'Chấm Chữa & Sửa Lỗi Chi Tiết 1-Kèm-1',
                  desc: 'Thầy cô trực tiếp phân tích từng âm vị phát âm IPA, ngữ điệu Speaking và cấu trúc lập luận Writing theo đúng rubric giám khảo quốc tế.',
                  icon: Target,
                },
                {
                  badge: 'Sư phạm truyền cảm hứng',
                  title: 'Khai Vấn Tâm Lý & Phản Xạ Tự Nhiên',
                  desc: 'Áp dụng phương pháp giảng dạy khích lệ, giúp học viên gỡ bỏ hoàn toàn nỗi sợ nói sai và hình thành phản xạ suy nghĩ bằng tiếng Anh.',
                  icon: Sparkles,
                },
              ].map((pillar, idx) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    style={{ '--stagger-delay': `${idx * 100}ms` } as React.CSSProperties}
                    className="stagger-item flex items-start gap-3.5 rounded-2xl border border-blue-100 bg-white p-4 sm:p-5 shadow-xs"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0A192F] to-blue-700 text-amber-300 shadow-sm">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <div className="min-w-0">
                      <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-blue-700 border border-blue-200/60">
                        {pillar.badge}
                      </span>
                      <h3 className="mt-1.5 text-base font-extrabold text-[#0A192F] leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 4 In-Depth Teacher Cards Grid */}
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {TEACHERS.map((teacher, index) => (
                <article
                  key={teacher.id}
                  className="stagger-item list-enter group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-950/5 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1.5 h-full"
                  style={{ '--stagger-delay': `${index * 100}ms`, animationDelay: `${index * 100}ms` } as React.CSSProperties}
                >
                  <div>
                    {/* Edge-to-Edge Portrait with High-Contrast Scrim & Badges */}
                    <div
                      onClick={() => setDetailTeacher(teacher)}
                      className="relative h-68 w-full overflow-hidden bg-slate-200 cursor-pointer"
                    >
                      <Image
                        src={image(teacher.image, 700)}
                        alt={`Chân dung ${teacher.name} - ${teacher.role}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-black/30 to-transparent pointer-events-none" />

                      {/* Top-Left Nationality Badge */}
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-extrabold text-[#0A192F] shadow-sm">
                        <GraduationCap aria-hidden="true" size={13} className="text-blue-600" />
                        {teacher.nationality}
                      </span>

                      {/* Top-Right Rating Pill */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
                        <Star aria-hidden="true" size={12} fill="currentColor" className="text-amber-400" />
                        <span>{teacher.rating}</span>
                      </div>

                      {/* Bottom Overlay: Teaching Hours + Experience Summary */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                        <div className="inline-block px-2.5 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-[10.5px] font-extrabold uppercase tracking-wider text-amber-300 mb-1 border border-amber-300/35">
                          {teacher.teachingHours}
                        </div>
                        <span className="text-xs font-semibold text-slate-100 block leading-snug drop-shadow-sm">
                          {teacher.experience}
                        </span>
                      </div>
                    </div>

                    {/* Deep Academic Profile Body */}
                    <div className="p-5">
                      <h3 className="text-lg font-extrabold text-[#0A192F] tracking-tight">
                        <button
                          type="button"
                          onClick={() => setDetailTeacher(teacher)}
                          className="text-left group-hover:text-blue-600 transition-colors cursor-pointer min-h-0"
                        >
                          {teacher.name}
                        </button>
                      </h3>
                      <p className="text-xs sm:text-[13px] font-bold text-blue-700 mt-0.5 leading-snug">
                        {teacher.role}
                      </p>

                      {/* Verified Credentials Highlight Box */}
                      <div className="mt-3 flex items-start gap-1.5 rounded-xl bg-amber-50/90 border border-amber-200/90 p-2.5 text-xs font-bold text-amber-950 leading-snug">
                        <ShieldCheck aria-hidden="true" size={15} className="text-amber-600 shrink-0 mt-0.5" />
                        <span className="break-words">{teacher.creds}</span>
                      </div>

                      {/* Methodology Description */}
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-3">
                        {teacher.methodology}
                      </p>

                      {/* Tangible Value for Students Box */}
                      <div className="mt-3.5 rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                        <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-indigo-800">
                          Giá trị mang lại cho học viên:
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {teacher.studentValues.slice(0, 2).map((val) => (
                            <li
                              key={val}
                              className="flex items-start gap-1.5 text-xs text-slate-700 font-medium leading-snug"
                            >
                              <CheckCircle2
                                aria-hidden="true"
                                size={13}
                                className="text-emerald-600 shrink-0 mt-0.5"
                              />
                              <span>{val}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Specialty Tags */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {teacher.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTAs */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDetailTeacher(teacher)}
                      className="h-11 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition-all cursor-pointer"
                    >
                      Hồ sơ chuyên sâu
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openRegister(
                          teacher.coursesTaught[0],
                          `Đăng ký học thử & tư vấn lộ trình cùng ${teacher.name} (${teacher.role})`
                        )
                      }
                      className="h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-600 bg-blue-600 px-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      <CalendarCheck aria-hidden="true" size={14} />
                      <span>Học thử 1-1</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SCHEDULE SECTION - Interactive Smart Timetable & Session Anatomy */}
        <section
          id="schedule"
          className="scroll-reveal scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24 border-y border-slate-200/80"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                  <Calendar aria-hidden="true" size={14} className="text-blue-600" />
                  Khung giờ đào tạo · Tổ chức lớp khoa học
                </p>
                <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                  Lịch Học Linh Hoạt Phù Hợp Mọi Lứa Tuổi
                </h2>
                <p className="mt-2 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 font-normal">
                  Lựa chọn khung giờ học thuận tiện nhất cho lịch sinh hoạt của gia đình và công việc. Hỗ trợ chuyển ca, học bù 0đ và kèm riêng 1-1 khi bận đột xuất.
                </p>
              </div>

              {/* Interactive Shift Filter Tabs */}
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Lọc lịch học theo thời gian"
              >
                {[
                  { id: 'all' as const, label: 'Tất cả ca học (4)' },
                  { id: 'weekday' as const, label: 'Trong tuần (T2–T6)' },
                  { id: 'weekend' as const, label: 'Cuối tuần (T7–CN)' },
                  { id: 'evening' as const, label: 'Ca tối & Đi làm' },
                ].map((tab) => {
                  const isActive = scheduleFilter === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setScheduleFilter(tab.id)}
                      className={`h-10 rounded-xl px-4 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0A192F] text-white shadow-md shadow-slate-900/15 ring-2 ring-blue-500/30'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4 Rich Interactive Shift Cards */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  id: 'morning',
                  tags: ['weekend'],
                  shift: 'Ca Sáng Cuối Tuần',
                  time: '08:30 – 10:30',
                  badge: 'Thứ 7 & Chủ Nhật',
                  status: 'Còn 4 chỗ tuần này',
                  durationText: '120 phút / buổi · 2 buổi / tuần',
                  desc: 'Khung giờ năng lượng vàng cho các bé Mầm non, Tiểu học và lớp giao tiếp phản xạ sáng cuối tuần.',
                  programs: ['English Explorers (4–6 tuổi)', 'Cambridge Starters/Movers', 'Speaking Club'],
                  defaultCourse: 'English Explorers',
                  breakdown: [
                    { label: 'GV Bản ngữ tương tác', pct: '60%' },
                    { label: 'Hoạt động nhóm & Dự án', pct: '25%' },
                    { label: 'Sửa phát âm 1-1', pct: '15%' },
                  ],
                  icon: Sparkles,
                  accent: 'from-amber-500 to-orange-500',
                },
                {
                  id: 'afternoon',
                  tags: ['weekday', 'weekend'],
                  shift: 'Ca Chiều Tiêu Chuẩn',
                  time: '14:30 – 16:30',
                  badge: 'T2–T4–T6 hoặc T7–CN',
                  status: 'Đang mở lớp mới',
                  durationText: '120 phút / buổi · Có xe đưa đón/chờ',
                  desc: 'Luyện thi chuyên sâu chứng chỉ quốc tế Cambridge 13–15 khiên và thực hành thuyết trình kịch nghệ.',
                  programs: ['Cambridge Champions', 'Bright Stars Tiểu học', 'CLB Đọc sách CEFR'],
                  defaultCourse: 'Cambridge Champions',
                  breakdown: [
                    { label: 'Luyện 4 kỹ năng Cambridge', pct: '55%' },
                    { label: 'Phỏng vấn Speaking 1-1', pct: '30%' },
                    { label: 'Giải đề phòng Lab', pct: '15%' },
                  ],
                  icon: BookOpen,
                  accent: 'from-blue-600 to-cyan-500',
                },
                {
                  id: 'early-evening',
                  tags: ['weekday', 'evening'],
                  shift: 'Ca Tối Sớm Học Thuật',
                  time: '17:45 – 19:15',
                  badge: 'T2–T4–T6 hoặc T3–T5–T7',
                  status: 'Khung giờ vàng phụ huynh chọn',
                  durationText: '90 phút / buổi · Ăn nhẹ miễn phí',
                  desc: 'Khung giờ thuận tiện ngay sau giờ tan trường để phụ huynh đón con; tập trung ngữ pháp & nền tảng IELTS.',
                  programs: ['Bright Stars (6–11 tuổi)', 'IELTS Breakthrough (12–17 tuổi)', 'Ngữ pháp Chuyên Anh'],
                  defaultCourse: 'IELTS Breakthrough',
                  breakdown: [
                    { label: 'Học thuật cùng GV Quốc tế', pct: '60%' },
                    { label: 'Tranh biện & Viết luận', pct: '25%' },
                    { label: 'Trợ giảng kèm bài tập', pct: '15%' },
                  ],
                  icon: Clock3,
                  accent: 'from-indigo-600 to-blue-600',
                },
                {
                  id: 'late-evening',
                  tags: ['weekday', 'weekend', 'evening'],
                  shift: 'Ca Tối Chuyên Sâu',
                  time: '19:30 – 21:00',
                  badge: 'T3–T5–T7 hoặc Cuối tuần',
                  status: 'Cam kết đầu ra hợp đồng',
                  durationText: '90 phút / buổi · Hỗ trợ Hybrid Online',
                  desc: 'Thiết kế riêng cho học sinh THPT luyện thi IELTS 7.0–8.0+ và người đi làm bận rộn nâng cấp giao tiếp.',
                  programs: ['IELTS Mastery 7.0+', 'Speak with Confidence', 'Coaching 1-1 Doanh nghiệp'],
                  defaultCourse: 'IELTS Mastery 7.0+',
                  breakdown: [
                    { label: 'Thực chiến Speaking/Writing', pct: '65%' },
                    { label: 'Chấm chữa Rubric 1-1', pct: '20%' },
                    { label: 'Case-study & Pitching', pct: '15%' },
                  ],
                  icon: Target,
                  accent: 'from-[#0A192F] to-indigo-700',
                },
              ]
                .filter((s) => scheduleFilter === 'all' || s.tags.includes(scheduleFilter))
                .map((s, index) => {
                  const Icon = s.icon
                  return (
                    <article
                      key={s.id}
                      className="stagger-item list-enter group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-2xl"
                      style={{ '--stagger-delay': `${index * 100}ms`, animationDelay: `${index * 100}ms` } as React.CSSProperties}
                    >
                      <div>
                        {/* Top Accent Header Bar */}
                        <div className={`bg-gradient-to-r ${s.accent} px-5 py-4 text-white`}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white border border-white/20">
                              <Icon aria-hidden="true" size={13} className="text-amber-300" />
                              {s.badge}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-300">
                              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {s.status}
                            </span>
                          </div>
                          <p className="mt-2.5 text-2xl font-black tracking-tight text-white tabular-nums">
                            {s.time}
                          </p>
                          <h3 className="text-sm font-bold text-blue-100">{s.shift}</h3>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50/80 border border-indigo-100 rounded-lg px-2.5 py-1.5">
                            <Clock3 aria-hidden="true" size={13} className="shrink-0" />
                            <span>{s.durationText}</span>
                          </div>

                          <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                            {s.desc}
                          </p>

                          {/* Session Structure Breakdown */}
                          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                            <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                              Cấu trúc 1 buổi học tiêu chuẩn:
                            </p>
                            <div className="mt-2 space-y-1.5">
                              {s.breakdown.map((b) => (
                                <div key={b.label} className="flex items-center justify-between text-xs">
                                  <span className="font-medium text-slate-700">{b.label}</span>
                                  <span className="rounded bg-blue-100/80 px-1.5 py-0.5 text-[11px] font-extrabold text-blue-800">
                                    {b.pct}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Applicable Programs Pills */}
                          <div>
                            <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                              Các lớp đang mở tại ca này:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {s.programs.map((p) => (
                                <span
                                  key={p}
                                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-[#0A192F]"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer CTA */}
                      <div className="p-5 pt-0">
                        <button
                          type="button"
                          onClick={() =>
                            openRegister(
                              s.defaultCourse,
                              `Đăng ký giữ chỗ & nhận lịch khai giảng cho ${s.shift} (${s.time} - ${s.badge})`
                            )
                          }
                          className="h-11 w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-bold text-[#0A192F] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 cursor-pointer"
                        >
                          <CalendarCheck aria-hidden="true" size={15} />
                          <span>Giữ chỗ ca học này</span>
                        </button>
                      </div>
                    </article>
                  )
                })}
            </div>

            {/* 3-Pillar Flexible Policy Cards */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Đặt lịch học bù 0đ trong tuần',
                  desc: 'Học viên bận đột xuất hoặc ốm được xếp học bù ngay tại lớp tương đương trong tuần hoàn toàn miễn phí.',
                  badge: 'Linh hoạt 100%',
                },
                {
                  title: 'Trợ giảng kèm bổ trợ 1-kèm-1',
                  desc: 'Đội ngũ Trợ giảng IELTS 7.5+ luôn sẵn sàng kèm riêng 1-1 trước hoặc sau giờ học để học viên theo kịp tiến độ.',
                  badge: 'Không lo mất bài',
                },
                {
                  title: 'Bảo lưu & Chuyển cơ sở 06 tháng',
                  desc: 'Hỗ trợ bảo lưu học phí tối đa 06 tháng và chuyển đổi linh hoạt giữa các ca học hoặc cơ sở Tân Bình & Gò Vấp.',
                  badge: 'Cam kết hợp đồng',
                },
              ].map((pol) => (
                <div
                  key={pol.title}
                  className="flex items-start gap-3.5 rounded-2xl border border-amber-200/90 bg-amber-50/70 p-4 sm:p-5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-400/25 text-amber-800">
                    <CheckCircle2 aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <span className="inline-block rounded bg-amber-200/80 px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wider text-amber-950">
                      {pol.badge}
                    </span>
                    <h3 className="mt-1 text-sm sm:text-base font-extrabold text-[#0A192F]">
                      {pol.title}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pol.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY BRIGHT SECTION - Restructured 2-Tier Modern Dark Showcase + Interactive 4-Step Methodology */}
        <section
          id="why"
          className="scroll-reveal scroll-mt-24 bg-[#0A192F] text-white relative overflow-hidden"
        >
          {/* Decorative Ambient Orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 size-96 rounded-full bg-blue-600/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 size-96 rounded-full bg-indigo-600/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            {/* Tier 1: Interactive Ecosystem Switcher (Inspired by PML Academy Solutions) */}
            <div className="mx-auto max-w-2xl text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Sparkles aria-hidden="true" size={13} className="text-amber-300" />
                ONE ACADEMY · TWO PILLARS OF EXCELLENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Học Khác Biệt. Tiến Bộ Thật.
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
                Sự kết hợp hoàn hảo giữa phương pháp tương tác phản xạ tại lớp và hệ sinh thái kèm cặp 1-1 cá nhân hóa có cam kết đầu ra bằng hợp đồng.
              </p>
            </div>

            {/* Interactive Pillar Toggle */}
            <div className="mt-8 flex justify-center">
              <div
                className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner"
                role="tablist"
                aria-label="Khám phá phương pháp đào tạo và hệ sinh thái"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={whyTab === 'inclass'}
                  onClick={() => setWhyTab('inclass')}
                  className={`h-11 px-5 sm:px-7 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    whyTab === 'inclass'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  01. Trải Nghiệm Học Tập Trên Lớp (In-Class)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={whyTab === 'ecosystem'}
                  onClick={() => setWhyTab('ecosystem')}
                  className={`h-11 px-5 sm:px-7 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    whyTab === 'ecosystem'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  02. Kèm Cặp 1-1 &amp; Cam Kết Đầu Ra
                </button>
              </div>
            </div>

            {/* 12-Column Split Showcase */}
            <div className="mt-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                {(whyTab === 'inclass'
                  ? [
                      {
                        title: '100% Môi Trường Tương Tác Phản Xạ (Active Immersion)',
                        desc: 'Xóa bỏ hoàn toàn lối học thụ động chép ngữ pháp. Học viên thảo luận, tranh biện và thuyết trình dự án trực tiếp cùng Giáo viên bản ngữ ngay tại lớp.',
                        metrics: ['70% thời lượng thực hành nói', 'Sĩ số vàng 8–12 học viên', 'Bảng tương tác 4K Smartboard'],
                        icon: Target,
                      },
                      {
                        title: 'Chuẩn Hóa Phát Âm IPA & Tư Duy Học Thuật Quốc Tế',
                        desc: 'Rèn luyện cách tư duy trực tiếp bằng tiếng Anh (Think in English), chỉnh sửa từng âm vị, trọng âm và ngữ điệu tự nhiên từ Mầm non đến IELTS 8.0+.',
                        metrics: ['Chỉnh phát âm 1-1 tại lớp', 'Giáo trình Oxford & Cambridge', 'CLB Speaking cuối tuần'],
                        icon: GraduationCap,
                      },
                      {
                        title: 'Ứng Dụng Công Nghệ AI & Phòng Lab Thi Thử Thực Chiến',
                        desc: 'Kết hợp lớp học trực tiếp với nền tảng luyện phát âm AI tại nhà và hệ thống phòng Lab mô phỏng 100% kỳ thi IELTS trên máy tính của IDP/BC.',
                        metrics: ['App luyện nói AI 24/7', 'Thi thử Computer IELTS miễn phí', 'Kho 3.000+ sách CEFR'],
                        icon: Zap,
                      },
                    ]
                  : [
                      {
                        title: 'Hợp Đồng Cam Kết Chuẩn Đầu Ra Bằng Văn Bản',
                        desc: 'Mỗi học viên Cambridge và IELTS đều được ký hợp đồng cam kết số khiên / band điểm đầu ra rõ ràng. Đào tạo lại miễn phí 100% nếu chưa đạt mục tiêu.',
                        metrics: ['Hợp đồng pháp lý minh bạch', 'Học lại 0đ nếu chưa đạt', '98% đạt & vượt mục tiêu'],
                        icon: ShieldCheck,
                      },
                      {
                        title: 'Cố Vấn Học Tập & Trợ Giảng Kèm Cặp 1-Kèm-1 Sát Sao',
                        desc: 'Mỗi học viên có 01 Cố vấn học tập theo dõi tiến độ từng buổi. Hỗ trợ chấm chữa chi tiết từng bài Writing và kèm bổ trợ 1-1 hoàn toàn miễn phí.',
                        metrics: ['Chấm bài Writing chi tiết', 'Kèm 1-1 miễn phí khi cần', 'Học bù linh hoạt 0đ'],
                        icon: UserCheck,
                      },
                      {
                        title: 'Sổ Liên Lạc Điện Tử & Báo Cáo Video Hàng Tuần Cho Phụ Huynh',
                        desc: 'Sau mỗi tuần học, phụ huynh nhận báo cáo nhận xét của giáo viên quốc tế kèm video quay lại quá trình con thuyết trình và tiến bộ tại lớp.',
                        metrics: ['Video thuyết trình hàng tuần', 'Đánh giá định kỳ mỗi tháng', 'Kết nối Zalo trực tiếp 24/7'],
                        icon: MessageCircle,
                      },
                    ]
                ).map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="group p-5 sm:p-6 rounded-2xl bg-[#0F2347]/70 border border-slate-800 hover:border-blue-500/60 hover:bg-[#0F2347] transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="size-11 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Icon aria-hidden="true" size={20} />
                        </div>
                        <div className="space-y-2 flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-blue-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.desc}
                          </p>
                          <div className="pt-2 grid sm:grid-cols-3 gap-2">
                            {item.metrics.map((m) => (
                              <div key={m} className="flex items-center gap-1.5 text-xs text-slate-200">
                                <CheckCircle2 aria-hidden="true" size={13} className="text-emerald-400 shrink-0" />
                                <span className="text-[11.5px] font-semibold leading-tight">{m}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right 5 Columns: Interactive 4-Photo Visual Gallery Showcase with Prev/Next */}
              <div className="lg:col-span-5">
                {(() => {
                  const whyPhotos =
                    whyTab === 'inclass'
                      ? [
                          {
                            id: 'photo-1509062522246-3755977927d7',
                            tag: 'Blended Learning 4.0',
                            caption: 'Tương tác Smartboard 4K cùng Giáo viên bản ngữ',
                          },
                          {
                            id: 'photo-1577896851231-70ef18881754',
                            tag: 'Active Immersion',
                            caption: '70% Thời lượng thực hành thảo luận & Thuyết trình dự án',
                          },
                          {
                            id: 'photo-1588072432836-e10032774350',
                            tag: 'IPA Pronunciation',
                            caption: 'Chỉnh sửa phát âm & Phản xạ nghe nói trực tiếp tại lớp',
                          },
                          {
                            id: 'photo-1498243691581-b145c3f54a5a',
                            tag: '3.000+ CEFR Books',
                            caption: 'Thư viện mở & Phòng Lab mô phỏng thi IELTS máy tính',
                          },
                        ]
                      : [
                          {
                            id: 'photo-1523240795612-9a054b0db644',
                            tag: '100% Output Guarantee',
                            caption: 'Hợp đồng cam kết chuẩn đầu ra Cambridge & IELTS bằng văn bản',
                          },
                          {
                            id: 'photo-1524995997946-a1c2e315a42f',
                            tag: '1-on-1 Writing Clinic',
                            caption: 'Cố vấn học tập & Trợ giảng kèm bổ trợ 1-kèm-1 hàng tuần',
                          },
                          {
                            id: 'photo-1531482615713-2afd69097998',
                            tag: 'Weekly Video Report',
                            caption: 'Báo cáo tiến độ & Video thuyết trình gửi phụ huynh mỗi tuần',
                          },
                          {
                            id: 'photo-1517245386807-bb43f82c33c4',
                            tag: 'Scholarship Mentorship',
                            caption: 'Hỗ trợ săn học bổng du học & Xét tuyển Đại học Top đầu',
                          },
                        ]

                  const safeIdx = whyPhotoIdx % whyPhotos.length
                  const activeWhyPhoto = whyPhotos[safeIdx]

                  return (
                    <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#0F2347] shadow-2xl">
                      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950">
                        <Image
                          key={activeWhyPhoto.id}
                          src={image(activeWhyPhoto.id, 900)}
                          alt={activeWhyPhoto.caption}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="slide-fade-in media-zoom object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent" />

                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                          <span className="rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-300/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                            {activeWhyPhoto.tag}
                          </span>
                          <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 text-xs font-extrabold text-white">
                            0{safeIdx + 1} / 0{whyPhotos.length}
                          </span>
                        </div>

                        {/* Prev / Next Controls */}
                        <button
                          type="button"
                          onClick={() =>
                            setWhyPhotoIdx((p) => (p - 1 + whyPhotos.length) % whyPhotos.length)
                          }
                          aria-label="Xem ảnh phương pháp trước"
                          className="absolute left-3 top-1/2 -translate-y-1/2 grid size-10 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/20 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setWhyPhotoIdx((p) => (p + 1) % whyPhotos.length)}
                          aria-label="Xem ảnh phương pháp tiếp theo"
                          className="absolute right-3 top-1/2 -translate-y-1/2 grid size-10 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/20 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                        >
                          <ChevronRight size={18} />
                        </button>

                        {/* Live Photo Caption */}
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                          <p className="text-xs sm:text-sm font-bold text-cyan-200 drop-shadow-xs">
                            {activeWhyPhoto.caption}
                          </p>
                        </div>
                      </div>

                      {/* 4 Clickable Thumbnail Previews */}
                      <div className="grid grid-cols-4 gap-2 px-6 pt-4">
                        {whyPhotos.map((wp, idx) => (
                          <button
                            key={wp.id}
                            type="button"
                            onClick={() => setWhyPhotoIdx(idx)}
                            aria-label={`Chọn ảnh ${idx + 1}: ${wp.caption}`}
                            className={`relative h-12 overflow-hidden rounded-lg border transition-all cursor-pointer min-h-0 ${
                              idx === safeIdx
                                ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                                : 'border-slate-700 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Image
                              src={image(wp.id, 200)}
                              alt={wp.caption}
                              fill
                              sizes="100px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>

                      <div className="p-6 sm:p-7 pt-4 space-y-4">
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                          {whyTab === 'inclass'
                            ? 'Mỗi Giờ Học Là Một Trải Nghiệm Ngôn Ngữ Sống Động'
                            : 'Đồng Hành Kèm Cặp Đến Khi Đạt Chuẩn Đầu Ra'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {whyTab === 'inclass'
                            ? 'Học viên được đắm mình trong môi trường 100% tiếng Anh chuẩn bản xứ, phát triển đồng đều Nghe – Nói – Đọc – Viết và kỹ năng thuyết trình tự tin trước đám đông.'
                            : 'Không một học viên nào bị bỏ lại phía sau. Hệ thống cảnh báo sớm và kèm bổ trợ 1-1 giúp học viên luôn vững vàng chinh phục mục tiêu điểm số.'}
                        </p>
                        <div className="pt-1 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => openRegister('', 'Đăng ký trải nghiệm buổi học thử & kiểm tra trình độ 1-1')}
                            className="btn-shimmer inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                          >
                            <span>Đăng ký học thử miễn phí</span>
                            <ArrowRight aria-hidden="true" size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Tier 2: Interactive 4-Step Transformation Process (Inspired by PML Academy Methodology) */}
            <div className="mt-20 pt-16 border-t border-slate-800/90">
              <div className="mx-auto max-w-2xl text-center space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-amber-500/15 text-amber-300 border border-amber-400/30">
                  <Award aria-hidden="true" size={13} className="text-amber-400" />
                  QUY TRÌNH ĐÀO TẠO KỶ LUẬT &amp; KHOA HỌC
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Quy Trình Chuyển Hóa Năng Lực 4 Bước Chuẩn Quốc Tế
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-slate-300">
                  Bấm vào từng bước để xem cách PML English đồng hành đưa học viên từ mất gốc hoặc rụt rè đến tự tin làm chủ chứng chỉ quốc tế.
                </p>
              </div>

              {/* Interactive Stepper Progress Line (Desktop) */}
              <div className="mt-10 hidden md:block max-w-4xl mx-auto">
                <div className="relative flex items-center justify-between">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-amber-400 -translate-y-1/2 transition-all duration-500 z-0"
                    style={{ width: `${(activeMethodStep / 3) * 100}%` }}
                  />
                  {['01', '02', '03', '04'].map((num, idx) => {
                    const isPassedOrActive = idx <= activeMethodStep
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setActiveMethodStep(idx)}
                        aria-label={`Xem bước ${num}`}
                        className={`relative z-10 size-11 rounded-full flex items-center justify-center font-extrabold text-xs transition-all duration-300 cursor-pointer ${
                          idx === activeMethodStep
                            ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30 ring-4 ring-amber-400/25 scale-110'
                            : isPassedOrActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                            : 'bg-slate-900 border-2 border-slate-700 text-slate-400 hover:border-blue-400 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 4 Step Cards */}
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: '01',
                    title: 'Chẩn Đoán Năng Lực 1-1',
                    desc: 'Kiểm tra toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết cùng Giáo viên quốc tế để xác định chính xác trình độ CEFR và thiết kế lộ trình cá nhân hóa.',
                    tag: 'Placement Test 1-1',
                    standard: 'Chuẩn CEFR',
                  },
                  {
                    step: '02',
                    title: '70% Thực Chiến Tương Tác',
                    desc: 'Học qua dự án, thuyết trình và phản biện trực tiếp tại lớp sĩ số nhỏ 8–12 học viên; kích hoạt phản xạ ngôn ngữ tự nhiên ngay tại lớp.',
                    tag: 'Active Immersion',
                    standard: 'Chuẩn Cambridge',
                  },
                  {
                    step: '03',
                    title: 'Coaching & Sửa Lỗi 1-Kèm-1',
                    desc: 'Giáo viên và Cố vấn học tập chấm chữa chi tiết từng bài luận Writing, chỉnh sửa từng âm vị IPA và kèm bổ trợ 1-1 hàng tuần.',
                    tag: '1-on-1 Clinic',
                    standard: 'Rubric Giám khảo',
                  },
                  {
                    step: '04',
                    title: 'Thi Thử Lab & Cam Kết Đầu Ra',
                    desc: 'Đo lường tiến độ hàng tháng trên phòng Lab thi thử chuẩn IDP/Cambridge; bảo đảm học viên đạt và vượt band điểm cam kết trong hợp đồng.',
                    tag: 'Output Guarantee',
                    standard: 'Hợp đồng Đào tạo',
                  },
                ].map((item, idx) => {
                  const isActive = activeMethodStep === idx
                  return (
                    <div
                      key={item.step}
                      onClick={() => setActiveMethodStep(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setActiveMethodStep(idx)
                        }
                      }}
                      className={`group relative rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                        isActive
                          ? 'border-amber-400/80 bg-[#122B57] shadow-2xl shadow-blue-950/50 ring-1 ring-amber-400/50 -translate-y-1'
                          : 'border-slate-800 bg-[#0F2347]/50 hover:-translate-y-1 hover:bg-[#0F2347] hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                              isActive
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-blue-500/15 text-blue-300 border border-blue-400/25'
                            }`}
                          >
                            Bước {item.step}
                          </span>
                          <span
                            className={`text-2xl font-black transition-colors ${
                              isActive ? 'text-amber-400' : 'text-slate-600 group-hover:text-blue-400'
                            }`}
                          >
                            {item.step}
                          </span>
                        </div>
                        <h4 className="mt-4 text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300">
                          <ShieldCheck aria-hidden="true" size={13} className="text-amber-400" />
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {item.standard}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* STORIES SECTION - Real People, Real Transformations with Filter Tabs & Progress Meters */}
        <section
          id="stories"
          className="scroll-reveal scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24 border-b border-slate-200/80"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles aria-hidden="true" size={13} className="text-amber-500" />
                  REAL PEOPLE · REAL TRANSFORMATIONS
                </span>
                <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                  Câu Chuyện Tiến Bộ &amp; Bảng Vàng Thành Tích
                </h2>
                <p className="mt-2 text-sm sm:text-base lg:text-lg text-slate-600">
                  Hơn 15.000+ học viên đã bứt phá điểm số và sự tự tin. Mỗi câu chuyện là một hành trình chuyển hóa có thật được kiểm chứng bằng chứng chỉ quốc tế.
                </p>
              </div>

              {/* Filter Tabs by Learner Achievement Group */}
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Lọc câu chuyện học viên theo nhóm thành tích"
              >
                {[
                  { id: 'all' as const, label: 'Tất cả (6)' },
                  { id: 'ielts' as const, label: 'Bứt phá IELTS 7.5–8.5+' },
                  { id: 'cambridge' as const, label: 'Bé đạt 15 Khiên Cambridge' },
                  { id: 'adults' as const, label: 'Người đi làm & Học bổng' },
                ].map((tab) => {
                  const isSelected = storyFilter === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setStoryFilter(tab.id)}
                      className={`h-10 rounded-xl px-4 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 6 Rich Transformation Cards with Interactive 2-Photo Header Gallery (Prev/Next) */}
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Nguyễn Minh Anh',
                  group: 'ielts' as const,
                  school: 'Học sinh Lớp 11 · THPT Chuyên',
                  score: 'IELTS 8.0 Overall',
                  verifiedCode: 'IDP Verified · Speaking 8.0',
                  beforeScore: '5.5',
                  afterScore: '8.0 Overall',
                  deltaText: '+2.5 Band IELTS sau 5 tháng (Speaking 8.0, Listening 8.5)',
                  courseTag: 'IELTS Mastery 7.0+',
                  image: 'photo-1534528741775-53994a69daeb',
                  photos: [
                    { id: 'photo-1534528741775-53994a69daeb', label: 'Chân dung học viên · IELTS 8.0' },
                    { id: 'photo-1523240795612-9a054b0db644', label: 'Giờ thực hành Speaking & Tranh biện' },
                    { id: 'photo-1434030216411-0b793f4b4173', label: 'Chấm chữa luận Writing 1-1' },
                  ],
                  quote:
                    'Trước đây mình luôn bị khựng lại ở Speaking Part 3 và Writing Task 2 chỉ đạt 5.5. Nhờ thầy Mark Wilson trực tiếp sửa từng lập luận hàng tuần, mình đã bứt phá lên 8.0 Overall ngay lần thi đầu tiên.',
                },
                {
                  name: 'Trần Hoàng Nam',
                  group: 'ielts' as const,
                  school: 'Học sinh Lớp 9 · Xét tuyển Chuyên Anh',
                  score: 'IELTS 7.5 Overall',
                  verifiedCode: 'British Council · Reading 8.5',
                  beforeScore: '4.5',
                  afterScore: '7.5 (Lớp 9)',
                  deltaText: '+3.0 Band IELTS sau 6 tháng · Đỗ Chuyên Anh nguyện vọng 1',
                  courseTag: 'IELTS Breakthrough',
                  image: 'photo-1500648767791-00dcc994a43e',
                  photos: [
                    { id: 'photo-1500648767791-00dcc994a43e', label: 'Chân dung học viên · IELTS 7.5' },
                    { id: 'photo-1524178232363-1fb2b075b655', label: 'Lớp luyện đề IELTS chuyên sâu' },
                    { id: 'photo-1521587760476-6c12a4b040da', label: 'Thư viện học thuật Oxford & Cambridge' },
                  ],
                  quote:
                    'Phương pháp Mindmap từ vựng học thuật của thầy Alex giúp mình đọc hiểu các bài Reading dài mà không cần dịch từng chữ. Điểm Reading của mình tăng từ 5.0 lên 8.5 chỉ sau 1 lộ trình.',
                },
                {
                  name: 'Lê Bảo Ngọc',
                  group: 'adults' as const,
                  school: 'Học bổng 100% — Monash University (Úc)',
                  score: 'IELTS 8.0 · Du học',
                  verifiedCode: 'Full Scholarship Winner',
                  beforeScore: '6.0',
                  afterScore: '8.0 & Học bổng',
                  deltaText: 'Đạt IELTS 8.0 & Chinh phục Học bổng Toàn phần Đại học Úc',
                  courseTag: 'IELTS Mastery 7.0+',
                  image: 'photo-1531123897727-8f129e1688ce',
                  photos: [
                    { id: 'photo-1531123897727-8f129e1688ce', label: 'Tân du học sinh Học bổng Monash' },
                    { id: 'photo-1517245386807-bb43f82c33c4', label: 'Buổi bảo vệ luận & Phỏng vấn học bổng' },
                    { id: 'photo-1498243691581-b145c3f54a5a', label: 'Không gian tự học & Nghiên cứu' },
                  ],
                  quote:
                    'Không chỉ luyện thi, các buổi cố vấn 1-1 tại trung tâm còn giúp mình hoàn thiện bài luận Personal Statement sắc bén và phong thái phỏng vấn học bổng tự tin trước hội đồng trường Monash.',
                },
                {
                  name: 'Bé Phạm Tuấn Kiệt ( & Mẹ Thu Hà)',
                  group: 'cambridge' as const,
                  school: 'Học sinh Lớp 4 · Tiểu học Quốc tế',
                  score: '15/15 Khiên Flyers',
                  verifiedCode: 'Cambridge YLE · Tuyệt đối',
                  beforeScore: 'Rụt rè khi nói',
                  afterScore: '15/15 Khiên',
                  deltaText: 'Đạt tối đa 15/15 Khiên Cambridge Flyers & Giải Nhất Hùng biện',
                  courseTag: 'Cambridge Champions',
                  image: 'photo-1506794778202-cad84cf45f1d',
                  photos: [
                    { id: 'photo-1503676260728-1c00da094a0b', label: 'Học viên nhí chinh phục 15 Khiên Cambridge' },
                    { id: 'photo-1509062522246-3755977927d7', label: 'Lớp học tương tác Smartboard 4K' },
                    { id: 'photo-1577896851231-70ef18881754', label: 'Thuyết trình dự án bằng tiếng Anh' },
                  ],
                  quote:
                    'Từ một cậu bé rất ngại giao tiếp với người nước ngoài, sau 8 tháng học cô Sarah Jenkins, con chủ động nói tiếng Anh cả ở nhà và đạt tuyệt đối 15 khiên kỳ thi Cambridge Flyers.',
                },
                {
                  name: 'Anh Vũ Quốc Tuấn',
                  group: 'adults' as const,
                  school: 'Senior Project Manager · Tập đoàn Đa quốc gia',
                  score: 'CEFR C1 Business',
                  verifiedCode: 'Executive Communication',
                  beforeScore: 'Ngại họp tiếng Anh',
                  afterScore: 'Làm chủ Đàm phán',
                  deltaText: 'Thăng tiến Quản lý Dự án Khu vực APAC sau 4 tháng huấn luyện',
                  courseTag: 'Speak with Confidence',
                  image: 'photo-1507003211169-0a1dd7228f2d',
                  photos: [
                    { id: 'photo-1521737711867-e3b97375f902', label: 'Thực hành thuyết trình & Đàm phán quốc tế' },
                    { id: 'photo-1507003211169-0a1dd7228f2d', label: 'Chân dung học viên Doanh nghiệp' },
                    { id: 'photo-1522202176988-66273c2fd55f', label: 'CLB Business Networking cuối tuần' },
                  ],
                  quote:
                    'Lịch làm việc dày đặc khiến mình từng bỏ dở nhiều nơi. Chính sách học bù 0đ và các buổi thực hành Pitching thực tế cùng cô Emma đã giúp mình tự tin chủ trì các cuộc họp bằng tiếng Anh.',
                },
                {
                  name: 'Bé Nguyễn Ngọc Hân ( & Mẹ Minh Trang)',
                  group: 'cambridge' as const,
                  school: 'Học viên 6 tuổi · Lớp Mầm non Lớn',
                  score: '15/15 Khiên Starters',
                  verifiedCode: 'Phonics Mastery · Pre-A1',
                  beforeScore: 'Chưa biết mặt chữ',
                  afterScore: 'Đọc thông Thảo nói',
                  deltaText: 'Làm chủ 44 âm Phonics & Phản xạ giao tiếp 100% với GV Bản ngữ',
                  courseTag: 'English Explorers',
                  image: 'photo-1580489944761-15a19d654956',
                  photos: [
                    { id: 'photo-1503454537195-1dcabb73ffb9', label: 'Sân khấu kể chuyện Storytelling cuối tuần' },
                    { id: 'photo-1587654780291-39c9404d746b', label: 'Hoạt động Phonics & STEAM tiếng Anh' },
                    { id: 'photo-1544717302-de2939b7ef71', label: 'Lớp học nhóm nhỏ cùng GV Bản ngữ' },
                  ],
                  quote:
                    'Mỗi tuần nhận video cô giáo gửi về qua Zalo đều thấy con phát âm tròn vành rõ chữ hơn. Con cực kỳ mê sân khấu kể chuyện Storytelling cuối tuần ở trung tâm.',
                },
              ]
                .filter((st) => storyFilter === 'all' || st.group === storyFilter)
                .map((student, index) => {
                  const sIdx = storyPhotoMap[student.name] ?? 0
                  const activeStoryPhoto = student.photos[sIdx] || student.photos[0]
                  const prevStoryPhoto = () =>
                    setStoryPhotoMap((p) => ({
                      ...p,
                      [student.name]: ((p[student.name] ?? 0) - 1 + student.photos.length) % student.photos.length,
                    }))
                  const nextStoryPhoto = () =>
                    setStoryPhotoMap((p) => ({
                      ...p,
                      [student.name]: ((p[student.name] ?? 0) + 1) % student.photos.length,
                    }))

                  return (
                    <article
                      key={student.name}
                      className="stagger-item list-enter group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-[#F8FAFC] shadow-xl shadow-slate-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:bg-white hover:shadow-2xl"
                      style={{ '--stagger-delay': `${index * 100}ms`, animationDelay: `${index * 100}ms` } as React.CSSProperties}
                    >
                      <div>
                        {/* Interactive Photo Gallery Header with Prev/Next */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                          <Image
                            key={activeStoryPhoto.id}
                            src={image(activeStoryPhoto.id, 650)}
                            alt={`${student.name} - ${activeStoryPhoto.label}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 380px"
                            className="slide-fade-in media-zoom object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-black/25 to-transparent" />

                          {/* Top Verified Certificate Pill & Score */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-extrabold text-blue-900 shadow-xs">
                              <ShieldCheck aria-hidden="true" size={12} className="text-blue-600" />
                              {student.verifiedCode}
                            </span>
                            <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-black text-slate-950 shadow-xs">
                              {student.score}
                            </span>
                          </div>

                          {/* Prev / Next Buttons on Story Card Image */}
                          <button
                            type="button"
                            onClick={prevStoryPhoto}
                            aria-label={`Ảnh trước của ${student.name}`}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 grid size-8 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/25 transition hover:bg-blue-600 hover:scale-110 cursor-pointer"
                          >
                            <ChevronLeft size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={nextStoryPhoto}
                            aria-label={`Ảnh tiếp theo của ${student.name}`}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 grid size-8 min-h-0 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/25 transition hover:bg-blue-600 hover:scale-110 cursor-pointer"
                          >
                            <ChevronRight size={15} />
                          </button>

                          {/* Bottom Photo Caption + Dots */}
                          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                            <span className="truncate text-[11px] font-bold text-slate-100 drop-shadow-xs">
                              {activeStoryPhoto.label}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              {student.photos.map((ph, pIdx) => (
                                <span
                                  key={ph.id}
                                  className={`h-1.5 rounded-full transition-all ${
                                    pIdx === sIdx ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pb-0">
                          {/* Visual Before -> After Transformation Bar */}
                          <div className="rounded-xl border border-emerald-200/90 bg-emerald-50/90 p-3">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-slate-600">
                                Đầu vào: <strong className="text-slate-800">{student.beforeScore}</strong>
                              </span>
                              <ArrowRight aria-hidden="true" size={13} className="text-emerald-600" />
                              <span className="rounded bg-emerald-600 px-2 py-0.5 text-white font-extrabold">
                                Đầu ra: {student.afterScore}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-1.5 text-xs font-extrabold text-emerald-900">
                              <TrendingUp aria-hidden="true" size={14} className="shrink-0 text-emerald-600" />
                              <span>{student.deltaText}</span>
                            </div>
                          </div>

                          {/* Quote */}
                          <blockquote className="mt-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            &ldquo;{student.quote}&rdquo;
                          </blockquote>
                        </div>
                      </div>

                      {/* Profile Footer + Course Tag Button */}
                      <div className="p-5 pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Image
                            src={image(student.image, 140)}
                            alt={`Học viên ${student.name} - ${student.school}`}
                            width={44}
                            height={44}
                            className="size-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                          />
                          <div className="min-w-0">
                            <h3 className="text-sm font-extrabold text-[#0A192F] group-hover:text-blue-600 transition-colors truncate">
                              {student.name}
                            </h3>
                            <p className="truncate text-xs text-slate-500 mt-0.5">{student.school}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const matched = COURSES.find((c) => c.title === student.courseTag)
                            if (matched) setDetailCourse(matched)
                          }}
                          className="shrink-0 rounded-lg bg-indigo-50 hover:bg-blue-600 hover:text-white border border-indigo-200/70 px-2.5 py-1.5 text-center text-[11px] font-extrabold leading-tight text-indigo-800 transition-colors cursor-pointer min-h-0"
                          title={`Xem chi tiết khóa ${student.courseTag}`}
                        >
                          {student.courseTag} →
                        </button>
                      </div>
                    </article>
                  )
                })}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION - Modern 2-Column Split Layout with Category Badges */}
        <section
          id="faq"
          className="scroll-reveal scroll-mt-24 bg-[#F8FAFC] px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              {/* Left 4 Columns: Direct Support & Contract Guarantee Box */}
              <div className="lg:col-span-4 space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
                    <HelpCircle aria-hidden="true" size={14} className="text-blue-600" />
                    MINH BẠCH CHÍNH SÁCH &amp; QUYỀN LỢI
                  </span>
                  <h2 className="mt-2.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A192F]">
                    Những Câu Hỏi Phụ Huynh Quan Tâm Nhất
                  </h2>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
                    Mọi thắc mắc về học phí, hợp đồng cam kết đầu ra, sĩ số lớp và chính sách học thử đều được giải đáp rõ ràng.
                  </p>
                </div>

                <div className="rounded-3xl bg-[#0A192F] p-6 text-white shadow-xl space-y-4 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-md">
                      <Headphones aria-hidden="true" size={20} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Hỗ trợ Học vụ 7 ngày / tuần
                      </p>
                      <h3 className="text-base font-extrabold text-white">
                        Cần tư vấn lộ trình riêng?
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Đội ngũ Cố vấn Học thuật luôn sẵn sàng giải đáp trực tiếp qua Zalo hoặc đặt lịch kiểm tra trình độ 1-1 miễn phí cùng Giáo viên bản ngữ.
                  </p>
                  <div className="grid gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => openRegister('', 'Cần giải đáp thêm thông tin khóa học & học phí')}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 text-xs sm:text-sm font-bold text-white transition cursor-pointer"
                    >
                      <span>Đặt câu hỏi cho Cố vấn</span>
                      <ArrowRight aria-hidden="true" size={15} />
                    </button>
                    <a
                      href="https://zalo.me/0789780167"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 px-4 text-xs sm:text-sm font-bold text-slate-200 transition"
                    >
                      <MessageCircle aria-hidden="true" size={15} className="text-blue-400" />
                      <span>Chat Zalo: 0789 780 167</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right 8 Columns: Category-Tagged Accordion List */}
              <div className="lg:col-span-8 grid gap-3.5">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx
                  const panelId = `faq-panel-${idx}`
                  const btnId = `faq-btn-${idx}`
                  return (
                    <div
                      key={faq.q}
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? 'border-blue-500 bg-white shadow-lg ring-1 ring-blue-500/20'
                          : 'border-slate-200/90 bg-white hover:border-slate-300'
                      }`}
                    >
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="flex min-h-[56px] w-full items-center justify-between gap-4 p-5 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span
                            className={`self-start sm:self-auto shrink-0 rounded-md px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${
                              isOpen
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {faq.category}
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-[#0A192F] leading-snug">
                            {faq.q}
                          </span>
                        </div>
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-200 ${
                            isOpen
                              ? 'bg-blue-600 text-white rotate-180'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <ChevronDown aria-hidden="true" size={16} />
                        </span>
                      </button>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-slate-100 px-5 pb-5 pt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CAMPUS FACILITIES SECTION - Clickable Multi-Space Photo Albums */}
        <section
          id="campus"
          className="scroll-reveal scroll-mt-24 bg-[#F1F5F9] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                  <Camera aria-hidden="true" size={14} className="text-blue-700" />
                  Không gian trải nghiệm · Click từng khu vực để xem Album
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                  Cơ Sở Vật Chất Hiện Đại Chuẩn 5 Sao
                </h2>
                <p className="mt-2 max-w-2xl text-sm sm:text-base lg:text-lg text-slate-600">
                  Bấm vào từng phân khu bên dưới để khám phá bộ ảnh chi tiết các phòng học thông minh, thư viện học thuật, khu thảo luận CLB và không gian sáng tạo tại trung tâm.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveCampusTopicIndex(0)
                  setActiveAlbumPhotoIndex(0)
                }}
                className="self-start sm:self-auto inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 text-sm sm:text-base font-bold text-blue-700 shadow-2xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shrink-0"
              >
                <Camera aria-hidden="true" size={16} />
                <span>Xem toàn bộ Album (16 ảnh)</span>
              </button>
            </div>

            <div className="mt-8 grid auto-rows-[230px] grid-cols-1 gap-4 sm:auto-rows-[250px] sm:grid-cols-2 lg:grid-cols-4">
              {CAMPUS_PHOTOS.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setActiveCampusTopicIndex(i)
                    setActiveAlbumPhotoIndex(0)
                  }}
                  style={{ '--stagger-delay': `${i * 100}ms` } as React.CSSProperties}
                  aria-label={`Mở album hình ảnh ${item.caption} (${item.album.length} ảnh)`}
                  className={`stagger-item group relative overflow-hidden rounded-3xl text-left shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer ${
                    i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                  }`}
                >
                  <Image
                    className={`${i === 0 ? 'media-pan' : 'media-zoom'} object-cover`}
                    src={image(item.id, 900)}
                    alt={item.alt}
                    fill
                    sizes={
                      i === 0
                        ? '(max-width: 640px) 100vw, 600px'
                        : '(max-width: 640px) 100vw, 300px'
                    }
                  />
                  {/* Dark high-contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-[#0A192F]/95" />

                  {/* Top Badges: Space Tag + Album Photo Count */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                      {item.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-extrabold text-[#0A192F] shadow-md transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Camera aria-hidden="true" size={13} />
                      <span>{item.album.length} ảnh</span>
                    </span>
                  </div>

                  {/* Bottom Content & Interactive Album Prompt */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className={`${i === 0 ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'} font-extrabold leading-snug`}>
                      {item.caption}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                      {item.sub}
                    </p>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-300 group-hover:text-amber-300 transition-colors">
                      <span>Bấm để xem album không gian</span>
                      <ArrowRight aria-hidden="true" size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* HOW TO START & INLINE CONSULTATION FORM SECTION */}
        <section id="start" className="scroll-reveal scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
                  Lộ trình đăng ký
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F]">
                  Ba Bước Đơn Giản Để Bắt Đầu Cùng Bright
                </h2>
                <p className="mt-2 text-base sm:text-lg text-slate-600">
                  Trải nghiệm môi trường học quốc tế hoàn toàn miễn phí trước khi quyết định đăng ký khóa học chính thức.
                </p>

                <ol className="mt-6 grid gap-4">
                  <li
                    style={{ '--stagger-delay': '0ms' } as React.CSSProperties}
                    className="stagger-item list-enter flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div>
                      <span className="inline-block rounded-md bg-indigo-100 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-indigo-900">
                        Bước 1
                      </span>
                      <h3 className="mt-2 text-lg font-extrabold text-[#0A192F]">
                        Chọn chương trình học phù hợp
                      </h3>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-600">
                        Khám phá các khóa học phù hợp độ tuổi từ mầm non, tiểu học, THCS &amp; IELTS tới giao tiếp người đi làm.
                      </p>
                    </div>
                    <a
                      href="#courses"
                      className="inline-flex min-h-11 shrink-0 items-center text-sm font-bold text-indigo-700 hover:text-indigo-900"
                    >
                      Xem khóa học <ArrowRight size={15} className="ml-1.5" />
                    </a>
                  </li>

                  <li
                    className="stagger-item list-enter flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    style={{ '--stagger-delay': '100ms', animationDelay: '100ms' } as React.CSSProperties}
                  >
                    <div>
                      <span className="inline-block rounded-md bg-indigo-100 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-indigo-900">
                        Bước 2
                      </span>
                      <h3 className="mt-2 text-lg font-extrabold text-[#0A192F]">
                        Làm bài test 3 phút trực tuyến
                      </h3>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-600">
                        Kiểm tra nhanh trình độ theo độ tuổi để nhận kết quả phân loại CEFR và đề xuất khóa học.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModal('quiz')}
                      className="inline-flex min-h-11 shrink-0 items-center text-sm font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
                    >
                      Làm test ngay <ArrowRight size={15} className="ml-1.5" />
                    </button>
                  </li>

                  <li
                    className="stagger-item list-enter flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50/80 p-5"
                    style={{ '--stagger-delay': '200ms', animationDelay: '200ms' } as React.CSSProperties}
                  >
                    <div>
                      <span className="inline-block rounded-md bg-amber-200 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-950">
                        Bước 3
                      </span>
                      <h3 className="mt-2 text-lg font-extrabold text-[#0A192F]">
                        Nhận lịch học thử 1-kèm-1 miễn phí
                      </h3>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-700">
                        Điền form đăng ký nhanh ngay bên cạnh, tư vấn viên sẽ liên hệ trong 15 phút để xếp lịch học thử.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Inline Direct Consultation Form Card */}
              <div className="rounded-3xl border border-indigo-100 bg-gradient-to-b from-indigo-50/70 via-white to-white p-6 shadow-lg shadow-indigo-950/5 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
                    <Sparkles aria-hidden="true" size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                      Ưu đãi giữ chỗ nhanh
                    </p>
                    <h3 className="text-xl font-black text-[#0A192F]">
                      Đăng Ký Học Thử &amp; Tư Vấn
                    </h3>
                  </div>
                </div>

                {inlineSuccess ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-center"
                  >
                    <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-md">
                      <Check size={24} strokeWidth={3} />
                    </span>
                    <p className="mt-3 text-lg font-extrabold text-emerald-950">
                      Đã nhận đăng ký của {inlineName}!
                    </p>
                    <p className="mt-1 text-sm text-emerald-900 leading-relaxed">
                      Tư vấn viên Bright sẽ gọi tới số <strong>{inlinePhone}</strong> trong 15 phút để xác nhận lịch học thử chương trình{' '}
                      <strong>{inlineCourse}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setInlineSuccess(false)
                        setInlineName('')
                        setInlinePhone('')
                      }}
                      className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-xs font-bold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                    >
                      Đăng ký thêm học viên khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInlineSubmit} noValidate className="mt-5 grid gap-3.5">
                    {Object.keys(inlineErrors).some((k) => Boolean(inlineErrors[k])) && (
                      <div
                        ref={inlineErrorRef}
                        role="alert"
                        tabIndex={-1}
                        className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs font-semibold text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        Vui lòng kiểm tra lại thông tin họ tên và số điện thoại bên dưới.
                      </div>
                    )}

                    <div className="grid gap-1">
                      <label htmlFor="inline-name" className="text-xs sm:text-sm font-bold text-slate-800">
                        Họ và tên phụ huynh / học viên <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="inline-name"
                        required
                        aria-invalid={Boolean(inlineErrors.name)}
                        aria-describedby={inlineErrors.name ? 'inline-name-error' : undefined}
                        value={inlineName}
                        onChange={(e) => {
                          setInlineName(e.target.value)
                          if (inlineErrors.name) setInlineErrors((p) => ({ ...p, name: '' }))
                        }}
                        placeholder="Ví dụ: Nguyễn Minh Anh"
                        className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:ring-2 ${
                          inlineErrors.name
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                        }`}
                      />
                      {inlineErrors.name && (
                        <p id="inline-name-error" className="text-xs font-medium text-rose-600">
                          {inlineErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-1">
                      <label htmlFor="inline-phone" className="text-xs sm:text-sm font-bold text-slate-800">
                        Số điện thoại nhận tư vấn <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="inline-phone"
                        type="tel"
                        inputMode="tel"
                        required
                        aria-invalid={Boolean(inlineErrors.phone)}
                        aria-describedby={inlineErrors.phone ? 'inline-phone-error' : undefined}
                        value={inlinePhone}
                        onChange={(e) => {
                          setInlinePhone(e.target.value)
                          if (inlineErrors.phone) setInlineErrors((p) => ({ ...p, phone: '' }))
                        }}
                        placeholder="Ví dụ: 090 123 4567"
                        className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:ring-2 ${
                          inlineErrors.phone
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                        }`}
                      />
                      {inlineErrors.phone && (
                        <p id="inline-phone-error" className="text-xs font-medium text-rose-600">
                          {inlineErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-1">
                      <label htmlFor="inline-course" className="text-xs sm:text-sm font-bold text-slate-800">
                        Chương trình quan tâm
                      </label>
                      <select
                        id="inline-course"
                        value={inlineCourse}
                        onChange={(e) => setInlineCourse(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      >
                        {COURSE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-1">
                      <label htmlFor="inline-branch" className="text-xs sm:text-sm font-bold text-slate-800">
                        Cơ sở đăng ký học thử
                      </label>
                      <select
                        id="inline-branch"
                        value={inlineBranch}
                        onChange={(e) => setInlineBranch(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="208 Trường Chinh, Phường Tân Bình, TP.HCM">
                          Trụ sở chính: 208 Trường Chinh, Phường Tân Bình, TP.HCM
                        </option>
                        <option value="12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM">
                          Cơ sở 2: 12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-5 text-sm sm:text-base font-bold text-slate-950 shadow-md shadow-amber-500/20 transition cursor-pointer"
                    >
                      Nhận lịch học thử miễn phí <ArrowRight aria-hidden="true" size={16} />
                    </button>
                    <p className="text-center text-xs text-slate-500">
                      Miễn phí 100% buổi học thử · Bảo mật thông tin tuyệt đối
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Campus Address & Contacts */}
            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 lg:grid-cols-4 text-sm sm:text-base">
              <a
                href="tel:0789780167"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-slate-900 hover:text-blue-600"
              >
                <Phone aria-hidden="true" size={16} className="text-amber-500 shrink-0" />
                Hotline / Zalo: 0789 780 167
              </a>
              <a
                href="mailto:pmluanvn@gmail.com"
                className="inline-flex min-h-11 items-center gap-2 font-bold text-slate-900 hover:text-blue-600"
              >
                <Mail aria-hidden="true" size={16} className="text-blue-600 shrink-0" />
                pmluanvn@gmail.com
              </a>
              {BRANCHES.map((b) => (
                <div key={b.name} className="flex flex-col justify-center">
                  <p className="flex items-start gap-1.5 text-sm sm:text-base text-slate-700">
                    <MapPin aria-hidden="true" size={15} className="mt-0.5 text-blue-600 shrink-0" />
                    <span>{b.address}</span>
                  </p>
                  <a
                    href={b.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-[36px] items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:underline pl-5"
                  >
                    Xem chỉ đường trên Google Maps <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER - Matched to pmlacademy.vercel.app */}
      <footer id="contact" className="bg-[#070F1E] text-slate-300 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
            {/* Brand & Social Networks */}
            <div className="lg:col-span-4 space-y-5">
              <a
                href="#home"
                className="inline-flex items-center gap-3 min-h-[44px]"
                aria-label="PML Vietnam - Bright English Trang chủ"
              >
                <div className="size-11 rounded-xl bg-gradient-to-br from-[#0A192F] via-[#163265] to-[#2563EB] flex items-center justify-center text-white shadow-lg border border-white/10 shrink-0">
                  <Sparkles aria-hidden="true" size={22} className="text-amber-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[20px] font-extrabold tracking-tight text-white leading-tight">
                    PML <span className="text-blue-500">ENGLISH</span>
                  </span>
                  <span className="text-[9.5px] font-bold tracking-[0.24em] text-slate-400 uppercase">
                    ACADEMY &amp; CAMBRIDGE SOLUTIONS
                  </span>
                </div>
              </a>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Hệ thống đào tạo Anh ngữ học thuật, Cambridge &amp; IELTS theo chuẩn quốc tế. Nền tảng học tập số và giải pháp trải nghiệm được vận hành bởi PML Vietnam (pmlvietnam.vn).
              </p>

              <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-300">
                <ShieldCheck aria-hidden="true" size={18} className="text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Cambridge &amp; ICF Accredited Partner</span>
                  <span className="text-[11px] text-slate-400">100% CELTA / TESOL International Faculty</span>
                </div>
              </div>

              {/* Social Network Icons - Exact match to pmlacademy.vercel.app */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href="https://facebook.com/pmlvietnam.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-11 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-md shadow-blue-900/30 hover:scale-105 hover:brightness-110 transition-all cursor-pointer"
                  aria-label="Facebook PML Vietnam"
                  title="Facebook PML Vietnam"
                >
                  <svg className="size-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@pmlvietnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-11 rounded-xl bg-[#FF0000] text-white flex items-center justify-center shadow-md shadow-red-900/30 hover:scale-105 hover:brightness-110 transition-all cursor-pointer"
                  aria-label="YouTube PML Vietnam"
                  title="YouTube PML Vietnam"
                >
                  <svg className="size-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://zalo.me/0789780167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-4 rounded-xl bg-[#0068FF] text-white flex items-center gap-1.5 shadow-md shadow-blue-500/30 hover:scale-105 hover:brightness-110 transition-all font-bold text-xs cursor-pointer"
                  aria-label="Chat Zalo PML Vietnam"
                  title="Chat Zalo PML Vietnam (0789 780 167)"
                >
                  <MessageCircle aria-hidden="true" size={17} className="text-white" />
                  <span className="font-bold text-white tracking-wide">Zalo</span>
                </a>
                <a
                  href="https://pmlvietnam.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center gap-1 shadow-md hover:bg-slate-700 hover:border-blue-400 hover:scale-105 transition-all text-xs font-semibold cursor-pointer"
                  title="Website chính thức pmlvietnam.vn"
                >
                  <span className="text-blue-400 font-bold">pmlvietnam.vn</span>
                </a>
              </div>
            </div>

            {/* Programs */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Chương Trình</h4>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-400">
                <li>
                  <a href="#courses" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                    English Explorers (4–6 tuổi)
                  </a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                    Bright Stars (6–11 tuổi)
                  </a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                    Cambridge Champions
                  </a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                    IELTS Breakthrough 6.5+
                  </a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                    IELTS Mastery 7.0–8.0+
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openRegister('Giao tiếp người đi làm · Speak with Confidence')}
                    className="hover:text-white transition-colors text-left cursor-pointer min-h-[44px] flex items-center"
                  >
                    Speak with Confidence (Đi làm)
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Office */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Liên Hệ &amp; Văn Phòng</h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-400">
                <div className="flex items-start gap-2.5 min-h-[44px]">
                  <MapPin aria-hidden="true" size={16} className="text-blue-400 shrink-0 mt-1" />
                  <span>
                    <strong className="text-slate-200">Địa chỉ:</strong> 208 Trường Chinh, Phường Tân Bình, TP. Hồ Chí Minh
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Headphones aria-hidden="true" size={16} className="text-amber-400 shrink-0" />
                  <a
                    href="tel:0789780167"
                    className="hover:text-white text-slate-200 font-semibold min-h-[44px] flex items-center"
                  >
                    Hotline / Zalo: 0789 780 167
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" size={16} className="text-blue-400 shrink-0" />
                  <a href="mailto:pmluanvn@gmail.com" className="hover:text-white min-h-[44px] flex items-center">
                    pmluanvn@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 min-h-[36px]">
                  <Clock3 aria-hidden="true" size={16} className="text-slate-500 shrink-0" />
                  <span>Thứ 2 – Chủ Nhật (8:00 – 21:30)</span>
                </div>
              </div>
            </div>

            {/* Newsletter & Official Site Link */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bí Kíp &amp; Học Bổng</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nhận tài liệu ngữ pháp, đề thi thử IELTS/Cambridge và thông tin ưu đãi học phí vào mỗi tuần.
              </p>

              {newsletterSuccess ? (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-xl bg-emerald-500/20 p-3 text-xs sm:text-sm font-semibold text-emerald-300 border border-emerald-500/30"
                >
                  <Check aria-hidden="true" size={16} /> Đăng ký thành công! Hãy kiểm tra hộp thư bạn nhé.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2" noValidate>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email nhận bản tin
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@company.com"
                      aria-label="Email nhận bản tin"
                      aria-invalid={Boolean(newsletterError)}
                      aria-describedby={newsletterError ? 'newsletter-email-error' : undefined}
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value)
                        if (newsletterError) setNewsletterError('')
                      }}
                      className="h-11 flex-1 min-w-0 rounded-xl bg-slate-900 border px-4 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border-slate-700 focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="h-11 min-w-[44px] px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      aria-label="Gửi đăng ký bản tin"
                    >
                      <Send aria-hidden="true" size={15} />
                    </button>
                  </div>
                  {newsletterError && (
                    <p id="newsletter-email-error" className="text-xs font-medium text-rose-300" role="alert">
                      {newsletterError}
                    </p>
                  )}
                </form>
              )}

              <div className="pt-2">
                <a
                  href="https://pmlvietnam.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 h-11 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <span>Truy Cập pmlvietnam.vn</span>
                  <ArrowRight aria-hidden="true" size={13} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
            <div>
              © 2026 PML Vietnam (pmlvietnam.vn). Toàn bộ giải pháp và mã nguồn được thiết kế bởi PML Vietnam.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 font-medium">
              <button
                type="button"
                onClick={() => setPolicyType('privacy')}
                className="min-h-[44px] inline-flex items-center hover:text-white transition-colors cursor-pointer"
              >
                Chính sách bảo mật
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setPolicyType('terms')}
                className="min-h-[44px] inline-flex items-center hover:text-white transition-colors cursor-pointer"
              >
                Điều khoản dịch vụ
              </button>
              <span aria-hidden="true">·</span>
              <a
                href="https://pmlvietnam.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center hover:text-white transition-colors"
              >
                PML Vietnam
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM DOCK - Matched to pmlacademy.vercel.app */}
      <div
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 flex items-center gap-2 shadow-2xl"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href="tel:0789780167"
          className="h-11 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs gap-1.5 shrink-0 border border-slate-200/80 active:scale-95 transition-all"
          aria-label="Gọi hotline 0789 780 167"
        >
          <Phone aria-hidden="true" size={15} className="text-amber-500" />
          <span>Gọi ngay</span>
        </a>
        <a
          href="https://zalo.me/0789780167"
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-xs gap-1.5 shrink-0 active:scale-95 transition-all"
          aria-label="Chat Zalo PML Vietnam"
        >
          <MessageCircle aria-hidden="true" size={15} className="text-blue-600" />
          <span>Zalo</span>
        </a>
        <button
          type="button"
          onClick={() => openRegister()}
          className="h-11 flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/25 active:scale-95 transition-all cursor-pointer"
          aria-label="Nhận tư vấn lộ trình 1-1"
        >
          <CalendarCheck aria-hidden="true" size={15} />
          <span>Tư vấn 1-1</span>
        </button>
      </div>

      {/* BACK TO TOP BUTTON WITH CIRCULAR PROGRESS RING (Appears past 40% scroll) */}
      <button
        type="button"
        onClick={() => {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
        }}
        aria-label="Cuộn lên đầu trang"
        title="Cuộn lên đầu trang"
        className={`fixed bottom-20 right-3.5 sm:bottom-[178px] sm:right-6 z-40 grid size-12 place-items-center rounded-full bg-white/95 text-[#0A192F] shadow-xl shadow-slate-950/15 backdrop-blur-md transition-[transform,opacity] duration-300 ease-out hover:-translate-y-1 hover:text-blue-600 active:scale-95 cursor-pointer will-change-transform ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg
          className="pointer-events-none absolute inset-0 size-12 -rotate-90"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="2.5"
          />
          <circle
            ref={progressCircleRef}
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeDasharray="125.66"
            strokeDashoffset="125.66"
          />
        </svg>
        <ArrowUp aria-hidden="true" size={18} strokeWidth={2.5} className="relative z-10" />
      </button>

      {/* DESKTOP FLOATING ACTION PILLS - Exact match to pmlacademy.vercel.app */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5 transition-all duration-300">
        <a
          href="https://zalo.me/0789780167"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[196px] h-11 px-3 rounded-xl bg-white/95 backdrop-blur-md text-blue-700 text-xs font-bold shadow-md shadow-slate-950/5 border border-blue-200/90 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:-translate-x-1 active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
          aria-label="Zalo 0789 780 167"
        >
          <div className="size-7 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
            <MessageCircle aria-hidden="true" size={15} />
          </div>
          <span className="truncate text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
            Zalo: <span className="text-blue-700 font-extrabold">0789 780 167</span>
          </span>
        </a>
        <a
          href="tel:0789780167"
          className="w-[196px] h-11 px-3 rounded-xl bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-md shadow-slate-950/5 border border-slate-200/90 hover:bg-slate-50 hover:border-amber-300 hover:shadow-lg hover:-translate-x-1 active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
          aria-label="Hotline 0789 780 167"
        >
          <div className="size-7 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-2xs">
            <Phone aria-hidden="true" size={15} />
          </div>
          <span className="truncate text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
            Hotline: <span className="text-slate-900 font-extrabold">0789 780 167</span>
          </span>
        </a>
        <button
          type="button"
          onClick={() => openRegister()}
          className="w-[196px] h-11 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-x-1 active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer group"
          aria-label="Nhận tư vấn lộ trình 1-1"
        >
          <div className="size-7 rounded-lg bg-white/20 text-white border border-white/25 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-blue-700 transition-colors shadow-2xs">
            <CalendarCheck aria-hidden="true" size={15} />
          </div>
          <span className="truncate text-xs font-bold flex-1 text-left">Tư vấn lộ trình 1-1</span>
          <span className="size-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
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

      {detailCourse && (
        <CourseDetailModal
          course={detailCourse}
          onClose={() => setDetailCourse(null)}
          onRegister={(courseTitle, note) => {
            openRegister(courseTitle, note)
          }}
        />
      )}

      {/* CAMPUS FACILITY PHOTO ALBUM LIGHTBOX MODAL */}
      {activeCampusTopicIndex !== null && (() => {
        const currentTopic = CAMPUS_PHOTOS[activeCampusTopicIndex]
        const currentPhoto = currentTopic.album[activeAlbumPhotoIndex] || currentTopic.album[0]
        const totalPhotos = currentTopic.album.length

        const handlePrevPhoto = () => {
          setActiveAlbumPhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos)
        }
        const handleNextPhoto = () => {
          setActiveAlbumPhotoIndex((prev) => (prev + 1) % totalPhotos)
        }

        return (
          <div
            className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/75 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveCampusTopicIndex(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setActiveCampusTopicIndex(null)
              if (e.key === 'ArrowLeft') handlePrevPhoto()
              if (e.key === 'ArrowRight') handleNextPhoto()
            }}
            role="presentation"
          >
            <div
              className="flex min-h-full items-center justify-center p-3 sm:p-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveCampusTopicIndex(null)
              }}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="campus-album-title"
                className="relative my-auto w-full max-w-4xl animate-[modal-scale-in_300ms_ease-out] overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-2xl"
              >
                {/* Modal Top Bar & Topic Switcher Tabs */}
                <div className="border-b border-slate-200 bg-[#0A192F] px-5 py-4 sm:px-7 sm:py-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                          <Camera aria-hidden="true" size={12} />
                          Album Cơ Sở Vật Chất 5 Sao
                        </span>
                        <span className="text-xs font-bold text-slate-300">
                          Ảnh {activeAlbumPhotoIndex + 1} / {totalPhotos}
                        </span>
                      </div>
                      <h2 id="campus-album-title" className="mt-1.5 text-xl sm:text-2xl font-black tracking-tight text-white">
                        {currentTopic.caption}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCampusTopicIndex(null)}
                      aria-label="Đóng album hình ảnh"
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Topic Tabs to switch between the 4 Campus Spaces inside the modal */}
                  <div
                    className="mt-4 flex gap-2 overflow-x-auto pb-1"
                    role="tablist"
                    aria-label="Chọn phân khu cơ sở vật chất"
                  >
                    {CAMPUS_PHOTOS.map((topic, idx) => {
                      const isSelected = idx === activeCampusTopicIndex
                      return (
                        <button
                          key={topic.topicKey}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => {
                            setActiveCampusTopicIndex(idx)
                            setActiveAlbumPhotoIndex(0)
                          }}
                          className={`h-10 shrink-0 rounded-xl px-3.5 text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-white/30'
                              : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          <span>{topic.caption}</span>
                          <span className="rounded-full bg-black/30 px-1.5 py-0.2 text-[10px] font-extrabold text-amber-300">
                            {topic.album.length}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Main Lightbox Photo Viewer + Thumbnail Strip + Details */}
                <div className="p-5 sm:p-7 space-y-5">
                  {/* Large Active Image Frame */}
                  <div className="relative h-68 sm:h-96 w-full overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
                    <Image
                      key={currentPhoto.id}
                      src={image(currentPhoto.id, 1200)}
                      alt={currentPhoto.title}
                      fill
                      sizes="(max-width: 896px) 100vw, 896px"
                      className="object-cover transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                    {/* Top-Left Area Location Badge */}
                    <span className="absolute top-3.5 left-3.5 rounded-lg bg-black/65 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-extrabold text-amber-300">
                      {currentPhoto.tag}
                    </span>

                    {/* Previous & Next Photo Controls */}
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      aria-label="Ảnh trước đó"
                      className="absolute left-3 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/20 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      aria-label="Ảnh tiếp theo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md border border-white/20 transition hover:bg-blue-600 hover:scale-105 cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Active Photo Title & Description Caption */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 text-white">
                      <h3 className="text-lg sm:text-xl font-extrabold text-white drop-shadow-xs">
                        {currentPhoto.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                        {currentPhoto.desc}
                      </p>
                    </div>
                  </div>

                  {/* 4-Photo Thumbnail Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {currentTopic.album.map((photo, pIdx) => {
                      const isCurrent = pIdx === activeAlbumPhotoIndex
                      return (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => setActiveAlbumPhotoIndex(pIdx)}
                          aria-label={`Xem ảnh ${pIdx + 1}: ${photo.title}`}
                          className={`group relative h-20 sm:h-24 overflow-hidden rounded-xl border text-left transition-all cursor-pointer ${
                            isCurrent
                              ? 'border-blue-600 ring-2 ring-blue-600/40 scale-[1.01]'
                              : 'border-slate-200 opacity-75 hover:opacity-100 hover:border-blue-300'
                          }`}
                        >
                          <Image
                            src={image(photo.id, 300)}
                            alt={photo.title}
                            fill
                            sizes="220px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <span className="absolute top-1.5 left-2 rounded bg-black/60 px-1.5 py-0.2 text-[10px] font-extrabold text-amber-300">
                            0{pIdx + 1}
                          </span>
                          <span className="absolute bottom-1.5 left-2 right-2 truncate text-[11px] font-bold text-white">
                            {photo.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Space Highlights & Direct Campus Visit CTA */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                          Tiêu chuẩn trang thiết bị tại {currentTopic.caption}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {currentTopic.description}
                        </p>
                        <ul className="mt-3 grid gap-1.5">
                          {currentTopic.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]">
                              <CheckCircle2 aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col gap-2.5 rounded-xl border border-blue-100 bg-white p-4 shadow-2xs">
                        <p className="text-xs sm:text-sm font-extrabold text-[#0A192F]">
                          Trải nghiệm thực tế không gian học tập 5 sao
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Đặt lịch tham quan trực tiếp cơ sở, kiểm tra trình độ 1-1 và nhận 01 buổi học thử miễn phí.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const spaceName = currentTopic.caption
                            setActiveCampusTopicIndex(null)
                            openRegister('', `Đăng ký tham quan cơ sở vật chất (${spaceName}) & học thử miễn phí`)
                          }}
                          className="mt-1 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 transition cursor-pointer"
                        >
                          <CalendarCheck aria-hidden="true" size={15} />
                          <span>Đặt lịch tham quan &amp; Học thử</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )
      })()}

      {detailTeacher && (
        <div
          className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDetailTeacher(null)
          }}
          role="presentation"
        >
          <div
            className="flex min-h-full items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setDetailTeacher(null)
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="teacher-modal-title"
              className="relative my-auto w-full max-w-2xl animate-[modal-scale-in_300ms_ease-out] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-2xl"
            >
              {/* Teacher Modal Header */}
              <div className="relative bg-gradient-to-br from-[#0A192F] via-[#13284c] to-[#1E3A8A] p-6 sm:p-8 text-white">
                <button
                  type="button"
                  onClick={() => setDetailTeacher(null)}
                  aria-label="Đóng hồ sơ giáo viên"
                  className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
                >
                  <X size={18} />
                </button>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-300/60 shadow-xl">
                    <Image
                      src={image(detailTeacher.image, 400)}
                      alt={detailTeacher.name}
                      fill
                      sizes="112px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pr-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-amber-400/20 border border-amber-300/40 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                        {detailTeacher.badge}
                      </span>
                      <span className="rounded-md bg-white/15 px-2.5 py-0.5 text-xs font-bold text-cyan-200">
                        {detailTeacher.nationality}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                        <Star aria-hidden="true" size={12} fill="currentColor" /> {detailTeacher.rating}/5.0 ({detailTeacher.teachingHours})
                      </span>
                    </div>
                    <h2 id="teacher-modal-title" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
                      {detailTeacher.name}
                    </h2>
                    <p className="mt-0.5 text-sm sm:text-base font-semibold text-blue-200">
                      {detailTeacher.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Teacher Modal Body */}
              <div className="p-6 sm:p-8 space-y-5">
                {/* Verified Credentials */}
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                  <ShieldCheck aria-hidden="true" size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                      Bằng cấp &amp; Chứng nhận Sư phạm Quốc tế
                    </p>
                    <p className="mt-0.5 text-sm sm:text-base font-extrabold text-[#0A192F]">
                      {detailTeacher.creds}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-600">{detailTeacher.experience}</p>
                  </div>
                </div>

                {/* Pedagogical Methodology */}
                <div>
                  <h3 className="flex items-center gap-2 text-base font-extrabold text-[#0A192F]">
                    <Target aria-hidden="true" size={18} className="text-blue-600" />
                    Phương pháp sư phạm chuyên sâu
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-700">
                    {detailTeacher.methodology}
                  </p>
                </div>

                {/* 3 Concrete Student Values */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <h3 className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-emerald-950">
                    <Sparkles aria-hidden="true" size={18} className="text-emerald-700" />
                    Giá trị thực tế học viên nhận được trong lớp của {detailTeacher.name}
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {detailTeacher.studentValues.map((val) => (
                      <li key={val} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-emerald-900">
                        <CheckCircle2 aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Teacher Quote */}
                <blockquote className="rounded-2xl border-l-4 border-blue-600 bg-slate-50 p-4 text-sm sm:text-base italic leading-relaxed text-slate-700">
                  &ldquo;{detailTeacher.quote}&rdquo;
                </blockquote>

                {/* Courses Taught & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200 pt-5">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Trực tiếp giảng dạy &amp; Cố vấn
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {detailTeacher.coursesTaught.map((c) => (
                        <span
                          key={c}
                          className="rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 text-xs font-bold text-blue-800"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDetailTeacher(null)}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Đóng
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const targetCourse = detailTeacher.coursesTaught[0]
                        const teacherName = detailTeacher.name
                        setDetailTeacher(null)
                        openRegister(targetCourse, `Đăng ký học thử & kiểm tra trình độ 1-1 cùng ${teacherName}`)
                      }}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition cursor-pointer"
                    >
                      <CalendarCheck aria-hidden="true" size={16} />
                      Đăng ký học thử cùng Thầy/Cô
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {policyType && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPolicyType(null)
          }}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
            className="relative my-auto w-full max-w-lg animate-[modal-scale-in_300ms_ease-out] rounded-[28px] border border-white/70 bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setPolicyType(null)}
              aria-label="Đóng thông tin chính sách"
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 cursor-pointer"
            >
              <X size={18} />
            </button>
            <h2 id="policy-modal-title" className="text-xl sm:text-2xl font-black text-[#0A192F] pr-10">
              {policyType === 'privacy'
                ? 'Chính sách bảo mật thông tin học viên'
                : 'Điều khoản & Cam kết chất lượng đào tạo'}
            </h2>
            <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-slate-600">
              {policyType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Mục đích thu thập:</strong> Bright English chỉ thu thập Họ tên, Số điện thoại và Email nhằm tư vấn lộ trình học tập, xếp lịch kiểm tra trình độ và gửi tài liệu học tập theo yêu cầu của phụ huynh/học viên.
                  </p>
                  <p>
                    <strong>2. Cam kết bảo mật:</strong> Thông tin cá nhân của học viên được bảo mật tuyệt đối trên hệ thống quản lý học vụ nội bộ, tuyệt đối không chia sẻ hoặc cung cấp cho bất kỳ bên thứ ba nào.
                  </p>
                  <p>
                    <strong>3. Quyền của phụ huynh &amp; học viên:</strong> Quý phụ huynh có thể yêu cầu cập nhật hoặc hủy nhận bản tin bất cứ lúc nào qua tổng đài/Zalo 0789 780 167 hoặc email pmluanvn@gmail.com.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Cam kết đầu ra bằng hợp đồng:</strong> Tất cả học viên theo học lộ trình Cambridge và IELTS đều được ký hợp đồng cam kết đầu ra. Học viên tham dự tối thiểu 85% số buổi học nhưng chưa đạt chuẩn cam kết được đào tạo lại miễn phí 100%.
                  </p>
                  <p>
                    <strong>2. Quy chuẩn lớp học:</strong> Sĩ số tối đa 8–12 học viên/lớp; 100% giáo viên nước ngoài có chứng chỉ giảng dạy quốc tế CELTA/TESOL/TEYL.
                  </p>
                  <p>
                    <strong>3. Học bù &amp; Bảo lưu:</strong> Học viên được sắp xếp học bù miễn phí tại các lớp tương đương trong tuần và hỗ trợ bảo lưu học phí tối đa lên tới 06 tháng.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPolicyType(null)}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white hover:bg-indigo-700 cursor-pointer"
              >
                Đã hiểu &amp; Đóng
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
