class Event {
    constructor(
      id,
      title,
      startDate,
      endDate,
      startHour,
      endHour,
      primaryColour,
      secondaryColour,
      recursive,
    ) {
      this.id = id;
      this.title = title;
      this.startDate = startDate;
      this.endDate = endDate;
      this.startHour = startHour;
      this.endHour = endHour;
      this.primaryColour = primaryColour;
      this.secondaryColour = secondaryColour;
      this.recursive = recursive;
    }
  }
  
  module.exports = Event;