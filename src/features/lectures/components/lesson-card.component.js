// src/features/lectures/components/lesson-card.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderCard } from "../../../shared/components/Card/card.component.js";
import { renderBadge } from "../../../shared/components/Badge/badge.component.js";
import { extractYouTubeId, isValidSafeUrl } from "../../../shared/validators/url.validator.js";

/**
 * Returns HTML string for the Student Lesson Card (Student Lesson Library).
 * Follows the calm, professional educational LMS UX specifications.
 * @param {object} params
 * @param {object} params.lesson
 * @param {boolean} params.isWatched
 * @returns {string}
 */
export function renderStudentLessonCard({ lesson, isWatched = false }) {
  const safeId = escapeHtml(lesson.id || "");
  const safeTitle = escapeHtml(lesson.title || lesson.name || "محاضرة بدون عنوان");
  const rawDesc = (lesson.description || "").trim();
  const safeDesc = rawDesc ? escapeHtml(rawDesc) : "شرح تفصيلي للمفاهيم الأساسية والأمثلة التطبيقية المصاحبة للمحاضرة.";
  const rawDate = lesson.sessionDate || (lesson.createdAt ? formatDate(lesson.createdAt) : "");
  const safeDate = rawDate ? escapeHtml(rawDate) : "—";
  const category = escapeHtml(lesson.category || (lesson.group && lesson.group !== "ALL" ? lesson.group : "المحتوى الأكاديمي"));

  let rawDuration = "";
  if (lesson.duration) {
    rawDuration = typeof lesson.duration === "number" ? `${lesson.duration} دقيقة` : String(lesson.duration);
  }
  const duration = rawDuration ? escapeHtml(rawDuration) : "—";

  const orderNum = lesson.order ? (lesson.order < 10 ? `0${lesson.order}` : `${lesson.order}`) : "01";
  const numBadge = escapeHtml(lesson.lectureNumberBadge || `المحاضرة ${orderNum}`);
  const isLive = Boolean(lesson.isLive || (lesson.statusType === "live"));
  const statusBadge = escapeHtml(lesson.statusBadge || (isLive ? "جلسة حية" : (lesson.statusType === "4k" ? "تسجيل بدقة 4K" : "متاحة للمشاهدة")));
  const statusType = lesson.statusType || (isLive ? "live" : "available");

  const ytId = extractYouTubeId(lesson.videoUrl || lesson.videoId || "");
  const fallbackThumb = window.location.pathname.includes("/pages/")
    ? "../assets/images/logo_union.jpeg"
    : "assets/images/logo_union.jpeg";
  const thumbUrl = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : (lesson.thumbnailUrl || lesson.thumbnail || fallbackThumb);

  // Resources formatting: purely from real lesson attachments
  const resourcesLabel = escapeHtml(lesson.resourcesLabel || (isLive ? "المواد التحضيرية المسبقة:" : "المواد الملحقة بالدرس:"));
  let resources = Array.isArray(lesson.resources) && lesson.resources.length > 0
    ? lesson.resources
    : (lesson.fileUrl ? [{ title: lesson.fileName || "ملف الدرس المرفق", type: "file", url: lesson.fileUrl, color: "cyan" }] : []);

  const resourceChipsHtml = resources.map((r) => {
    let icon = "📄";
    let colorClass = "chip-cyan";
    const t = (r.title || "").toLowerCase();
    if (r.color === "red" || t.includes("سلايد") || t.includes("pdf")) {
      icon = "📑";
      colorClass = "chip-red";
    } else if (r.color === "cyan" || t.includes("كود") || r.type === "code") {
      icon = "</>";
      colorClass = "chip-cyan";
    } else if (r.color === "green" || r.color === "emerald" || t.includes("واجب") || t.includes("تمرين")) {
      icon = "✓";
      colorClass = "chip-green";
    } else if (r.color === "amber" || t.includes("jupyter") || r.type === "jupyter") {
      icon = "📓";
      colorClass = "chip-amber";
    } else if (r.color === "slate" || t.includes("تذكير") || r.type === "reminder") {
      icon = "🔔";
      colorClass = "chip-slate";
    }

    const href = r.url && isValidSafeUrl(r.url) ? escapeHtml(r.url) : "javascript:void(0)";
    return `
      <a href="${href}" ${href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""} class="lesson-material-chip ${colorClass}" title="${escapeHtml(r.title)}">
        <span class="chip-symbol">${icon}</span>
        <span class="chip-text">${escapeHtml(r.title)}</span>
      </a>
    `;
  }).join("");

  return `
    <article class="student-lecture-card" data-lesson-id="${safeId}">
      <!-- Thumbnail & Top Badges Overlay -->
      <div class="lecture-thumb-wrap">
        <img src="${escapeHtml(thumbUrl)}" alt="${safeTitle}" loading="lazy" class="lecture-thumb-img" onerror="this.src='${fallbackThumb}'" />
        
        <div class="lecture-thumb-overlay" data-open-student-lesson="${safeId}">
          <button type="button" class="lecture-play-circle" aria-label="تشغيل المحاضرة">
            <span class="play-icon">▶</span>
          </button>
        </div>

        <!-- Top Right Badge: Lecture Number -->
        <div class="lecture-num-badge">
          <span>${numBadge}</span>
        </div>

        <!-- Top Left Badge: Duration or Next Time -->
        <div class="lecture-time-badge">
          <span>⏱️ ${duration}</span>
        </div>

        <!-- Bottom Status Overlay Badge -->
        <div class="lecture-status-overlay-badge status-${statusType}">
          ${statusType === 'live' ? '<span class="live-dot-pulse"></span>' : ''}
          ${statusType === 'available' ? '<span class="avail-dot"></span>' : ''}
          ${statusType === '4k' ? '<span class="hd-icon">📹</span>' : ''}
          <span>${statusBadge}</span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="lecture-card-body">
        <!-- Track & Date Meta -->
        <div class="lecture-track-date">
          <span class="track-tag">${category}</span>
          <span class="meta-separator">•</span>
          <span class="date-text">${safeDate}</span>
        </div>

        <!-- Title -->
        <h3 class="lecture-title" title="${safeTitle}">
          ${safeTitle}
        </h3>

        <!-- Description -->
        <p class="lecture-desc">
          ${safeDesc}
        </p>

        <!-- Material Chips Section (Only if real materials exist) -->
        ${resources.length > 0 ? `
          <div class="lecture-materials-section">
            <span class="materials-label">${resourcesLabel}</span>
            <div class="materials-chips-list" aria-label="مرفقات المحاضرة">
              ${resourceChipsHtml}
            </div>
          </div>
        ` : ""}
      </div>

      <!-- Card Action Footer -->
      <div class="lecture-card-footer">
        ${isLive ? `
          <button
            type="button"
            class="btn-zoom-live"
            data-open-student-lesson="${safeId}"
            aria-label="رابط قاعة البث المباشر: ${safeTitle}"
          >
            <span>رابط قاعة البث المباشر (Zoom)</span>
            <span class="btn-icon">🔗</span>
          </button>
        ` : `
          <button
            type="button"
            class="btn-watch-lecture-gradient"
            data-open-student-lesson="${safeId}"
            aria-label="مشاهدة المحاضرة: ${safeTitle}"
          >
            <span>مشاهدة المحاضرة المسجلة</span>
            <span class="btn-icon">▷</span>
          </button>
        `}
      </div>
    </article>
  `;
}

/**
 * Returns HTML string for the Teacher / Admin Management Card.
 * Redesigned with generous breathing room, rich media preview, comprehensive specs details,
 * and an uncrowded 2-tier action toolbar where buttons never overlap.
 * @param {object} params
 * @param {object} params.lesson
 * @returns {string}
 */
export function renderTeacherLessonCard({ lesson }) {
  const safeId = escapeHtml(lesson.id || "");
  const safeTitle = escapeHtml(lesson.title || lesson.name || "محاضرة بدون عنوان");
  const rawDesc = (lesson.description || "").trim();
  const safeDesc = rawDesc ? escapeHtml(rawDesc) : "لا يوجد وصف مضاف لهذه المحاضرة.";
  const hasDesc = Boolean(rawDesc);
  const safeDate = escapeHtml(lesson.sessionDate || "—");
  const groupName = lesson.group === "ALL" ? "جميع المجموعات" : (lesson.group ? `المجموعة: ${lesson.group}` : "عام للجميع");
  const safeGroup = escapeHtml(groupName);
  const isActive = lesson.active !== false;

  const ytId = extractYouTubeId(lesson.videoUrl || lesson.videoId || "");
  const hasVideo = Boolean(lesson.videoUrl || lesson.videoId);
  const hasFile = Boolean(lesson.fileUrl);
  const resourceCount = Array.isArray(lesson.resources) ? lesson.resources.length : 0;

  const safeFileUrl = (hasFile && isValidSafeUrl(lesson.fileUrl)) ? escapeHtml(lesson.fileUrl) : "";
  const rawVideoUrl = lesson.videoUrl || (ytId ? `https://www.youtube.com/watch?v=${ytId}` : "");
  const safeVideoUrl = (rawVideoUrl && isValidSafeUrl(rawVideoUrl)) ? escapeHtml(rawVideoUrl) : "";

  // 1. Media Preview Banner / Strip
  let mediaHtml = "";
  if (ytId) {
    const thumbUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    mediaHtml = `
      <div class="relative w-full aspect-video bg-[#0b0e14] overflow-hidden group">
        <img src="${escapeHtml(thumbUrl)}" alt="${safeTitle}" loading="lazy" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
          <span class="w-12 h-12 rounded-full bg-cyan-500/90 text-white flex items-center justify-center text-lg shadow-lg shadow-cyan-900/60 transition-transform group-hover:scale-110">
            <i class="fa-solid fa-play ml-0.5"></i>
          </span>
        </div>
        <span class="absolute top-3 right-3 text-[10px] bg-black/80 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow">
          <i class="fa-brands fa-youtube text-red-500"></i>
          <span>فيديو مسجل</span>
        </span>
      </div>
    `;
  } else if (hasVideo) {
    mediaHtml = `
      <div class="bg-[#0b0e14] border-b border-[#1b2537] p-3 flex items-center justify-between">
        <div class="flex items-center gap-2 text-cyan-400 text-xs font-bold">
          <i class="fa-solid fa-video text-sm"></i>
          <span>فيديو تعليمي مسجل</span>
        </div>
        ${safeVideoUrl ? `
          <a href="${safeVideoUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-cyan-300 hover:text-white flex items-center gap-1 font-semibold" title="مشاهدة رابط الفيديو">
            <span>مشاهدة</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        ` : ""}
      </div>
    `;
  } else {
    mediaHtml = `
      <div class="bg-[#0b0e14] border-b border-[#1b2537] p-3 flex items-center gap-2 text-slate-500 text-xs">
        <i class="fa-solid fa-video-slash"></i>
        <span>لم يتم إرفاق رابط فيديو للمحاضرة</span>
      </div>
    `;
  }

  // 2. Status & Group Badges
  const statusBadge = isActive
    ? `<span class="text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> نشطة</span>`
    : `<span class="text-[11px] bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-0.5 rounded-lg font-bold">معطلة</span>`;

  const groupBadge = `<span class="text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1" title="${safeGroup}">
    <i class="fa-solid fa-users text-[10px]"></i>
    <span>${safeGroup}</span>
  </span>`;

  // 3. Details & Materials Specs Box
  const specsHtml = `
    <div class="bg-[#0d121c] border border-[#1b2537] rounded-xl p-3 my-3 space-y-2 text-xs" aria-label="تفاصيل المحاضرة والمرفقات">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-slate-300">
          <i class="fa-solid fa-video text-slate-400 text-xs"></i>
          <span class="text-slate-400">الفيديو:</span>
          <span class="font-bold ${hasVideo ? 'text-cyan-400' : 'text-slate-500'}">${hasVideo ? 'متوفر' : 'بدون فيديو'}</span>
        </div>
        ${safeVideoUrl ? `
          <a href="${safeVideoUrl}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px]">
            <span>فتح</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
          </a>
        ` : ''}
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-slate-300">
          <i class="fa-solid fa-file-pdf text-slate-400 text-xs"></i>
          <span class="text-slate-400">المرفق:</span>
          <span class="font-bold ${hasFile ? 'text-amber-400' : 'text-slate-500'}">${hasFile ? 'ملف متاح' : 'بدون ملف'}</span>
        </div>
        ${safeFileUrl ? `
          <a href="${safeFileUrl}" target="_blank" rel="noopener noreferrer" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px]">
            <span>تحميل</span>
            <i class="fa-solid fa-download text-[9px]"></i>
          </a>
        ` : ''}
      </div>

      ${resourceCount > 0 ? `
        <div class="flex items-center justify-between pt-1 border-t border-[#1b2537]">
          <div class="flex items-center gap-2 text-slate-300">
            <i class="fa-solid fa-layer-group text-slate-400 text-xs"></i>
            <span class="text-slate-400">المصادر:</span>
            <span class="font-bold text-emerald-400">${resourceCount} مصادر وأكواد</span>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  return `
    <article class="bg-[#121825] border border-[#1e2a3f] rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${!isActive ? 'opacity-70' : ''}" data-lesson-id="${safeId}">
      <div>
        ${mediaHtml}

        <div class="p-5">
          <!-- Top Bar: Group + Status Badge + Date -->
          <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
            <div class="flex items-center gap-2 flex-wrap">
              ${groupBadge}
              ${statusBadge}
            </div>
            <div class="text-[11px] text-slate-400 font-mono flex items-center gap-1.5" title="تاريخ الجلسة">
              <i class="fa-regular fa-calendar text-[10px]"></i>
              <span>${safeDate}</span>
            </div>
          </div>

          <!-- Title -->
          <h4 class="text-base font-extrabold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors" title="${safeTitle}">
            ${safeTitle}
          </h4>

          <!-- Description -->
          <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed ${!hasDesc ? 'text-slate-500 italic' : ''}">
            ${safeDesc}
          </p>

          <!-- Detailed Specs Box -->
          ${specsHtml}
        </div>
      </div>

      <!-- Actions Footer -->
      <div class="p-5 pt-0 space-y-2">
        <!-- Tier 1: Primary Action -->
        <button
          type="button"
          class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/50 border border-cyan-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          data-teacher-view-lesson="${safeId}"
          aria-label="عرض تفاصيل المحاضرة: ${safeTitle}"
        >
          <i class="fa-solid fa-eye text-sm"></i>
          <span>عرض التفاصيل والمحتوى</span>
        </button>

        <!-- Tier 2: Management Controls -->
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            class="py-2 px-3 rounded-lg bg-[#182133] hover:bg-[#1f2b42] text-slate-200 border border-[#23314a] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            data-teacher-edit-lesson="${safeId}"
            aria-label="تعديل المحاضرة: ${safeTitle}"
          >
            <i class="fa-solid fa-pen text-amber-400 text-[11px]"></i>
            <span>تعديل</span>
          </button>

          <button
            type="button"
            class="py-2 px-3 rounded-lg ${isActive ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30'} border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            data-teacher-toggle-status="${safeId}"
            data-current-active="${isActive}"
            aria-label="تغيير حالة المحاضرة: ${safeTitle}"
          >
            <i class="fa-solid ${isActive ? 'fa-pause' : 'fa-play'} text-[11px]"></i>
            <span>${isActive ? 'تعطيل' : 'تفعيل'}</span>
          </button>

          <button
            type="button"
            class="py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            data-teacher-delete-lesson="${safeId}"
            data-lesson-title="${safeTitle}"
            aria-label="حذف المحاضرة: ${safeTitle}"
          >
            <i class="fa-solid fa-trash-can text-[11px]"></i>
            <span>حذف</span>
          </button>
        </div>
      </div>
    </article>
  `;
}
