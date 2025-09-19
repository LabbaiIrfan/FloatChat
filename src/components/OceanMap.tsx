interface OceanMapProps {
  className?: string;
  darkMode?: boolean;
  showControls?: boolean;
  showTooltips?: boolean;
}
export function OceanMap({ className = '', darkMode = false }: OceanMapProps) {
  const mapUrl = 'https://maps.biogeochemical-argo.com/adoptafloat/?&txt=2902275__NAVYUG_PUBLIC_SCHOOL';
  return (
    <div className={`relative overflow-hidden rounded-xl ${darkMode ? 'bg-[#001f3f]' : 'bg-[#002d57]'} ${className}`}>
      <div className="relative w-full h-full" style={{ minHeight: '300px' }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
          className="rounded-xl"
          title="Ocean Data Map"
          style={{ minHeight: '300px' }}
        />
      </div>
    </div>
  );
}