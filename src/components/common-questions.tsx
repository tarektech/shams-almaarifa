import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

type CommonQuestionsTypes = {
  title: string;
  description: string;
};

const commonQuestions: CommonQuestionsTypes[] = [
  {
    title: 'ما الذي يميّز منصّة شمس المعرفة؟',
    description:
      'أهم ما يميّزها أنّها منصّة تعليميّة موجّهة لكافة الفئات العمريّة؛ أطفال ويافعين وشباب، وتسعى جاهدة لبثِّ العلم في كافة المجالات حتّى تكون حقّاً شمساً يصل شعاع نورها إلى كافة فئات المجتمع العمريّة.',
  },
  {
    title: 'ماذا يعني دورات نموذجيّة؟',
    description:
      'شرح للمنهاج كامل مع متابعة وتسميع بأعداد نموذجيّة محدودة إلى ان يصل الطالب إلى إتقان المادّة.',
  },
  {
    title: 'هل يوجد في المنصّة دورات نموذجيّة؟',
    description: 'نعم يوجد.',
  },
  {
    title: 'كم مدّة الدورات النموذجيّة؟',
    description:
      'تختلف من مادّة إلى مادّة، بشكل عام لا تزيد أي مادّة عن أربعين جلسة.',
  },
  {
    title: 'هل لديكم كورسات لإتقان اللُّغة العربيّة؟  ',
    description: 'نعم يوجد.',
  },
  {
    title: 'ماهي البرامج التي يمكن أن تكون جيّدة لتعلُّم التصميم الجرافيكي؟',
    description: `البرنامج الذي يمكن أن تبدأ به يعتمد على اهتماماتك وأهدافك. ومنها:
Adobe inDesign
Adobe illustrator
Adobe Photoshop`,
  },
  {
    title: 'ماهي نقطة البداية لتعلُّم مجال تصميم الويب؟',
    description: 'تعلُّم أساسيات HTML ,CSSثمّ تعلّم Javascript .',
  },
  {
    title: 'ما هو البرنامج الهندسي الذي يجب أن أبدأ بتعلُّمه؟',
    description:
      'AutoCAD وهو برنامج رسم وتصميم هندسي يستخدم على نطاق واسع في مختلف مجالات الهندسة مثل المعماريّة والمدنيّة والكهربائيّة والميكانيكية، وتعلمه سيفتح لك الباب لاستكشاف برامج هندسية أخرى مثل ال Revit.',
  },
];

export default function CommonQuestions() {
  return (
    <section className="py-20 px-4">
      <Accordion
        type="single"
        collapsible
        className="max-w-4xl mx-auto text-amber-400 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 py-10 mb-10"
      >
        {commonQuestions.map((question, index) => (
          <AccordionItem
            key={question.title}
            value={`item-${index}`}
            className="border-none"
          >
            <AccordionTrigger className="transition-all duration-300 ease-in-out hover:text-gray-300 cursor-pointer animate__animated animate__fadeIn">
              {question.title}
            </AccordionTrigger>
            <AccordionContent className="text-white animate__animated animate__slideInDown data-[state=closed]:animate__slideOutUp">
              {question.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
