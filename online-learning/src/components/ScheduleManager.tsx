"use client";
import React, { useEffect, useState } from "react";

type Schedule = {
  id: string;
  title: string;
  datetime: string;
  instructor: string;
};

const STORAGE_KEY = "neotisa:schedule";

export default function ScheduleManager() {
  const [items, setItems] = useState<Schedule[]>([]);
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [instructor, setInstructor] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function add() {
    if (!title.trim() || !datetime.trim()) return;
    setItems((s) => [
      ...s,
      {
        id: Date.now().toString(),
        title: title.trim(),
        datetime: datetime.trim(),
        instructor: instructor.trim(),
      },
    ]);
    setTitle("");
    setDatetime("");
    setInstructor("");
  }

  function remove(id: string) {
    setItems((s) => s.filter((it) => it.id !== id));
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Schedule Live Classes</h2>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Class title"
            className="border p-2 rounded"
          />
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
            className="border p-2 rounded"
          />
          <input
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="Instructor"
            className="border p-2 rounded"
          />
          <button
            onClick={add}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Schedule
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="text-gray-500">No scheduled classes.</div>
        )}
        {items.map((it) => (
          <div
            key={it.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-600">
                {new Date(it.datetime).toLocaleString()} •{" "}
                {it.instructor || "TBA"}
              </div>
            </div>
            <div>
              <button onClick={() => remove(it.id)} className="text-red-600">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
