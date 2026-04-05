/**
 * FAQSection Component - Voice-search optimized FAQ accordion
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  breedName?: string;
}

export function FAQSection({ faqs, breedName }: FAQSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        {breedName && (
          <p className="mt-2 text-slate-600">
            Common questions about {breedName}s
          </p>
        )}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-slate-900 hover:text-blue-600">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
