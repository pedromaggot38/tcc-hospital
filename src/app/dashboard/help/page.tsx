import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const accordionItems = [
    {
        title: "Como criar um novo post",
        content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
        title: "Is it styled?",
        content: "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
        title: "Is it animated?",
        content: "Yes. It's animated by default, but you can disable it if you prefer.",
    },
];

const HelpPage = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold pb-6">Ajuda</h1>
                </div>
                <div className="grid grid-cols-4 gap-y-2 gap-x-10">
                    {accordionItems.map((item, index) => (
                        <Accordion key={index} type="single" collapsible>
                            <AccordionItem value={`item-${index + 1}`} className="">
                                <AccordionTrigger>{item.title}</AccordionTrigger>
                                <AccordionContent>
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HelpPage;
