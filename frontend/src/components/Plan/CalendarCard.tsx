import dayjs from "dayjs";

type Props = {
  year: number;
  month: number; // 0-11
  values: number[];
};

export default function CalendarCard({
  year,
  month,
  values,
}: Props) {
  const daysInMonth = dayjs()
    .year(year)
    .month(month)
    .daysInMonth();

  const firstDay = dayjs(
    `${year}-${month + 1}-01`
  ).day();

  const cells = [];

  // Espacios vacíos antes del día 1
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const value = values[day - 1] || 0;

    cells.push(
      <div
        key={day}
        className="calendar-day"
        style={{
          backgroundColor: getColor(value),
        }}
      >
        <div className="day-number">{day}</div>

        <div className="day-value">
          {value ? value.toLocaleString() : "-"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 border border-gray-200 rounded-lg">
      <div className="weekdays">
        <span>Do</span>
        <span>Lu</span>
        <span>Ma</span>
        <span>Mi</span>
        <span>Ju</span>
        <span>Vi</span>
        <span>Sa</span>
      </div>

      <div className="calendar-grid">
        {cells}
      </div>
    </div>
  );
}

function getColor(value: number) {
  if (value === 0) return "#F5F6FA";

  if (value < 250)
    return "#DBEAFE";

  if (value < 500)
    return "#93C5FD";

  if (value < 1000)
    return "#3B82F6";

  return "#1D4ED8";
}
