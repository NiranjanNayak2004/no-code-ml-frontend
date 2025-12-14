import { useState } from "react"
import API from "../api"

export default function SplitStep({ sessionId, onDone }) {
  const [msg, setMsg] = useState("")
  const [error, setError] = useState("")

  async function split() {
    setMsg("")
    setError("")

    try {
      const res = await API.post("/split", {
        session_id: sessionId,
        test_size: 0.2
      })

      // 🔥 IF BACKEND RETURNS 200 → THIS IS SUCCESS
      setMsg(
        `Split successful • Train: ${res.data.train_rows}, Test: ${res.data.test_rows}`
      )

      onDone()
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Split failed. Please retry."
      )
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">3. Train–Test Split</h2>

      <button
        onClick={split}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Split 80 / 20
      </button>

      {msg && (
        <p className="mt-3 bg-green-50 p-2 rounded text-green-700">
          {msg}
        </p>
      )}

      {error && (
        <p className="mt-3 bg-red-50 p-2 rounded text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
