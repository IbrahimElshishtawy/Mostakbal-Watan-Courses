// src/features/attendance/components/attendance-widget.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Returns HTML string for compact attendance widget on Student Dashboard.
 */
export function renderAttendanceDashboardWidget({ attendanceData }) {
  const totalSessions = attendanceData?.totalSessions || 0;
  const presentCount = attendanceData?.presentCount || 0;
  const absentCount = attendanceData?.absentCount || 0;
  const attendanceRate = attendanceData ? Math.round(attendanceData.attendanceRate || 0) : 0;
  const isLow = attendanceRate < 75;

  return `
    <div class="dash-attendance-alert-card ${isLow ? 'is-low' : 'is-good'}">
      <div class="dash-attendance-header">
        <div class="dash-attendance-title-box">
          <span class="alert-icon">⚠️</span>
          <h4 class="alert-title">تنبيه نسبة الحضور التراكمي</h4>
        </div>
        <div class="dash-attendance-badge ${isLow ? 'badge-low' : 'badge-good'}">
          <span>${isLow ? 'نسبة منخفضة جداً' : 'حضور منتظم وممتاز'}</span>
        </div>
      </div>

      <div class="dash-attendance-body">
        <div class="dash-attendance-rate-number">
          <span class="number-val">${attendanceRate}%</span>
        </div>
        <p class="dash-attendance-notice">
          ${isLow
            ? 'تنبيه أكاديمي: يرجى متابعة تسجيل الحضور مع المهندس إبراهيم الششتواي لتفادي استبعادك من الاختبارات النهائية والمشروع الختامي.'
            : `سجل حضورك منتظم (${presentCount} حاضر من أصل ${totalSessions} محاضرات). استمر في الالتزام للحفاظ على أهليتك لشهادة التخرج.`
          }
        </p>
      </div>

      <div class="dash-attendance-footer">
        <button type="button" id="widgetViewAttendanceBtn" class="btn-attendance-detail">
          <span>عرض السجل المفصل والأعذار</span>
          <span class="btn-icon">📑</span>
        </button>
      </div>
    </div>
  `;
}
