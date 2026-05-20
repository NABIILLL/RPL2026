"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/app/admin/_lib/adminApi";

type AdminUser = { id: string; user_metadata?: { name?: string | null } | null; email?: string | null };
type SimpleProfile = { id: string; name?: string | null };
type TrackerRow = { id: string; user_id: string };

type Observation = {
  id: string;
  tracker_id: string;
  day_number: number;
  plant_height?: number | null;
  leaf_count?: number | null;
  created_at?: string | null;
};

const emptyForm = {
  tracker_id: "",
  day_number: "",
  plant_height: "",
  leaf_count: "",
};

export default function AdminObservationsPage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Maps for user lookup
  const [profileMap, setProfileMap] = useState<Map<string, string>>(new Map());
  const [trackerUserMap, setTrackerUserMap] = useState<Map<string, string>>(new Map());

  const loadObservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const [observationData, userData, trackerData] = await Promise.all([
        adminFetch("/api/admin/observations"),
        adminFetch("/api/admin/users"),
        adminFetch("/api/admin/trackers")
      ]);
      setObservations(observationData.observations || []);

      const profiles = userData.profiles || [];
      const users = userData.users || [];
      const newProfileMap = new Map<string, string>();
      
      users.forEach((u: AdminUser) => {
        const p = profiles.find((p: SimpleProfile) => p.id === u.id);
        newProfileMap.set(u.id, p?.name || u.user_metadata?.name || u.email || "User");
      });
      setProfileMap(newProfileMap);

      const trackers = trackerData.trackers || [];
      const newTrackerMap = new Map<string, string>();
      trackers.forEach((t: TrackerRow) => {
        newTrackerMap.set(t.id, t.user_id);
      });
      setTrackerUserMap(newTrackerMap);

     } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "Gagal memuat observasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await loadObservations();
    })();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async () => {
    if (!form.tracker_id || !form.day_number) {
      setError("tracker_id dan day_number wajib diisi");
      return;
    }

    setError(null);
    try {
      const payload = {
        tracker_id: form.tracker_id,
        day_number: Number(form.day_number),
        plant_height: form.plant_height ? Number(form.plant_height) : null,
        leaf_count: form.leaf_count ? Number(form.leaf_count) : null,
      };

      if (editingId) {
        await adminFetch("/api/admin/observations", {
          method: "PATCH",
          json: { id: editingId, ...payload },
        });
      } else {
        await adminFetch("/api/admin/observations", {
          method: "POST",
          json: payload,
        });
      }

      setForm({ ...emptyForm });
      setEditingId(null);
      await loadObservations();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "Gagal menyimpan observasi");
    }
  };

  const handleEdit = (item: Observation) => {
    setEditingId(item.id);
    setForm({
      tracker_id: item.tracker_id,
      day_number: String(item.day_number),
      plant_height: item.plant_height?.toString() || "",
      leaf_count: item.leaf_count?.toString() || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus observasi ini?")) return;
    setError(null);
    try {
      await adminFetch("/api/admin/observations", { method: "DELETE", json: { id } });
      await loadObservations();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "Gagal menghapus observasi");
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Kelola Observasi</div>
          <div className="page-sub">Monitoring input data harian dan validasi data lapangan</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-ghost" onClick={() => setForm({ ...emptyForm })}><i className="ti ti-refresh"></i> Reset</button>
          <button className="btn btn-primary" onClick={handleSubmit}><i className="ti ti-device-floppy"></i> Simpan</button>
        </div>
      </div>

      {error && (
        <div className="panel" style={{ marginBottom: 14 }}>
          <div style={{ padding: "12px 16px", color: "var(--red)" }}>{error}</div>
        </div>
      )}

      <div className="grid-equal" style={{ marginBottom: 14 }}>
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title"><i className="ti ti-notes"></i> Ringkasan Observasi</div>
          </div>
          <div className="stat-inline">
            <div className="stat-cell"><div className="stat-cell-num">{observations.length}</div><div className="stat-cell-lbl">Total</div></div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title"><i className="ti ti-edit"></i> Form Observasi</div>
          </div>
          <div style={{ padding: "14px 16px", display: "grid", gap: 10 }}>
            <input className="form-input" placeholder="tracker_id" value={form.tracker_id} onChange={(e) => setForm({ ...form, tracker_id: e.target.value })} />
            <input className="form-input" placeholder="Hari ke" value={form.day_number} onChange={(e) => setForm({ ...form, day_number: e.target.value })} />
            <input className="form-input" placeholder="Tinggi tanaman" value={form.plant_height} onChange={(e) => setForm({ ...form, plant_height: e.target.value })} />
            <input className="form-input" placeholder="Jumlah daun" value={form.leaf_count} onChange={(e) => setForm({ ...form, leaf_count: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="panel-title"><i className="ti ti-list"></i> Daftar Observasi</div>
          <div className="panel-actions">
            <button className="mini-btn" onClick={loadObservations}>Refresh</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Tracker ID</th>
                <th>Hari Ke-</th>
                <th>Tinggi</th>
                <th>Daun</th>
                <th>Waktu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6}>Loading...</td></tr>
              ) : observations.length === 0 ? (
                <tr><td colSpan={6}>Belum ada data</td></tr>
              ) : (
                observations.map((item) => {
                  const userId = trackerUserMap.get(item.tracker_id);
                  const userName = userId ? profileMap.get(userId) : "Unknown";
                  return (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>
                        <div className="td-name">
                          <div className="avatar-sm" style={{ width: 24, height: 24, fontSize: 10 }}>{userName?.slice(0, 2).toUpperCase() || "?"}</div>
                          {userName}
                        </div>
                      </td>
                      <td style={{ color: "var(--text4)", fontSize: "12px" }}>{item.tracker_id.slice(0, 8)}...</td>
                      <td>{item.day_number}</td>
                      <td>{item.plant_height ?? "-"}</td>
                      <td>{item.leaf_count ?? "-"}</td>
                      <td style={{ color: "var(--text4)" }}>{item.created_at?.split("T")[0] || "-"}</td>
                      <td>
                        <button className="mini-btn" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="mini-btn" style={{ marginLeft: 6 }} onClick={() => handleDelete(item.id)}>Hapus</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}