import { useState } from "react"
import API from "../api"

export default function UploadStep({ setSessionId, setColumns, onDone }) {
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState("")

  async function upload() {
    if (!file) {
      setMsg("Please select a file")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await API.post("/upload", formData)

      setSessionId(res.data.session_id)
      setColumns(res.data.columns)

      setMsg(
        `Uploaded successfully • ${res.data.rows} rows • ${res.data.columns.length} columns`
      )

      onDone()
    } catch {
      setMsg("Upload failed")
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">1. Upload Dataset</h2>

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button
        onClick={upload}
        className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {msg && <p className="mt-3 bg-slate-100 p-2 rounded">{msg}</p>}
    </div>
  )
}
