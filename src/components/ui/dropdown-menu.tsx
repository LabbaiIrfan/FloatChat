import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

type DropdownContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export const DropdownMenu: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (!open) return;
      if (triggerRef.current && triggerRef.current.contains(target)) return;
      if (contentRef.current && contentRef.current.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
};

// Trigger: clones its child and hooks up click/toggle behavior
export const DropdownMenuTrigger: React.FC<React.PropsWithChildren<{ asChild?: boolean }>> = ({ children }) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) return null;
  const { setOpen, triggerRef } = ctx;

  // Expect a single child element to clone
  const child = React.Children.only(children) as React.ReactElement<any, any>;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((v: boolean) => !v);
    // If child has its own onClick, call it
    const childOnClick = (child.props && (child.props as any).onClick) as ((e: React.MouseEvent) => void) | undefined;
    if (typeof childOnClick === 'function') childOnClick(e);
  };

  return React.cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      // assign both internal ref and forwarded ref if present
      triggerRef.current = node;
      const ref = (child as any).ref;
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<any>).current = node;
    },
    onClick: handleClick,
  });
};

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end' | 'center' | string;
}

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, className = '', align = 'end', ...props }) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) return null;
  const { open, contentRef } = ctx;

  const alignClass = align === 'end' ? 'right-0' : align === 'start' ? 'left-0' : 'left-1/2 transform -translate-x-1/2';

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="menu"
      aria-hidden={!open}
      className={`absolute ${alignClass} mt-2 w-56 bg-white text-black rounded-md shadow-lg z-50 dark:bg-[#09243a] dark:text-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, onClick, ...props }) => {
  const ctx = useContext(DropdownContext);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) onClick(e);
    if (ctx) ctx.setOpen(false);
  };

  return (
    <button {...props} onClick={handleClick} className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 ${props.className || ''}`}>
      {children}
    </button>
  );
};

export const DropdownMenuSeparator: React.FC = () => (
  <div className="my-1 border-t border-gray-100" />
);

export default DropdownMenu;
