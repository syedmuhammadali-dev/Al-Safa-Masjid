import Swal, { SweetAlertOptions } from 'sweetalert2';

// Themed SweetAlert2 wrapper that matches the site's emerald palette and
// automatically adapts to the current dark/light mode (the `.dark` class is
// toggled on <html> in App.tsx).
export function showAlert(options: SweetAlertOptions) {
  const isDark = document.documentElement.classList.contains('dark');

  return Swal.fire({
    confirmButtonColor: '#059669', // emerald-600
    background: isDark ? '#0f172a' : '#ffffff', // slate-900 / white
    color: isDark ? '#e2e8f0' : '#1e293b', // slate-200 / slate-800
    ...options,
  });
}
