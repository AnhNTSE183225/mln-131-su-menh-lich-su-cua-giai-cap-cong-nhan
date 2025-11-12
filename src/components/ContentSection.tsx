import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface ContentSectionProps {
    title: string;
    content: string | string[];
    subtitle?: string;
    className?: string;
}

export function ContentSection({title, content, subtitle, className}: ContentSectionProps) {
    const paragraphs = Array.isArray(content) ? content : [content];

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {subtitle && <CardDescription>{subtitle}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
                {paragraphs.map((para, index) => (
                    <CardDescription key={index} className="text-base leading-relaxed text-foreground">
                        {para}
                    </CardDescription>
                ))}
            </CardContent>
        </Card>
    );
}

interface ContentPageProps {
    title: string;
    description?: string;
    sections: Array<{
        title: string;
        content: string | string[];
        subtitle?: string;
    }>;
}

export function ContentPage({title, description, sections}: ContentPageProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl md:text-4xl text-center">{title}</CardTitle>
                        {description && (
                            <CardDescription className="text-lg text-center mt-2">
                                {description}
                            </CardDescription>
                        )}
                    </CardHeader>
                </Card>

                {sections.map((section, index) => (
                    <ContentSection
                        key={index}
                        title={section.title}
                        content={section.content}
                        subtitle={section.subtitle}
                    />
                ))}
            </div>
        </div>
    );
}

