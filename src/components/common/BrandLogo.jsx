export default function BrandLogo({ className = "" }) {
  return (
    <span className={`fl-brand-lockup ${className}`} role="img" aria-label="FlyingLyte">
      <span className="fl-brand-lockup__emblem" aria-hidden="true">
        <img src="/images/flyinglyte-emblem.webp" width="320" height="240" alt="" decoding="async" />
      </span>
      <span className="fl-brand-lockup__name" aria-hidden="true">FlyingLyte</span>
    </span>
  );
}
