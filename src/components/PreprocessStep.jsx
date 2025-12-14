import { useState } from "react"
import API from "../api"

export default function PreprocessStep({ sessionId, columns, onDone }) {
  const [method, setMethod] = useState("standard")
  const [target, setTarget] = useState("")
  const [msg, setMsg] = useState("")
  const [error, setError] = useState("")

  async function apply() {
    setMsg("")
    setError("")

    if (!target) {
      setError("Please select a target column")
      return
    }

    try {
      await API.post("/preprocess", {
        session_id: sessionId,
        method,
        target
      })

      setMsg("Preprocessing successful")
      onDone()
    } catch (e) {
      setError(e.response?.data?.error || "Preprocessing failed")
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3">2. Data Preprocessing</h2>

      <div className="flex gap-3">
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="standard">StandardScaler</option>
          <option value="minmax">MinMaxScaler</option>
        </select>

        <select
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Target</option>
          {Array.isArray(columns) &&
            columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
        </select>

        <button
          onClick={apply}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {msg && <p className="mt-3 bg-green-50 p-2 rounded">{msg}</p>}
      {error && <p className="mt-3 bg-red-50 p-2 rounded text-red-600">{error}</p>}
    </div>
  )
}
