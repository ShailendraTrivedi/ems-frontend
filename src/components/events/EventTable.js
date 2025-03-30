import React from "react";
import NextButton from "../helper/NextButton";
import { SquarePen, Trash2 } from "lucide-react";

const EventTable = ({
  events,
  handleInterested,
  handleUpdate,
  handleDelete,
}) => {
  const userId = localStorage.getItem("userId");

  return (
    <div className="overflow-x-auto p-5 ">
      <table className="min-w-full border-collapse border border-blue-300">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="border-b-2 border-blue-300 p-5">S.No.</th>
            <th className="border-b-2 border-blue-300 p-5">Event Name</th>
            <th className="border-b-2 border-blue-300 p-5">Location</th>
            <th className="border-b-2 border-blue-300 p-5">Date</th>
            <th className="border-b-2 border-blue-300 p-5">Users Attending</th>
            <th className="border-b-2 border-blue-300 p-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events?.length > 0 ? (
            events.map((event, index) => {
              const alreadyInterested = userId
                ? event.users.some((user) => user.userId.toString() === userId)
                : false;
              return (
                <tr key={index} className="hover:bg-blue-100">
                  <td className="border-b-2 border-blue-300 px-4 py-2 text-center font-bold">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-blue-300 px-4 py-2 text-center font-bold">
                    {event.eventName}
                  </td>
                  <td className="border-b-2 border-blue-300 px-4 py-2 text-center">
                    {event.eventLocation}
                  </td>
                  <td className="border-b-2 border-blue-300 px-4 py-2 text-center">
                    {new Date(event.eventDateTime).toLocaleDateString()}
                  </td>
                  <td className="border-b-2 border-blue-300 px-4 py-2 text-center">
                    {event.users?.length}
                  </td>
                  <td className="border-b-2 border-blue-300 px-4 py-2 text-center">
                    <div className="flex gap-2 items-center justify-center">
                      <NextButton
                        disabled={alreadyInterested}
                        className={`${
                          alreadyInterested ? "bg-blue-300" : "bg-blue-500"
                        } text-white px-3 py-1 rounded`}
                        onClick={() => handleInterested(event)}
                      >
                        Interested? Click here
                      </NextButton>
                      <NextButton
                        onClick={() => handleUpdate(event)}
                        className="p-2 rounded-full hover:bg-blue-500 hover:text-white"
                      >
                        <SquarePen />
                      </NextButton>
                      <NextButton
                        onClick={() => handleDelete(event)}
                        className="p-2 rounded-full hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 />
                      </NextButton>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="hover:bg-blue-100">
              <td
                colSpan={6}
                className="border-b-2 border-blue-300 px-4 py-2 text-center font-bold"
              >
                No Events Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
