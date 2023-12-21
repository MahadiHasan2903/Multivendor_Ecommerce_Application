import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import styles from "../../styles/styles";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          {allEvents && allEvents.length > 0 ? (
            <div className="grid w-full">
              {allEvents.map((event, index) =>
                !event.countdownFinished ? (
                  <EventCard key={index} data={event} />
                ) : null
              )}
            </div>
          ) : (
            <h1 className="flex justify-center text-[30px] my-5 text-[red]">
              Sorry, We currently don&apos;t have any ongoing events.
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
