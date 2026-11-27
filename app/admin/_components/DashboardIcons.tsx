// White outline icons for the dashboard tiles. Decorative: the tile name is the accessible label.
function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconPageSeo() {
  return (
    <Icon>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </Icon>
  );
}

export function IconTechnicalSeo() {
  return (
    <Icon>
      <path d="M4 7h9M18 7h2M4 17h2M11 17h9" />
      <circle cx="15.5" cy="7" r="2.5" />
      <circle cx="8.5" cy="17" r="2.5" />
    </Icon>
  );
}

export function IconImageSeo() {
  return (
    <Icon>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="M21 16l-5-5-9 9" />
    </Icon>
  );
}

export function IconGsc() {
  return (
    <Icon>
      <path d="M3.5 3.5v17h17" />
      <path d="M7.5 15l4-4.5 3 3L19.5 7" />
      <path d="M16 7h3.5v3.5" />
    </Icon>
  );
}

export function IconSerp() {
  return (
    <Icon>
      <path d="M3.5 20.5h17" />
      <rect x="4" y="12" width="4.5" height="8.5" rx="1" />
      <rect x="9.75" y="5" width="4.5" height="15.5" rx="1" />
      <rect x="15.5" y="14.5" width="4.5" height="6" rx="1" />
    </Icon>
  );
}
