'use client';

export default function Container({children, width}: { children: React.ReactNode, width?: number }) {
  return (
    <div className="mx-auto my-5" style={{maxWidth: width || 500}}>
        {children}
    </div>
  );
}
