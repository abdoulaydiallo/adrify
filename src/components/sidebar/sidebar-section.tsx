import { SidebarSectionProps } from "@/types";

const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  return (
    <div className="py-2">
      <h3 className="mb-2 px-3 text-xs font-semibold text-gray-900 uppercase tracking-wider">
        {title}
      </h3>
      <nav className="space-y-1">{children}</nav>
    </div>
  );
};

export default SidebarSection;
