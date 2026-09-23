document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     Build the results bar chart
  --------------------------------------------------- */
  const chartData = [
    { label: 'Marketing',  value: 62, color: '#34c983' },
    { label: 'Sales',      value: 78, color: '#34c983' },
    { label: 'Product',    value: 45, color: '#bfe9d6' },
    { label: 'People',     value: 70, color: '#bfe9d6' },
    { label: 'Support',    value: 88, color: '#7a7cf0' },
  ];

  const chartEl = document.getElementById('resultsChart');
  if (chartEl) {
    chartData.forEach(({ label, value, color }) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${value}%`;
      bar.style.background = color;
      bar.title = `${label}: ${value}`;
      chartEl.appendChild(bar);
    });
  }

  /* ---------------------------------------------------
     Reveal cards + trigger bar / donut animation
     when the bento grid scrolls into view
  --------------------------------------------------- */
  const cards = document.querySelectorAll('[data-reveal]');
  const bars = document.querySelectorAll('.bar');
  const donut = document.getElementById('donutValue');

  // circumference for r=66 -> 2 * PI * 66 ≈ 414.7
  const CIRCUMFERENCE = 414.7;
  const TURNOVER_PERCENT = 27;

  const animateOnce = () => {
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('is-visible'), i * 90);
    });

    setTimeout(() => {
      bars.forEach((bar, i) => {
        setTimeout(() => bar.classList.add('is-visible'), i * 70);
      });
    }, 200);

    if (donut) {
      const offset = CIRCUMFERENCE * (1 - TURNOVER_PERCENT / 100);
      setTimeout(() => {
        donut.style.strokeDashoffset = offset;
      }, 250);
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateOnce();
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });

    const bento = document.getElementById('bento');
    if (bento) observer.observe(bento);
  } else {
    // Fallback for environments without IntersectionObserver
    animateOnce();
  }

});
