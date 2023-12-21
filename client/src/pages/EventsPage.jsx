import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      <Header activeHeading={4} />
      {isLoading ? (
        <Loader />
      ) : allEvents && allEvents.length > 0 ? (
        <div>
          {allEvents.map((event, index) => (
            <EventCard key={index} active={true} data={event} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl text-red-500">
            Sorry, We currently don&apos;t have any ongoing events.
          </h1>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
