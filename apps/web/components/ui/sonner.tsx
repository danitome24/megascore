"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  useTheme();

  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-900/95 group-[.toaster]:text-white group-[.toaster]:border-zinc-700/30 group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-sm group-[.toaster]:rounded-lg group-[.toaster]:border group-[.toaster]:p-3 group-[.toaster]:min-h-[50px] group-[.toaster]:max-w-[300px] group-[.toaster]:font-sans",
          description:
            "group-[.toast]:text-zinc-400 group-[.toast]:text-xs group-[.toast]:font-normal group-[.toast]:mt-1",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:hover:bg-zinc-100 group-[.toast]:font-medium group-[.toast]:px-2 group-[.toast]:py-1 group-[.toast]:rounded group-[.toast]:text-xs",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-300 group-[.toast]:hover:bg-zinc-700 group-[.toast]:font-medium group-[.toast]:px-2 group-[.toast]:py-1 group-[.toast]:rounded group-[.toast]:text-xs",
          title:
            "group-[.toast]:text-white group-[.toast]:font-medium group-[.toast]:text-sm group-[.toast]:leading-tight",
          icon: "group-[.toast]:text-zinc-400 group-[.toast]:w-4 group-[.toast]:h-4 group-[.toast]:mr-2",
          closeButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-zinc-500 group-[.toast]:border-0 group-[.toast]:hover:bg-zinc-800 group-[.toast]:hover:text-zinc-300 group-[.toast]:w-5 group-[.toast]:h-5",
        },
      }}
      position="bottom-right"
      expand={false}
      richColors={false}
      closeButton={true}
      offset="16px"
      {...props}
    />
  );
};

export { Toaster };
