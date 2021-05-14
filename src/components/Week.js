import { useState, useEffect } from "react"

/* function that takes numbers 0 to 6 and returns day of the week */
const day = (dayNum) => {
  switch (dayNum) {
    case 0:
      return "Sun"
    case 1:
      return "Mon"
    case 2:
      return "Tue"
    case 3:
      return "Wed"
    case 4:
      return "Thu"
    case 5:
      return "Fri"
    case 6:
      return "Sat"
    case 7:
      return "Sun"
    default:
      return null
  }
}

/* function that takes numbers 0 to 11 and returns month of the year */
const month = (monthNum) => {
  switch (monthNum) {
    case 0:
      return "Jan"
    case 1:
      return "Feb"
    case 2:
      return "Mar"
    case 3:
      return "Apr"
    case 4:
      return "May"
    case 5:
      return "June"
    case 6:
      return "July"
    case 7:
      return "Aug"
    case 8:
      return "Sep"
    case 9:
      return "Oct"
    case 10:
      return "Nov"
    case 11:
      return "Dec"
    default:
      return null
  }
}

const Week = () => {
  const [currentWeek, setCurrentWeek] = useState([])
  const [showCreateEventModal, setCreateEventModal] = useState(false)
  const [showEditEventModal, setEditEventModal] = useState(false)
  const [eventTitle, setEventTitle] = useState("")
  const [eventStartTime, setEventStartTime] = useState("")
  const [eventEndTime, setEventEndTime] = useState("")
  const [calendarEvents, setCalendarEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")

  const dOne = new Date()
  const cw = []
  for (let i = 0; i < 7; i++) {
    const date = dOne.getDate() - dOne.getDay() + i
    const fullDate = new Date(2021, 4, date)
    cw.push(fullDate)
  }

  const addAnEvent = (e) => {
    e.preventDefault()
    setCalendarEvents((prev) =>
      prev.concat({
        id: Date.now(),
        title: eventTitle,
        eventStartTime,
        eventEndTime,
      })
    )
    setEventTitle("")
    setCreateEventModal(false)
  }

  const editAnEvent = (e) => {
    e.preventDefault()
    const newEvents = []
    calendarEvents.forEach((ev) => {
      if (ev.id === selectedEvent) {
        console.log("match")
        newEvents.push({
          id: ev.id,
          title: eventTitle,
          eventStartTime,
          eventEndTime,
        })
      } else {
        newEvents.push(ev)
      }
    })
    console.log(newEvents)
    setCalendarEvents(newEvents)
    setEditEventModal(false)
  }

  const deleteEvent = (eventId) => {
    setCalendarEvents((prev) => prev.filter((ev) => ev.id !== eventId))
  }

  useEffect(() => {
    setCurrentWeek(cw)
  }, [])
  return (
    <>
      <div className="container">
        <div className="week">
          {currentWeek.map((d, i) => {
            return (
              <div
                key={i}
                className="day"
                onClick={() => {
                  setEventStartTime(new Date().toISOString())
                  setEventEndTime(new Date().toISOString())
                  setCreateEventModal(true)
                }}
              >
                <h1 className="date">{new Date(d).getDate()}</h1>
                <h3 className="day">{day(new Date(d).getDay())}</h3>
                <h3 className="month">{month(new Date(d).getMonth())}</h3>
              </div>
            )
          })}
        </div>
        <div className={`create-event-modal ${showCreateEventModal ? "create-event-modal--show" : ""}`}>
          <div className="create-event">
            <p>Add Event</p>
            <form className="create-event-form" onSubmit={addAnEvent}>
              <div className="form-field">
                <label htmlFor="event-title">Add Event Title: </label>
                <input value={eventTitle} type="text" onChange={(e) => setEventTitle(e.target.value)} required id="event-title" placeholder="Add Event Title" />
              </div>
              <div className="form-field">
                <label htmlFor="event-start-time">Add Start Time: </label>
                <input value={eventStartTime} type="datetime-local" onChange={(e) => setEventStartTime(e.target.value)} required id="event-start-time" />
              </div>
              <div className="form-field">
                <label htmlFor="event-end-time">Add End Time: </label>
                <input value={eventEndTime} type="datetime-local" onChange={(e) => setEventEndTime(e.target.value)} required id="event-end-time" />
              </div>

              <button>Add Event</button>
            </form>
          </div>
        </div>
        {/* EDIT EVENT */}
        <div className={`create-event-modal ${showEditEventModal ? "create-event-modal--show" : ""}`}>
          <div className="create-event">
            <p>Edit Event</p>
            <form className="create-event-form" onSubmit={editAnEvent}>
              <div className="form-field">
                <label htmlFor="event-title">Add New Event Title: </label>
                <input value={eventTitle} type="text" onChange={(e) => setEventTitle(e.target.value)} required id="event-title" placeholder="Add New Event Title" />
              </div>
              <div className="form-field">
                <label htmlFor="event-start-time">Add Start Time: </label>
                <input value={eventStartTime} type="datetime-local" onChange={(e) => setEventStartTime(e.target.value)} required id="event-start-time" />
              </div>
              <div className="form-field">
                <label htmlFor="event-end-time">Add End Time: </label>
                <input value={eventEndTime} type="datetime-local" onChange={(e) => setEventEndTime(e.target.value)} required id="event-end-time" />
              </div>

              <button>Edit Event</button>
            </form>
          </div>
        </div>
        <div className="added-events">
          <h1>Events</h1>
          {calendarEvents.map((ev, i) => {
            return (
              <div key={i} className="event">
                <div className="event-text">
                  <p>
                    {i + 1}.&nbsp;{ev.title}&nbsp; (&nbsp;
                    {new Date(ev.eventStartTime).getDate()}-{month(new Date(ev.eventStartTime).getMonth())}-{new Date(ev.eventStartTime).getFullYear()} {new Date(ev.eventStartTime).getHours()}:{new Date(ev.eventStartTime).getMinutes()} to {new Date(ev.eventEndTime).getDate()}-{month(new Date(ev.eventEndTime).getMonth())}-{new Date(ev.eventEndTime).getFullYear()} {new Date(ev.eventEndTime).getHours()}:{new Date(ev.eventEndTime).getMinutes()})
                  </p>
                </div>
                <div className="event-edit-delete">
                  <button
                    className="edit"
                    onClick={() => {
                      setSelectedEvent(ev.id)
                      setEventTitle(ev.title)
                      setEventStartTime(ev.eventStartTime)
                      setEventEndTime(ev.eventEndTime)
                      setEditEventModal(true)
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete" onClick={() => deleteEvent(ev.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Week
