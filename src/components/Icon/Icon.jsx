const PATHS = {
  bell: ['M15 17h5l-1.4-2.1A2 2 0 0118 13.8V11a6 6 0 10-12 0v2.8c0 .43-.14.85-.4 1.2L4 17h5', 'M15 17a3 3 0 11-6 0'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'chevron-left': ['M15 18l-6-6 6-6'],
  'chevron-right': ['M9 18l6-6-6-6'],
  'chevron-double-left': ['M11 19l-7-7 7-7', 'M19 19l-7-7 7-7'],
  'check-circle': ['M22 11.08V12a10 10 0 11-5.93-9.14', 'M22 4L12 14.01l-3-3'],
  pencil: ['M12 20h9', 'M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z'],
  clock: ['M12 6v6l4 2', 'M12 22a10 10 0 100-20 10 10 0 000 20z'],
  'file-text': ['M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  award: ['M12 15a7 7 0 100-14 7 7 0 000 14z', 'M8.21 13.89L7 23l5-3 5 3-1.21-9.12'],
  calendar: ['M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  dashboard: ['M3 13h8V3H3v10z', 'M13 21h8V11h-8v10z', 'M3 21h8v-6H3v6z', 'M13 9h8V3h-8v6z'],
  notebook: ['M4 4h12a2 2 0 012 2v14a2 2 0 01-2 2H4z', 'M2 8h2', 'M2 12h2', 'M2 16h2'],
  target: ['M12 22a10 10 0 100-20 10 10 0 000 20z', 'M12 18a6 6 0 100-12 6 6 0 000 12z', 'M12 14a2 2 0 100-4 2 2 0 000 4z'],
  plus: ['M12 5v14', 'M5 12h14'],
  download: ['M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  trash: ['M3 6h18', 'M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6', 'M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2'],
  refresh: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0114.85-3.36L23 10', 'M1 14l4.64 4.36A9 9 0 0020.49 15'],
  close: ['M18 6L6 18', 'M6 6l12 12'],
  bold: ['M6 4h8a4 4 0 010 8H6z', 'M6 12h9a4 4 0 010 8H6z'],
  italic: ['M19 4h-9', 'M14 20H5', 'M15 4L9 20'],
  underline: ['M6 3v7a6 6 0 0012 0V3', 'M4 21h16'],
  strikethrough: ['M16 4H9a3 3 0 00-2.83 4', 'M14 12a4 4 0 010 8H6', 'M4 12h16'],
  link: ['M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71'],
  'align-left': ['M17 10H3', 'M21 6H3', 'M21 14H3', 'M17 18H3'],
  'align-center': ['M18 10H6', 'M21 6H3', 'M21 14H3', 'M18 18H6'],
  'align-right': ['M21 10H7', 'M21 6H3', 'M21 14H3', 'M21 18H7'],
  'list-ol': ['M10 6h11', 'M10 12h11', 'M10 18h11', 'M4 6h1v4', 'M4 10h2', 'M6 18H4c0-1 2-2 2-3s-1-1.5-2-1'],
  'list-ul': ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
  image: ['M21 15V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z', 'M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z', 'M21 15l-5-5L5 21'],
  palette: ['M12 22a10 10 0 110-20 8 8 0 018 8c0 2-1 4-4 4h-1a2 2 0 00-1 4 2 2 0 01-2 4z'],
  'clear-format': ['M15 4H9L3 10l6 6h6l6-6-6-6z', 'M9 13l6-6'],
  'horizontal-rule': ['M5 12h14'],
};

export default function Icon({ name, size = 18, strokeWidth = 1.75, color = 'currentColor', className, src, alt = '' }) {
  if (src) {
    return <img src={src} width={size} height={size} alt={alt} className={className} />;
  }
  const paths = PATHS[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
