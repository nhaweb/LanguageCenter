# Review UI/UX — Bright English (Học vui, tiến bộ thật)

- **Thời điểm audit:** 18/11/2026, khoảng 23:02–23:09 (giờ Asia/Saigon, UTC+7).
- **URL:** https://mulch-molecular-pulp.ngrok-free.dev/
- **Lưu ý:** Toàn bộ source nằm trên máy local của bạn (Next.js dev, chỉ expose qua ngrok). Mọi sửa làm trực tiếp trên source local, rồi hard-refresh / cửa sổ ẩn danh.
- **Phương pháp:** Playwright Chromium (`channel="chrome"`), header `ngrok-skip-browser-warning: 1`, context mới ở 390 / 768 / 1024 / 1440. LCP đo bằng `PerformanceObserver` khi chưa cuộn. Emulate `prefers-reduced-motion`. Contrast computed (canvas sRGB) và đối chiếu screenshot khi chữ nằm trên ảnh. Đo touch 44px, `:focus-visible`, overflow ngang, ảnh hỏng, control có chạy thật không, sample animation/transform khi cuộn. Không gửi form hợp lệ (chỉ thử newsletter rỗng / email `abc`).
- **Stack quan sát được:** Next.js (`x-powered-by: Next.js`, 17 JS chunk Turbopack), React, font **Plus Jakarta Sans** (tiêu đề) + **Work Sans** (nội dung), ảnh Unsplash, `scroll-behavior: smooth`. Không thấy Lenis / GSAP / framer-motion / AstrYX trong HTML.
- **JS chunks:** 17 file `/_next/` đều HTTP **200**. Trang **không trắng**, không phải lỗi `allowedDevOrigins`.

Tài liệu skill đã đọc (chỉ khẳng định những gì có trong file gốc):

- Repo: [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- Skill: [`.claude/skills/ui-ux-pro-max/SKILL.md`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/HEAD/.claude/skills/ui-ux-pro-max/SKILL.md)
- Cài cho Antigravity (README): `uipro init --ai antigravity` (CLI `ui-ux-pro-max-cli`, lệnh `uipro`)
- Search: `python …/scripts/search.py "<query>" --design-system -p "Project"`; `--domain style|color|typography|ux|landing|product|gsap|icons`; `--stack nextjs`; dial `--variance` `--motion` `--density`
- Dữ liệu CSV chính thức đã đọc: `typography.csv` (74 cặp), `colors.csv`, `products.csv` (192 loại), `styles.csv`

---

## 🌟 Điểm Tốt

- **Hero và thang chữ đã có “điểm nhấn” đúng kiểu landing hiện đại.** H1 “Bứt phá tiếng Anh, chinh phục tương lai toàn cầu.” đo **64px / weight 800 / cao 209px** @1440 (42px / cao 183px @390). Chữ “tương lai” có gradient tím–indigo. H2 các section 36–42px. Logo, thanh ưu đãi, 2 CTA (cam / outline), social proof 4.9/5 và 15.000+ gia đình, plus cụm 3 ảnh hero tạo cảm giác vui và giàu hình. Focus ring đo được `rgb(79, 70, 229) solid 2px` (`#4F46E5`, trùng primary trong palette *Language Learning App* / *Educational App* của skill).
- **Nền tảng kỹ thuật và nhiều block hình đã ổn.** Vào trang là thấy nội dung (H1 `opacity: 1`). LCP: ảnh hero 1644ms @1440; ở 1024/768/390 LCP là chính H1 (1432 / 1408 / 1360ms). Không cuộn ngang cả 4 viewport, không ảnh vỡ. CTA chính trên header/hero/mobile dock cao **44px**. Mobile có thanh “Gọi hotline / Đăng ký tư vấn” dưới đáy. Khối khóa học có ảnh, badge, giá VND, sĩ số 8–12; why dùng layout dạng bento; campus là lưới 4 ảnh; testimonial có avatar và band IELTS.

---

## ⚠️ Lỗi UX/UI & Điểm Cần Cải Tiến

### Hình ảnh & thẩm mỹ

- **High. Hai thẻ social proof trên ảnh hero thiếu số liệu — span “0%” và “0+” vẫn `opacity: 0` sau 5 giây và sau khi cuộn hết trang.** Trên screenshot, card “đạt mục tiêu / Tiến bộ thấy rõ mỗi ngày” và “Học viên tỏa sáng” không hiện con số. Trong DOM vẫn còn chữ “0% đạt mục tiêu” / “0+ Học viên tỏa sáng”. Nhìn như số đếm chưa chạy, và đúng lúc đáng khoe thành tích thì lại trống.
- **Medium. Hình nhiều nhưng bị lặp, và vài khối then chốt còn “trắng hình”.** Đếm trong từng section @1440: home 7 ảnh, offers 2, **who 0**, courses 6, why 4, stories 3 (avatar), **start 0**, campus 4, **contact 0**. Tổng 26 `<img>`, 0 `loading="lazy"`, **12 ảnh thiếu alt** (avatar và một số thumb). Cùng vài ảnh Unsplash (bé nhuộm màu, lớp học, thư viện, lễ tốt nghiệp) được dùng lại ở hero, card khóa và campus. Ảnh tốt nghiệp gắn nhãn “Lớp học truyền cảm hứng” là lệch nội dung. Mục “100% giáo viên quốc tế” chỉ có 2 avatar nhỏ, không có tên / chứng chỉ / chân dung thật — yếu hơn hẳn [Englora](https://englora.framer.website/) (Meet Our Teachers) và [Jave English](https://jave-english.framer.website/) (profile giáo viên ngay hero).
- **Medium. Caption trắng trên ảnh campus có chỗ nằm trên vùng sáng.** Computed contrast của các caption (“Cùng nhau tiến bộ”, …) ra ~1.1:1 vì script lấy nền trang; kiểm tra screenshot thì “Học vui mỗi ngày” đặt trên vùng tối hơn của ảnh nên vẫn đọc được, nhưng “Cùng nhau tiến bộ” nằm trên cảnh trong nhà khá sáng, chưa có lớp phủ (scrim) rõ. Nên thêm gradient tối dưới ảnh, không dựa vào may rủi của stock photo.
- **Low.** Trên 390px, cụm “tương lai” bị tách dòng thành “tương” / “lai” (`be-390-hero.png`). Footer heading chỉ 12px. Copyright ghi **© 2025** trong khi audit là 11/2026. Nhiều eyebrow tiếng Anh (“WHO IT IS FOR”, “YOUR NEXT CHAPTER…”) trộn với body tiếng Việt, chưa nhất quán.

### Tương tác & animation

- **High. Các điểm tương tác mang tính “học vui” gần như chưa chạy.**
  - Nút **“Mở menu”** mobile đã đúng 44×44, `aria-label="Mở menu"`, nhưng sau khi bấm `aria-expanded` vẫn `false`, không có `dialog`/`menu`, screenshot `be-390-menu.png` giống hệt lúc chưa bấm.
  - **“Bắt đầu bài test” / “Test miễn phí”** không mở quiz: không có dialog, URL nhảy về `#courses`. Trang có heading “Tiếng Anh của bạn đang ở level nào?” nhưng không có câu hỏi nào xuất hiện.
  - **“Đăng ký học thử”, “Đăng ký tư vấn miễn phí”, “Nhận tư vấn”, “Đăng ký giữ ưu đãi”** là `<button>` không `href`; bấm không mở form. Toàn trang chỉ có **1 form / 1 input**: newsletter email. Bước 3 lại viết “Gửi form, tư vấn viên sẽ liên hệ trong 15 phút.”
  - Tab độ tuổi (“Chọn một nhóm để lọc đúng khóa học”) và filter “Mầm non / Tiểu học / …” **không đổi danh sách khóa** (text trước/sau giống nhau).
- **High. Header khai báo `position: sticky` nhưng không ghim khi cuộn.** Trước cuộn `y=43`; sau `scrollTo(500)` header `y=-457` (đã trượt khỏi viewport). Screenshot `be-1440-nav-scrolled.png` không còn logo/menu/CTA. `scroll-padding-top` đang là `auto` — khi bấm anchor, tiêu đề section dễ bị che nếu sticky được sửa.
- **Medium. Motion còn mỏng so với mục tiêu “linh động”, và chưa tôn trọng reduced-motion.** Khi cuộn 8 bước suốt 6533px @1440, không bắt được `transform` khác identity. Có **13 animation CSS `list-enter` chạy liên tục từ đầu đến cuối trang**, kể cả khi `prefers-reduced-motion: reduce` (`running: 13`, H1 vẫn hiện). Hover card khóa chỉ đổi `box-shadow` 200ms, chưa nhấc card. Không có carousel, không có quiz/game, không quan sát được số đếm.
- **Low.** Newsletter đã có label và cao 44px, nhưng lỗi native tiếng Anh (“Please fill out this field.” / “Please include an '@'…”).

### UI/UX chung

- **Medium. 12/53 vùng bấm @1440 (10/47 @390) thấp hơn 44px.** Menu chính và CTA hero đã đạt 44px. Phần trượt: link top bar cao 20px, logo 40px, link “Ưu đãi” 40.5×44, cụm link footer “Khám phá” cao **16px**, tel/email footer 20px.
- **Medium. SEO / chia sẻ còn thiếu khi lên production.** Có title, description, `lang="vi"`. Không `og:*`, không `canonical`, JSON-LD = 0. `x-robots-tag: noindex` là bình thường trên ngrok/dev.
- **Low.** Console chỉ có WebSocket HMR 503 qua ngrok (lỗi dev, không tính là lỗi sản phẩm).

### Còn thiếu (so với mong muốn “linh động, nhiều hình, tương tác” và template đã mở)

Đã mở thật 3 site (200). Chỉ mô tả những gì nhìn thấy:

| Nhu cầu | Bright English | Template đã mở |
|---|---|---|
| Hình lớn, cảm xúc | Hero 3 ảnh + card khóa + campus, nhưng lặp stock | [Kidedu](https://kidedu.framer.website/): 38 ảnh, hero trẻ em full-bleed, nền vàng chanh, 47px H1; [Jave](https://jave-english.framer.website/): 87 ảnh, hero collage + profile giáo viên, H1 46px |
| Placement test / học thử | Có CTA, **chưa có bài test / form** | Englora: “Book a Free Level Check”; Jave: Contact + Courses + Schedule trên nav |
| Giáo viên | 2 avatar, không hồ sơ | Englora “Meet Our Teachers”; Jave có “Hi, I’m Jave Carter” + chứng chỉ CELTA trên hero |
| Lịch học | Không thấy | Jave có mục **Schedule** trên menu |
| FAQ | Không có | Kidedu “Everything parents need to know”; Englora có FAQ + “Ready for Your Free Level Check?” |
| Tương tác/game hóa cho trẻ | Badge/sao, chưa có quiz hay tiến trình | Kidedu nhấn “Learning made fun” + lớp theo độ tuổi có mô tả hoạt động (Colors & Shapes, Songs…) |
| Bản đồ / Zalo / CEFR | Không có | — (các template online ít cần map; trung tâm 2 cơ sở VN thì nên có) |

URL đã mở:

1. https://kidedu.framer.website/ — preschool vui, xanh lá / vàng nhạt, CTA “Enroll Now”, lớp Toddler/Nursery, giáo viên, testimonial phụ huynh, FAQ.
2. https://englora.framer.website/ — English center: Kids / General / IELTS, teachers, how it works, pricing, FAQ, level check.
3. https://jave-english.framer.website/ — landing giáo viên, khóa Kids + IELTS + Work, nav có Schedule/Blog/Contact, nhiều ảnh và sticker trang trí.

---

## 🛠️ Code Sửa Tối Ưu

**1. Ghim header + menu mobile thật + `scroll-padding`.** Kiểm tra phần tử cha không bị `overflow: hidden` phá sticky. Đưa `<header>` ra ngoài wrapper bị overflow.

```tsx
"use client"
import { useEffect, useState } from "react"

const LINKS = [
  ["#offers", "Ưu đãi"],
  ["#courses", "Khóa học"],
  ["#who", "Đối tượng"],
  ["#why", "Về Bright"],
  ["#stories", "Học viên"],
  ["#start", "Bắt đầu"],
] as const

export function SiteHeader({ onOpenLead, onOpenTest }: { onOpenLead: () => void; onOpenTest: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 16)
    f()
    window.addEventListener("scroll", f, { passive: true })
    return () => window.removeEventListener("scroll", f)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur ${scrolled ? "shadow-md" : "border-slate-200/70"}`}>
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-3 px-4">
        <a href="#home" className="flex min-h-11 items-center font-extrabold">Bright English</a>
        <nav className="ml-auto hidden items-center lg:flex">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="inline-flex h-11 items-center px-3 text-sm font-medium">{label}</a>
          ))}
        </nav>
        <button type="button" onClick={onOpenTest} className="hidden h-11 rounded-full bg-amber-500 px-4 font-semibold text-white lg:inline-flex lg:items-center">Test miễn phí</button>
        <button type="button" className="ml-auto inline-flex size-11 items-center justify-center rounded-xl border lg:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} onClick={() => setOpen(v => !v)}>☰</button>
      </div>
      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 top-[72px] z-50 bg-white px-5 py-4 lg:hidden">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b font-medium">{label}</a>
          ))}
          <button type="button" onClick={() => { setOpen(false); onOpenLead() }} className="mt-4 h-11 w-full rounded-full bg-amber-500 font-semibold text-white">Đăng ký tư vấn</button>
        </div>
      )}
    </header>
  )
}
```

```css
:root { --header-offset: 72px; }
html { scroll-padding-top: var(--header-offset); scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .list-enter, [class*="list-enter"] { animation: none !important; }
}
```

**2. Số liệu phải hiện từ lúc render; chỉ animate sau khi mount.**

```tsx
"use client"
import { useEffect, useState } from "react"

export function Stat({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const [reduce, setReduce] = useState(true)
  const [n, setN] = useState(to) // SSR + reduced-motion: hiện số thật, không phải 0
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return
    setReduce(false)
    setN(0)
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900)
      setN(Math.round(to * p))
      if (p < 1) requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [to])
  return (
    <div className="rounded-2xl bg-white p-3 shadow">
      <p className="text-2xl font-extrabold tabular-nums">{n.toLocaleString("vi-VN")}{suffix}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )
}
// <Stat to={98} suffix="%" label="đạt mục tiêu" />
// <Stat to={15000} suffix="+" label="Học viên tỏa sáng" />
```

**3. Filter khóa học chạy thật; tab độ tuổi cuộn tới `#courses` và lọc.**

```tsx
"use client"
import { useMemo, useState } from "react"

type Cat = "all" | "kids" | "primary" | "ielts" | "work"
const COURSES = [
  { id: "explorers", cat: "kids" as Cat, title: "English Explorers", age: "Mầm non · 4–6 tuổi" },
  { id: "stars", cat: "primary" as Cat, title: "Bright Stars", age: "Tiểu học · 6–11 tuổi" },
  { id: "break", cat: "ielts" as Cat, title: "IELTS Breakthrough", age: "IELTS Foundation · 12–17 tuổi" },
  { id: "mastery", cat: "ielts" as Cat, title: "IELTS Mastery 7.0+", age: "IELTS Advanced · 15+ tuổi" },
  { id: "speak", cat: "work" as Cat, title: "Speak with Confidence", age: "Giao tiếp · Người đi làm" },
  { id: "cambridge", cat: "primary" as Cat, title: "Cambridge Champions", age: "Starters · Movers · Flyers" },
]

export function CourseFilter({ initial = "all" }: { initial?: Cat }) {
  const [cat, setCat] = useState<Cat>(initial)
  const items = useMemo(() => cat === "all" ? COURSES : COURSES.filter(c => c.cat === cat), [cat])
  const tabs: [Cat, string][] = [["all","Tất cả"],["kids","Mầm non"],["primary","Tiểu học"],["ielts","THCS & IELTS"],["work","Người đi làm"]]
  return (
    <section id="courses">
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={cat===id}
            className={`h-11 rounded-full px-4 text-sm font-semibold ${cat===id ? "bg-slate-900 text-white" : "bg-white text-slate-800"}`}
            onClick={() => setCat(id)}>{label}</button>
        ))}
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => <li key={c.id}>{/* card hiện tại */}{c.title}</li>)}
      </ul>
    </section>
  )
}
```

**4. Dialog học thử / tư vấn (P0) — đừng để nút chết.** Mọi CTA “Đăng ký học thử / tư vấn / giữ ưu đãi” mở cùng form. Validate tiếng Việt, không `preventDefault` rồi im lặng.

```tsx
"use client"
export function LeadDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name")||"").trim()
    const phone = String(fd.get("phone")||"").replace(/\s/g,"")
    const errs: string[] = []
    if (name.length < 2) errs.push("Vui lòng nhập họ và tên.")
    if (!/^0\d{9}$/.test(phone) && !/^\+?84\d{9}$/.test(phone)) errs.push("Số điện thoại chưa hợp lệ.")
    if (errs.length) { /* hiện role="alert" cạnh field */ return }
    // TODO: API local + trạng thái thành công trong dialog
  }
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="lead-title" className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4">
      <form onSubmit={onSubmit} noValidate className="max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl bg-white p-6">
        <h2 id="lead-title" className="text-xl font-extrabold">Đăng ký học thử & tư vấn lộ trình</h2>
        <label className="mt-4 block text-sm font-medium" htmlFor="lead-name">Họ và tên *</label>
        <input id="lead-name" name="name" required className="mt-1 h-11 w-full rounded-xl border px-3" />
        <label className="mt-4 block text-sm font-medium" htmlFor="lead-phone">Số điện thoại *</label>
        <input id="lead-phone" name="phone" type="tel" required inputMode="tel" className="mt-1 h-11 w-full rounded-xl border px-3" />
        <button type="submit" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-amber-500 font-semibold">Gửi đăng ký</button>
      </form>
    </div>
  )
}
```

**5. Mini test 3 phút thật (3 câu, kết quả band/lộ trình, CTA mở form).** Mỗi đáp án `min-h-11`, một cột; `prefers-reduced-motion` thì bỏ confetti.

**6. Vá nhanh khác**

- Ảnh dưới fold: `loading="lazy"`; chỉ preload 1 ảnh LCP. Alt cho 12 avatar (`alt="Học viên Bright English"` hoặc tên). Campus: scrim `bg-gradient-to-t from-black/60 to-transparent`, caption trên lớp đó. Đổi ảnh tốt nghiệp hoặc đổi nhãn cho khớp.
- Card khóa: `transition-transform duration-200 hover:-translate-y-1`.
- Newsletter: `setCustomValidity` tiếng Việt, hoặc validate trong `onSubmit`.
- Footer link `inline-flex min-h-11 items-center`. `© 2026`.
- `main` thêm `pb-24` trên mobile để dock không đè card cuối.
- Meta `openGraph` + JSON-LD `EducationalOrganization` khi có domain/ảnh OG thật.
- Zalo + `tel:` FAB, 44×44, không đè dock.

---

## Prompt cho ui-ux-pro-max

Skill cài trong Antigravity bằng `uipro init --ai antigravity` ([README](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)). Agent cần gọi `search.py` **bằng đường dẫn đầy đủ trong thư mục skill**, không giả định cwd. Query 2–5 từ khóa, một ý định. Nếu search 0 kết quả: thu hẹp rồi mới fallback, và nói rõ là fallback.

Dưới đây là gợi ý lấy **trực tiếp từ CSV chính thức** đã đọc (dùng khi bạn muốn định hướng trước; vẫn để `--design-system` quyết định nếu ra kết quả khác):

| Nguồn CSV | Gợi ý cho Bright English |
|---|---|
| `products.csv` — Language Learning App | Style: **Claymorphism + Vibrant & Block-based**; secondary: Micro-interactions; “Playful colors + Progress indicators”; chú ý lesson structure, progress, gamification, badges |
| `products.csv` — Online Course/E-learning / Educational App | Claymorphism + Vibrant; “Course catalog, quizzes, certificates, gamification”; “Age-appropriate design” |
| `products.csv` — Childcare/Daycare | “Playful pastels + Safe colors + Warm accents”; “Cheerful imagery” |
| `colors.csv` — Language Learning App | Primary `#4F46E5`, On-primary `#FFFFFF`, Secondary `#818CF8`, Accent `#16A34A`, Background `#EEF2FF`, Foreground `#312E81`, Card `#FFFFFF`, Muted fg `#475569`, Border `#C7D2FE` |
| `colors.csv` — Educational App | Cùng indigo, accent cam `#EA580C` (gần nút cam hiện tại), nền `#EEF2FF` |
| `typography.csv` — Playful Creative | **Fredoka + Nunito** — “Children's apps, educational, gaming” |
| `typography.csv` — Kids/Education | **Baloo 2 + Comic Neue** |
| `typography.csv` — Vietnamese Friendly | **Be Vietnam Pro + Noto Sans** (nên dùng cho body tiếng Việt) |
| `styles.csv` — Claymorphism | radius 16–24px, viền 3–4px, double shadow, pastel, soft bounce; Best for educational/children’s apps |
| `styles.csv` — Vibrant & Block-based | gap ≥ 48px, type ≥ 32px (trang đã đạt), 4–6 màu, hover đổi màu, scroll-snap; typo 7:1+ |

Trang hiện dùng Plus Jakarta Sans + Work Sans (gần nhóm Friendly SaaS) và focus `#4F46E5` — đã gần palette Language Learning App, nhưng chưa “clay / vui” đúng mức trẻ em.

### P0 — dán lần lượt trong Antigravity (code local, Next.js)

**Prompt 0 — tạo design system rồi mới sửa UI**

```
Hãy dùng skill ui-ux-pro-max cho project Bright English (trung tâm tiếng Anh “Học vui, tiến bộ thật”, đối tượng mầm non đến người đi làm, Next.js trên máy local).

Bước 1, chạy đúng kiểu skill (đổi path cho đúng máy):
python3 <skill>/scripts/search.py "language learning English center kids playful vibrant" --design-system -p "Bright English" --variance 7 --motion 8 --density 4

Bước 2, search bổ sung:
python3 <skill>/scripts/search.py "playful educational vietnamese" --domain typography
python3 <skill>/scripts/search.py "language learning" --domain color
python3 <skill>/scripts/search.py "claymorphism" --domain style
python3 <skill>/scripts/search.py "hero social-proof" --domain landing
python3 <skill>/scripts/search.py "scroll reveal stagger" --domain gsap
python3 <skill>/scripts/search.py "error summary validation" --domain ux
python3 <skill>/scripts/search.py "touch target focus" --domain ux
python3 <skill>/scripts/search.py "suspense streaming bundle" --stack nextjs

Bước 3, áp dụng token (màu, typography, spacing, motion) vào source local. Tôn trọng prefers-reduced-motion. Không bịa palette nếu search rỗng.
```

**Prompt 1 — sửa tương tác chết (ưu tiên cao nhất)**

```
Dùng ui-ux-pro-max (--domain ux: touch 44px, visible labels, error gần field, keyboard, reduced-motion). Trên landing Bright English, code local Next.js:

1) Nút hamburger aria-label "Mở menu" (đã 44×44) phải mở dialog/menu, aria-expanded đổi, khóa scroll body, có thể đóng.
2) Header phải sticky thật (không bị overflow cha làm hỏng) + bóng khi cuộn; html scroll-padding-top bằng chiều cao header.
3) Mọi CTA "Đăng ký học thử / tư vấn / giữ ưu đãi / nhận tư vấn" mở một dialog form (họ tên, SĐT, email, mục tiêu, cơ sở HCM/HN). Validate tiếng Việt, trạng thái lỗi/thành công rõ. Hiện form đúng lời hứa “liên hệ trong 15 phút”.
4) "Bắt đầu bài test / Test miễn phí" mở mini quiz 3 câu (ngữ pháp/từ vựng vui, 1 cột, đáp án ≥ 44px), hiện lộ trình gợi ý + CTA mở form. Đừng chỉ nhảy #courses.
5) Tab độ tuổi và filter khóa (Tất cả / Mầm non / Tiểu học / THCS & IELTS / Người đi làm) phải lọc danh sách thật, có trạng thái selected.
6) Số liệu hero không được để 0% / 0+ hoặc opacity:0. SSR ra số thật (ví dụ 98% / 15.000+), chỉ count-up sau khi mount nếu không reduced-motion.
```

**Prompt 2 — làm trang “linh động, nhiều hình, thu hút” theo style skill**

```
Tiếp tục với design system vừa generate. Style ưu tiên Claymorphism + Vibrant & Block-based + Micro-interactions (products.csv: Language Learning App / Educational App).

Hình ảnh:
- Bớt trùng Unsplash; khối "Chọn chương trình theo độ tuổi" và "Ba bước để bắt đầu" cần minh họa hoặc ảnh riêng theo độ tuổi.
- Section giáo viên: 3+ hồ sơ (ảnh chân dung 1 người, tên, CELTA/TESOL, 1 câu chuyện), không chỉ 2 avatar.
- Campus: scrim tối dưới ảnh, caption đặt trên scrim; đừng gắn nhãn "Lớp học" lên ảnh lễ tốt nghiệp.
- 12 ảnh thiếu alt; ảnh dưới fold loading="lazy"; chỉ preload ảnh LCP.

Motion (sau khi search --domain gsap "scroll reveal stagger", --motion 8):
- Reveal section (transform+opacity, once).
- Hover card khóa: -translate-y-1 + bóng, 150–200ms.
- (Tuỳ chọn) marquee logo / carousel testimonial.
- Tắt animation khi prefers-reduced-motion — hiện đang còn 13 animation list-enter chạy trong chế độ giảm chuyển động.

Chữ:
- Giữ H1 display (đã 64px desktop / 42px mobile) nhưng tránh tách "tương / lai" trên 390px (balance / nowrap hợp lý).
- Cân nhắc typography "Playful Creative" (Fredoka + Nunito) cho heading vui, "Vietnamese Friendly" (Be Vietnam Pro + Noto Sans) cho body tiếng Việt — chỉ đổi sau khi search --domain typography xác nhận.
```

### P1

**Prompt 3 — hoàn thiện UX phụ huynh / học viên**

```
Dùng ui-ux-pro-max (--domain landing, ux, --stack nextjs):
- Thêm FAQ (học phí, lịch, cam kết, học thử) kiểu accordion, hàng min-h-12, không chồng chữ khi wrap.
- Form newsletter: thông báo lỗi tiếng Việt, không chỉ browser default tiếng Anh.
- Footer / tel / email: min-h-11; mailto hoạt động.
- Nút nổi Zalo + gọi, 44×44, không đè dock mobile (main pb-24).
- 2 cơ sở: địa chỉ hiện có + link bản đồ / “Chỉ đường”.
- Lịch ca học (sáng / chiều / tối / cuối tuần) — Jave English có mục Schedule, mình đang thiếu.
- Meta Open Graph + JSON-LD EducationalOrganization khi có ảnh OG thật.
- Đổi © 2025 thành năm hiện tại.
```

### P2

**Prompt 4 — gamification vừa phải cho trẻ / teen**

```
Theo Key Considerations của Language Learning App (gamification, achievement badges, progress tracking) và Childcare/Daycare (cheerful imagery, age-appropriate):
- Lộ trình CEFR A1–C2 hoặc Cambridge Starters–Flyers dạng stepping stones bấm được, nối với filter khóa.
- Sau bài test: badge / “level l unlocked”, confetti tắt khi reduced-motion.
- (Tuỳ chọn) carousel hoạt động lớp học, sticker/illustration SVG (skill khuyến cáo SVG, không dùng emoji thay icon).
- Không thêm animation width/height; chỉ transform và opacity; kiểm tra Pre-Delivery trong references/pro-rules.md nếu skill local có file này.
```

Gợi ý thứ tự dán: Prompt 0 → 1 → 2 → 3 → 4. Mỗi lần xong, hard-refresh để review lại.

---

## Phụ lục đo lường (18/11/2026, ~23:02, Asia/Saigon)

| Viewport | LCP | H1 | docH | h-scroll | opacity:0 layout | Touch &lt; 44px |
|---|---|---|---|---|---|---|
| 1440×900 | IMG 1644ms, 282×500 | 64px / 209px | 6533 | 0 | 2 (span “0%”, “0+”) | 12/53 |
| 1024×768 | H1 1432ms | 64px | 6804 | 0 | 2 | 12/50 |
| 768×1024 | H1 1408ms | 60px | 8508 | 0 | 2 | 10/45 |
| 390×844 | H1 1360ms | 42px / 183px | 12798 | 0 | 1 | 10/47 |

- LCP ảnh @1440: `photo-1503454537195-1dcabb73ffb9` (alt “Học viên vui vẻ khám phá tiếng Anh”)
- JS 17 × HTTP 200; ảnh vỡ 0; lazy 0; thiếu alt 12
- Reduced-motion: H1 opacity 1; `list-enter` vẫn running = 13
- Focus-visible: có, indigo 2px / offset 2px
- Header sticky: không giữ khi cuộn (`y` 43 → -457)
- Form tư vấn: không mở được; newsletter label + 44px, lỗi tiếng Anh

Ảnh chính: `be-1440-hero.png`, `be-390-hero.png`, `be-1440-sec-courses.png`, `be-1440-sec-who.png`, `be-1440-sec-campus.png`. Đối chiếu: `comp-kidedu-hero.png`, `comp-englora-hero.png`, `comp-jave-hero.png`.
