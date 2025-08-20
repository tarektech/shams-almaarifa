import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 text-black border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
        <div className="">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">شمس المعرفة</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            شمس المعرفة هي مؤسسة تعليمية تهدف إلى تعلم الأطفال والمراهقين
            والبالغين في مجال العلوم والتكنولوجيا والرياضيات واللغات والفنون.
          </p>
        </div>
        <div className="">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">روابط</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300 font-medium">الرئيسية</Link>
            </li>
            <li>
              <Link href="/about" className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300 font-medium">عن المؤسسة</Link>
            </li>
          </ul>
        </div>
        <div className="">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">تواصل معنا</h3>
        <ul className="space-y-3">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300 font-medium">الرئيسية</Link>
          </li>
          <li>
            <Link href="/about" className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300 font-medium">عن المؤسسة</Link>
          </li>
        </ul>
         </div>
      </div>
    </footer>
  );
}
