

interface AuthorBioProps {
    author?: {
        name: string;
        role: string;
        image?: string;
        bio: string;
        linkedin?: string;
    };
}

export default function AuthorBio({ author }: AuthorBioProps) {
    const defaultAuthor = {
        name: "CHAITANYA BHARATH GOPU",
        role: "Principal Cloud Architect",
        bio: "Specializing in distributed systems, sovereign cloud governance, and AI-driven enterprise modernization.",
        image: "/images/authors/omnigcloud-team.jpg"
    };

    const currentAuthor = author || defaultAuthor;

    return (
        <div className="mt-12 p-8 rounded-2xl bg-card border border-border/50">
            <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                        {/* Using a simple div fallback if no image component available */}
                        <img
                            src={currentAuthor.image}
                            alt={currentAuthor.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==';
                            }}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-foreground">{currentAuthor.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{currentAuthor.role}</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        {currentAuthor.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
