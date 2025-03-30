"use client";

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
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const useEvent = useSelector((state) => state.events);

  const [payload, setPayload] = useState({
    pageNo: parseInt(searchParams.get("page")) || 1,
    limit: parseInt(searchParams.get("limit")) || 10,
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventAction, setEventAction] = useState("display");
  const [eventState, setEventState] = useState({
    loading: "",
    error: "",
    events: [],
    total: 0,
  });

  useEffect(() => {
    const isToken = Cookies.get("token");
    if (isToken) {
      const params = new URLSearchParams();
      params.set("page", payload.pageNo);
      params.set("limit", payload.limit);
      router.push(`?${params.toString()}`);
      dispatch(fetchEvents(payload));
    }
  }, [dispatch, router, payload]);

  useEffect(() => {
    setEventState(useEvent);
  }, [useEvent]);

  const handleInterested = (event) => {
    dispatch(esvpEvent(event));
  };

  const handleUpdate = (event) => {
    setEventAction(EventAction.UPDATE);
    setSelectedEvent(event);
  };

  const handleDelete = (event) => {
    dispatch(deleteEvent(event));
  };

  const renderComponent = () => {
    switch (eventAction) {
      case EventAction.CREATE:
        return <CreateEvent setEventAction={setEventAction} />;
      case EventAction.UPDATE:
        return (
          <UpdateEvent
            selectedEvent={selectedEvent}
            setEventAction={setEventAction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      {eventAction !== EventAction.DISPLAY && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
          {renderComponent()}
        </div>
      )}
      <div className="p-5">
        <div className="flex justify-between p-5">
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
            onClick={() => setEventAction(EventAction.CREATE)}
          >
            <Plus />
            Create New Event
          </NextButton>
        </div>
        {eventState.loading ? (
          <p>Loading events...</p>
        ) : (
          <>
            <EventTable
              events={eventState.events}
              handleInterested={handleInterested}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
            <Pagination
              totalEvents={eventState.total}
              payload={payload}
              setPayload={setPayload}
            />
          </>
        )}
      </div>
    </div>
  );
}
