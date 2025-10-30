"use client";
import React, { useEffect, useState } from "react";

type Video = { id: string; title: string; url: string };

const STORAGE_KEY = "neotisa:videos";

export default function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setVideos(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  function add() {
    if (!title.trim() || !url.trim()) return;
    setVideos((s) => [
      ...s,
      { id: Date.now().toString(), title: title.trim(), url: url.trim() },
    ]);
    setTitle("");
    setUrl("");
  }

  function remove(id: string) {
    setVideos((s) => s.filter((v) => v.id !== id));
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pre-recorded Videos</h2>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 rounded"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Video URL"
            className="border p-2 rounded"
          />
          <button
            onClick={add}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Video
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {videos.length === 0 && (
          <div className="text-gray-500">No videos yet.</div>
        )}
        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{v.title}</div>
              <a
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600"
              >
                {v.url}
              </a>
            </div>
            <div>
              <button onClick={() => remove(v.id)} className="text-red-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
