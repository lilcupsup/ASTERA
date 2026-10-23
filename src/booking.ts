export interface SearchInput {
  destination: string;
  date: string;
  travelers: number;
  cabin: string;
}
const base: Record<string, number> = {
  luna: 185000,
  mars: 480000,
  europa: 720000,
  saturn: 960000,
  titan: 1150000,
};
const cabinRates: Record<string, number> = {
  suite: 1,
  residence: 1.65,
  charter: 3.2,
};
export function searchJourneys(input: SearchInput, today = new Date()) {
  const midnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const date = new Date(input.date + "T12:00:00");
  if (!base[input.destination] || !cabinRates[input.cabin])
    throw new Error("Please choose a destination and cabin.");
  const normalized = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(input.date) ||
    !Number.isFinite(date.getTime()) ||
    date < midnight ||
    normalized !== input.date
  )
    throw new Error("Please choose a valid departure date from today onward.");
  if (
    !Number.isInteger(input.travelers) ||
    input.travelers < 1 ||
    input.travelers > 12
  )
    throw new Error("Choose between 1 and 12 travelers.");
  if (input.cabin === "charter" && input.destination === "europa") return [];
  return [
    {
      id: `AST-${input.destination}-${input.date}`,
      departure: input.date,
      total:
        base[input.destination] * cabinRates[input.cabin] * input.travelers,
      travelers: input.travelers,
      cabin: input.cabin,
      destination: input.destination,
    },
  ];
}
export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
