"use client";
import { useState } from "react";
import { NextInput } from "..";
import NextButton from "../helper/NextButton";
import NextDateTime from "../helper/NextInput";
import { EventAction } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { updateEvent } from "@/redux/actions/eventActions";

const UpdateEvent = ({ selectedEvent, setEventAction }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    eventName: selectedEvent?.eventName,
    eventLocation: selectedEvent?.eventLocation,
    eventDateTime: selectedEvent?.eventDateTime,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEvent({ eventId: selectedEvent?.eventId, ...form }));
    setEventAction(EventAction.DISPLAY);
  };

  return (
    <div className="w-[50rem] flex flex-col gap-5 bg-white px-5 py-10 rounded-xl">
      <h3 className="text-2xl font-bold">Update Event</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="eventName" className="font-bold text-xl">
            Event Name:
          </label>
          <NextInput
            id="eventName"
            name="eventName"
            aria-label="Event Name"
            value={form.eventName}
            placeholder="Enter Event Name..."
            className="border-2 border-black focus:outline-none p-2 w-full"
            onChange={(e) => setForm({ ...form, eventName: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="eventLocation" className="font-bold text-xl">
            Event Location:
          </label>
          <NextInput
            id="eventLocation"
            name="eventLocation"
            aria-label="Event Location"
            value={form.eventLocation}
            placeholder="Enter Event Location..."
            className="border-2 border-black focus:outline-none p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, eventLocation: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="eventDateTime" className="font-bold text-xl">
            Event Date and Time:
          </label>
          <NextDateTime
            id="eventDateTime"
            name="eventDateTime"
            aria-label="Event Date and Time"
            type="datetime-local"
            value={
              form.eventDateTime
                ? new Date(form.eventDateTime).toISOString().slice(0, 16)
                : ""
            }
            placeholder="Enter Event Date and Time..."
            className="border-2 border-black focus:outline-none p-2 w-full"
            onChange={(e) =>
              setForm({ ...form, eventDateTime: e.target.value })
            }
          />
        </div>
      </form>
      <div className="flex mx-auto gap-2 w-1/2">
        <NextButton
          className="border-2 p-2 w-full"
          onClick={() => setEventAction(EventAction.DISPLAY)}
        >
          Cancel
        </NextButton>
        <NextButton
          type="submit"
          className="bg-blue-500 text-white p-2 w-full"
          onClick={handleSubmit}
        >
          Save
        </NextButton>
      </div>
    </div>
  );
};

export default UpdateEvent;
