export function formatDate(date: Date, time = false): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return ""; // invalid date
    }

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

    if (time) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.hour12 = true; // AM/PM format
    }

    return date.toLocaleString(undefined, options);
}
