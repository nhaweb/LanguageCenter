'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  HelpCircle,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

type QuizModalProps = {
  onClose: () => void
  onOpenLead: (course: string, note: string) => void
}

type LearnerGroup = 'kids_primary' | 'teens_ielts' | 'adults_work'

type Question = {
  question: string
  subtext: string
  options: string[]
  correctIndex: number
  explanation: string
}

const LEARNER_GROUPS: {
  id: LearnerGroup
  title: string
  subtitle: string
  icon: typeof Sparkles
}[] = [
  {
    id: 'kids_primary',
    title: 'Mầm non & Tiểu học (4–11 tuổi)',
    subtitle: 'Phản xạ tự nhiên, phát âm chuẩn & chứng chỉ Cambridge Starters/Movers/Flyers',
    icon: Sparkles,
  },
  {
    id: 'teens_ielts',
    title: 'THCS, THPT & Luyện thi IELTS (12+ tuổi)',
    subtitle: 'Tư duy học thuật, ngữ pháp chuyên sâu & bứt phá IELTS 6.5 – 8.0+',
    icon: GraduationCap,
  },
  {
    id: 'adults_work',
    title: 'Sinh viên & Người đi làm',
    subtitle: 'Giao tiếp phản xạ, thuyết trình, viết email & tiếng Anh thương mại quốc tế',
    icon: Briefcase,
  },
]

const QUIZ_QUESTIONS: Question[] = [
  {
    question: 'Chọn câu diễn đạt đúng ngữ pháp nhất:',
    subtext: 'Thì hiện tại đơn diễn tả thói quen lặp lại hàng ngày.',
    options: [
      'She go to English class every Saturday.',
      'She goes to English class every Saturday.',
      'She going to English class every Saturday.',
    ],
    correctIndex: 1,
    explanation: 'Chủ ngữ "She" là ngôi thứ 3 số ít nên động từ ở thì Hiện tại đơn thêm "-es" thành "goes".',
  },
  {
    question: 'Từ "brilliant" có nghĩa gần nhất với phương án nào?',
    subtext: 'Từ vựng thông dụng trong giao tiếp và miêu tả ấn tượng.',
    options: [
      'Very clever or impressive (Rất xuất sắc, ấn tượng)',
      'A little bit tired (Hơi mệt mỏi)',
      'Extremely noisy (Cực kỳ ồn ào)',
    ],
    correctIndex: 0,
    explanation: '"Brilliant" dùng để khen ngợi một ý tưởng, con người hoặc thành quả xuất chúng, thông minh.',
  },
  {
    question: 'Điền từ thích hợp: “If I ___ more free time, I would practice speaking every day.”',
    subtext: 'Câu điều kiện loại 2 giả định điều chưa xảy ra ở hiện tại.',
    options: ['have', 'had', 'will have'],
    correctIndex: 1,
    explanation: 'Trong câu điều kiện loại 2, mệnh đề "If" lùi một thì về Quá khứ đơn ("had").',
  },
  {
    question: 'Khi muốn lịch sự đưa ra ý kiến trong buổi thảo luận, câu nào tự nhiên nhất?',
    subtext: 'Kỹ năng phản xạ giao tiếp & thảo luận học thuật (Speaking).',
    options: [
      'You are wrong, listen to me.',
      'From my perspective, we should consider another approach.',
      'I no agree with this idea.',
    ],
    correctIndex: 1,
    explanation: '"From my perspective..." là cụm từ học thuật và chuyên nghiệp giúp ghi điểm cao trong IELTS Speaking & môi trường công sở.',
  },
]

export function QuizModal({ onClose, onOpenLead }: QuizModalProps) {
  const [learnerGroup, setLearnerGroup] = useState<LearnerGroup | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const totalQuestions = QUIZ_QUESTIONS.length
  const q = QUIZ_QUESTIONS[currentStep]

  function handleNext() {
    if (selectedOption === null) return
    const isCorrect = selectedOption === q.correctIndex
    const nextScore = isCorrect ? score + 1 : score

    if (currentStep + 1 < totalQuestions) {
      setScore(nextScore)
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
    } else {
      setScore(nextScore)
      setShowResult(true)
    }
  }

  function handleRestart() {
    setLearnerGroup(null)
    setCurrentStep(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
  }

  const getRecommendation = () => {
    if (learnerGroup === 'kids_primary') {
      if (score >= 3) {
        return {
          level: 'Cambridge Movers / Flyers · Nền tảng Vững vàng',
          course: 'Tiểu học · Cambridge Champions (Starters/Movers/Flyers)',
          desc: 'Con đã có vốn từ và phản xạ ngữ pháp rất tốt! Lộ trình luyện chuẩn Cambridge 13–15 khiên cùng giáo viên quốc tế sẽ giúp con bứt phá toàn diện 4 kỹ năng.',
        }
      }
      return {
        level: 'Cambridge Starters / Foundation · Khởi động Tự tin',
        course: 'Tiểu học · Bright Stars (6–11 tuổi)',
        desc: 'Thời điểm vàng để con xây dựng phản xạ phát âm chuẩn bản xứ và niềm yêu thích tiếng Anh qua phương pháp học tương tác trực quan.',
      }
    }

    if (learnerGroup === 'adults_work') {
      if (score >= 3) {
        return {
          level: 'CEFR B2 · Giao tiếp & Thuyết trình Chuyên sâu',
          course: 'Giao tiếp người đi làm · Speak with Confidence',
          desc: 'Nền tảng tiếng Anh của bạn rất tốt! Bạn phù hợp với lớp nâng cao kỹ năng thuyết trình, đàm phán và viết email thương mại trong môi trường đa quốc gia.',
        }
      }
      return {
        level: 'CEFR A2–B1 · Phản xạ Giao tiếp Công sở',
        course: 'Giao tiếp người đi làm · Speak with Confidence',
        desc: 'Lộ trình cá nhân hóa tập trung gỡ bỏ rào cản tâm lý khi nói, chuẩn hóa phát âm và thực hành 100% các tình huống giao tiếp thực tế tại nơi làm việc.',
      }
    }

    // Default / teens_ielts
    if (score >= 3) {
      return {
        level: 'CEFR B2 · IELTS Target 7.0–8.0+',
        course: 'THPT & IELTS · IELTS Mastery 7.0+ (15+ tuổi)',
        desc: 'Nền tảng học thuật của bạn rất vững chắc! Bạn hoàn toàn đủ điều kiện bước vào lộ trình luyện đề chuyên sâu cùng cựu giám khảo để bứt phá band 7.0+.',
      }
    }
    return {
      level: 'CEFR B1 · IELTS Foundation & Breakthrough (5.0–6.5+)',
      course: 'THCS · IELTS Breakthrough (12–17 tuổi)',
      desc: 'Bạn đã nắm được các cấu trúc cơ bản. Khóa học IELTS Breakthrough sẽ giúp hệ thống hóa ngữ pháp học thuật, mở rộng từ vựng và làm chủ chiến thuật 4 kỹ năng.',
    }
  }

  const result = getRecommendation()

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
        className="relative my-auto w-full max-w-lg animate-[modal-scale-in_300ms_ease-out] rounded-[28px] border border-white/70 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng bài kiểm tra"
          className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
        >
          <X size={18} />
        </button>

        {!learnerGroup ? (
          <div>
            <div className="flex items-center gap-2.5 pr-10">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                <Zap size={20} />
              </span>
              <div>
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-700">
                  Bước 1 / 2 · Cá nhân hóa bài test
                </p>
                <h2 id="quiz-modal-title" className="text-xl sm:text-2xl font-black text-[#0A192F]">
                  Ai là người sẽ tham gia học?
                </h2>
              </div>
            </div>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Chọn đúng nhóm độ tuổi để hệ thống đề xuất lộ trình và khóa học phù hợp nhất sau bài kiểm tra.
            </p>

            <div className="mt-5 grid gap-3">
              {LEARNER_GROUPS.map((group) => {
                const Icon = group.icon
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setLearnerGroup(group.id)}
                    className="group flex w-full items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-indigo-500 hover:bg-indigo-50/40 hover:shadow-md cursor-pointer"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-extrabold text-[#0A192F] group-hover:text-indigo-900">
                        {group.title}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {group.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      className="mt-1 shrink-0 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-transform"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        ) : !showResult ? (
          <div>
            <div className="flex items-center gap-2.5 pr-10">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                <Zap size={20} />
              </span>
              <div>
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-700">
                  Quick Placement Test · 3 phút
                </p>
                <h2 id="quiz-modal-title" className="text-xl sm:text-2xl font-black text-[#0A192F]">
                  Câu hỏi {currentStep + 1} / {totalQuestions}
                </h2>
              </div>
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <div className="mt-4 rounded-xl bg-indigo-50/60 p-4 border border-indigo-100/60">
              <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F]">{q.question}</h3>
              <p className="mt-1 text-sm sm:text-base text-slate-600">{q.subtext}</p>
            </div>

            <div className="mt-4 grid gap-2.5" role="radiogroup" aria-label="Đáp án lựa chọn">
              {q.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                const isCorrectOption = idx === q.correctIndex
                const hasAnswered = selectedOption !== null
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedOption(idx)}
                    className={`flex min-h-12 w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? isCorrectOption
                          ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                          : 'border-amber-500 bg-amber-50/80 text-amber-950 shadow-sm ring-2 ring-amber-500/20'
                        : hasAnswered && isCorrectOption
                        ? 'border-emerald-300 bg-emerald-50/40 text-emerald-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                        isSelected
                          ? isCorrectOption
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-amber-600 bg-amber-600 text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Instant Explanation Box */}
            {selectedOption !== null && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-3.5 rounded-xl border p-3.5 text-xs sm:text-sm leading-relaxed ${
                  selectedOption === q.correctIndex
                    ? 'border-emerald-200 bg-emerald-50/80 text-emerald-950'
                    : 'border-amber-200 bg-amber-50/80 text-amber-950'
                }`}
              >
                <p className="font-extrabold">
                  {selectedOption === q.correctIndex ? 'Chính xác!' : 'Gợi ý kiến thức:'}
                </p>
                <p className="mt-0.5 text-slate-700">{q.explanation}</p>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setLearnerGroup(null)}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-indigo-600 cursor-pointer"
              >
                ← Đổi độ tuổi
              </button>
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleNext}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm sm:text-base font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                {currentStep + 1 === totalQuestions ? 'Xem kết quả' : 'Câu tiếp theo'}
                <ArrowRight size={16} className="ml-1.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center" role="status" aria-live="polite">
            <div className="relative mx-auto grid size-18 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-amber-500/25">
              <Award size={36} />
              <Sparkles aria-hidden="true" className="absolute -top-1 -right-1 text-amber-300" size={20} />
            </div>

            <p className="mt-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-700">
              Kết quả đánh giá nhanh
            </p>
            <h2 id="quiz-modal-title" className="mt-1 text-2xl sm:text-3xl font-black text-[#0A192F]">
              Bạn đúng {score} / {totalQuestions} câu!
            </h2>

            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4 text-left">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-900">
                  Khuyến nghị lộ trình cá nhân hóa
                </span>
              </div>
              <p className="mt-1.5 text-lg font-extrabold text-indigo-950">{result.level}</p>
              <p className="mt-0.5 text-xs sm:text-sm font-bold text-indigo-700">
                Khóa học đề xuất: {result.course}
              </p>
              <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-700">{result.desc}</p>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenLead(
                    result.course,
                    `Kết quả kiểm tra trình độ: ${score}/${totalQuestions} câu đúng (${result.level}). Cần tư vấn lộ trình chi tiết.`
                  )
                }}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 px-5 text-sm sm:text-base font-bold text-slate-950 shadow-md shadow-amber-800/15 transition cursor-pointer"
              >
                Nhận lộ trình &amp; đăng ký học thử miễn phí
                <ArrowRight size={16} className="ml-1.5" />
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <RotateCcw size={14} className="mr-1.5" />
                Làm lại bài kiểm tra
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
