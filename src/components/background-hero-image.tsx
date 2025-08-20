import Image from "next/image";

export default function BackgroundHeroImage() {
  return (
    <div className="absolute inset-0 -z-10 ">
    <Image
      src="/images/hero-image.png"
      alt="شمس المعرفة - تجمعنا"
      fill
      className="object-cover brightness-50"
      priority
    />
    <div className="absolute inset-0 bg-black/40" />
  </div>
  );
}