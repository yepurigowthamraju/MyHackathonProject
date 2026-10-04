import React, { useEffect, useState } from 'react';
import { Video, RefreshCw, PlayCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface PersonnelVideo {
  id: string;
  personnelId: string;
  personnelName: string;
  unit: string;
  fileName: string;
  mimeType: string;
  dataUrl: string;
  analysisStatus: string;
  createdAt: string;
}

export const PersonnelVideosPage: React.FC = () => {
  const [videos, setVideos] = useState<PersonnelVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadVideos = async () => {
    try {
      setError('');

      const token = localStorage.getItem('welfare_token');

      if (!token) {
        setError('Login session expired. Please log in again.');
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/wellness/videos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to load uploaded videos.'
        );
      }

      if (Array.isArray(data)) {
        setVideos(data);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load uploaded videos.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();

    const interval = setInterval(() => {
      loadVideos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="employee-videos-page space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Video className="w-7 h-7 text-cyan-400" />
            <h2 className="text-2xl font-bold">
              Uploaded Videos
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            View videos submitted by personnel through the Video Sensor.
          </p>
        </div>

        <button
          onClick={loadVideos}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">
          Loading uploaded videos...
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-10 text-center">
          <Video className="mx-auto w-10 h-10 text-slate-500" />

          <p className="mt-4 font-semibold">
            No uploaded videos yet.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Videos uploaded by personnel will appear here.
          </p>
        </div>
      )}

      {!loading && videos.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">
                    {video.fileName}
                  </h3>

                  <p className="text-sm text-cyan-400 mt-1">
                    {video.personnelName}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {video.personnelId}
                    {video.unit ? ` • ${video.unit}` : ''}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                  {video.analysisStatus}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black">
                <video
                  controls
                  preload="metadata"
                  src={video.dataUrl}
                  className="w-full max-h-[420px]"
                />

                <div className="absolute top-3 left-3 pointer-events-none">
                  <PlayCircle className="w-7 h-7 text-white/80" />
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Uploaded:{' '}
                {new Date(video.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};