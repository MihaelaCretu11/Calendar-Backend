class RecursiveEvent {
  constructor(
    id,
    title,
    startDate,
    endDate,
    startHour,
    endHour,
    recursive
  ) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startHour = startHour;
    this.endHour = endHour;
    this.recursive = recursive
  }
}

module.exports = RecursiveEvent;