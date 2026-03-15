type JourneyItem = {
  year: string;
  title: string;
  description: string;
};

type JourneyTimelineProps = {
  items: JourneyItem[];
  inverted?: boolean;
  orientation?: "vertical" | "horizontal";
};

export function JourneyTimeline({ items, inverted = false, orientation = "vertical" }: JourneyTimelineProps) {
  if (orientation === "horizontal") {
    return (
      <ol
        className={`relative grid gap-6 pt-10 md:grid-cols-4 ${
          inverted ? "before:bg-white/25" : "before:bg-border"
        } before:absolute before:left-0 before:right-0 before:top-4 before:h-px before:content-['']`}
      >
        {items.map((item) => (
          <li key={`${item.year}-${item.title}`} className="relative rounded-xl border border-white/15 bg-white/[0.02] p-5">
            <span className={`absolute -top-[31px] left-5 h-3 w-3 rounded-full border ${inverted ? "border-white bg-black" : "border-black bg-white"}`} />
            <p className={`mb-1 text-xs tracking-[0.2em] uppercase ${inverted ? "text-white/65" : "text-muted"}`}>{item.year}</p>
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${inverted ? "text-white/75" : "text-muted"}`}>{item.description}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={`relative ml-2 border-l pl-8 ${inverted ? "border-white/25" : "border-border"}`}>
      {items.map((item) => (
        <li key={`${item.year}-${item.title}`} className="relative mb-10 last:mb-0">
          <span
            className={`absolute -left-[37px] top-1 h-3 w-3 rounded-full border ${
              inverted ? "border-white bg-black" : "border-black bg-white"
            }`}
          />
          <p className={`mb-1 text-xs tracking-[0.2em] uppercase ${inverted ? "text-white/65" : "text-muted"}`}>
            {item.year}
          </p>
          <h3 className="text-base font-semibold">{item.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${inverted ? "text-white/75" : "text-muted"}`}>
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
