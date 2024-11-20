import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  height: number; // Hauteur fixe
  priority?: boolean;
}

const CustomImage = ({ src, alt, height, priority }: CustomImageProps) => {
  return (
    <div
      className="mt-2"
      style={{ position: "relative", height: `${height}px`, width: "100%" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default CustomImage;
