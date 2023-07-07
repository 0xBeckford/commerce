import Image from 'next/image'

export default function LogoIcon({ className }: { className?: string }) {
  return (
   <Image
   src="/images/myra-logo.png"
   width={32}
   height={32}
   alt="myra icon logo"
   />
  );
}
