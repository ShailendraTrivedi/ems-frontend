"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Head from "next/head";
import {
  CreateEvent,
  EventTable,
  NextButton,
  Pagination,
  UpdateEvent,
} from "@/components";
import {
  deleteEvent,
  esvpEvent,
  fetchEvents,
} from "@/redux/actions/eventActions";
import { EventAction } from "@/utils/constants";
import { Plus } from "lucide-react";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const eventState = useSelector((state) => state.events);

  const [payload, setPayload] = useState({
    pageNo: parseInt(searchParams.get("page")) || 1,
    limit: parseInt(searchParams.get("limit")) || 10,
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventAction, setEventAction] = useState(EventAction.DISPLAY);

  useEffect(() => {
    document.title = `${eventAction.toUpperCase()} | Event Management`;
  }, [eventAction]);

  useEffect(() => {
    if (Cookies.get("token")) {
      const params = new URLSearchParams({
        page: payload.pageNo,
        limit: payload.limit,
      });
      router.push(`?${params.toString()}`);
      dispatch(fetchEvents(payload));
    }
  }, [dispatch, router, payload]);

  const handleEventAction = (action, event = null) => {
    setEventAction(action);
    setSelectedEvent(event);
  };

  return (
    <>
      <Head>
        <title>Manage Events | Event Management System</title>
        <meta
          name="description"
          content="Create, update, and manage events effortlessly."
        />
        <meta property="og:title" content="Event Management System" />
        <meta
          property="og:description"
          content="Effortlessly manage your events with our platform."
        />
      </Head>
      <main className="w-full h-full p-5">
        {eventAction !== EventAction.DISPLAY && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
            {eventAction === EventAction.CREATE ? (
              <CreateEvent setEventAction={setEventAction} />
            ) : (
              <UpdateEvent
                selectedEvent={selectedEvent}
                setEventAction={setEventAction}
              />
            )}
          </div>
        )}

        <div className="flex justify-between items-center p-5">
          <div className="flex gap-2 items-center">
            <label htmlFor="totalEvent" className="text-xl font-bold">
              Total Events:
            </label>
            <div
              id="totalEvent"
              className="flex justify-center items-center font-bold bg-blue-500 text-white rounded-full w-10 h-10"
            >
              {eventState.total}
            </div>
          </div>
          <NextButton
            className="flex gap-2 items-center bg-blue-500 text-white p-2 rounded-md"
            onClick={() => handleEventAction(EventAction.CREATE)}
          >
            <Plus />
            Create New Event
          </NextButton>
        </div>

        {eventState.loading ? (
          <p className="text-center">Loading events...</p>
        ) : (
          <>
            <EventTable
              events={eventState.events}
              handleInterested={(event) => dispatch(esvpEvent(event))}
              handleUpdate={(event) =>
                handleEventAction(EventAction.UPDATE, event)
              }
              handleDelete={(event) => dispatch(deleteEvent(event))}
            />
            <Pagination
              totalEvents={eventState.total}
              payload={payload}
              setPayload={setPayload}
            />
          </>
        )}
      </main>
    </>
  );
}
